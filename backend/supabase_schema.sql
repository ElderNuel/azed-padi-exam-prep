-- =============================================================================
-- AZed Padi: Unofficial AZ-900 Exam Prep
-- Supabase / PostgreSQL 15+ schema
-- Unofficial AZ-900 Prep Tool. Not affiliated with or endorsed by Microsoft.
--
-- Idempotent: safe to re-run in the Supabase SQL editor.
-- Tables: exam_domains (reference), profiles, quiz_attempts, study_plans,
--         saved_padi_analogies
-- Question IDs 1-50 map to domains by range (see exam_domains seed).
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 1. Types
-- -----------------------------------------------------------------------------
do $$ begin
  create type public.az900_domain as enum (
    'cloud_concepts',
    'architecture_services',
    'management_governance'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.padi_language as enum ('en', 'pcm', 'sw');  -- English, Nigerian Pidgin, Swahili
exception when duplicate_object then null; end $$;

-- -----------------------------------------------------------------------------
-- 2. Helper functions
-- -----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- True when every ID is within 1..50, non-null, and unique within the array.
create or replace function public.valid_question_ids(p_ids integer[])
returns boolean
language sql
immutable
parallel safe
set search_path = ''
as $$
  select p_ids is not null
     and not exists (
           select 1
           from unnest(p_ids) as q(id)
           where q.id is null or q.id < 1 or q.id > 50
         )
     and cardinality(p_ids) = (select count(distinct q.id) from unnest(p_ids) as q(id));
$$;

-- -----------------------------------------------------------------------------
-- 3. exam_domains: official weights and question-ID ranges (reference data)
-- -----------------------------------------------------------------------------
create table if not exists public.exam_domains (
  domain         public.az900_domain primary key,
  title          text    not null,
  weight_min     integer not null check (weight_min between 0 and 100),
  weight_max     integer not null check (weight_max between 0 and 100),
  qid_start      integer not null check (qid_start between 1 and 50),
  qid_end        integer not null check (qid_end   between 1 and 50),
  question_count integer generated always as (qid_end - qid_start + 1) stored,
  constraint exam_domains_weight_order check (weight_min <= weight_max),
  constraint exam_domains_qid_order    check (qid_start <= qid_end)
);

insert into public.exam_domains (domain, title, weight_min, weight_max, qid_start, qid_end) values
  ('cloud_concepts',        'Describe cloud concepts',                   25, 30,  1, 13),
  ('architecture_services', 'Describe Azure architecture and services',  35, 40, 14, 33),
  ('management_governance', 'Describe Azure management and governance',  30, 35, 34, 50)
on conflict (domain) do update
  set title      = excluded.title,
      weight_min = excluded.weight_min,
      weight_max = excluded.weight_max,
      qid_start  = excluded.qid_start,
      qid_end    = excluded.qid_end;

-- Guard: the three ranges must cover exactly 50 questions.
do $$
begin
  if (select sum(question_count) from public.exam_domains) <> 50 then
    raise exception 'exam_domains must cover exactly 50 question IDs';
  end if;
end $$;

create or replace function public.question_domain(p_qid integer)
returns public.az900_domain
language sql
stable
set search_path = ''
as $$
  select e.domain
  from public.exam_domains e
  where p_qid between e.qid_start and e.qid_end;
$$;

-- -----------------------------------------------------------------------------
-- 4. profiles
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  display_name       text
                       check (display_name is null or char_length(display_name) between 1 and 60),
  preferred_language public.padi_language not null default 'en',
  exam_date          date,
  daily_hours        numeric(3,1) not null default 2.0
                       check (daily_hours between 0.5 and 12),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Auto-create a profile for every new auth user (including anonymous sign-ins).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    nullif(left(coalesce(new.raw_user_meta_data ->> 'display_name',
                         split_part(new.email, '@', 1)), 60), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 5. quiz_attempts
--    One row per quiz run, written on completion. The client supplies the UUID
--    so local-to-cloud sync is idempotent. Per-domain counts are derived by a
--    trigger from the ID arrays; the client cannot submit inflated scores.
-- -----------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null default auth.uid()
                           references auth.users (id) on delete cascade,
  mode                   text not null default 'full'
                           check (mode in ('full', 'domain', 'replay')),
  focus_domain           public.az900_domain,

  -- Question IDs answered in this run, in presentation order (IDs 1-50).
  question_ids           integer[] not null,
  correct_question_ids   integer[] not null default '{}',
  incorrect_question_ids integer[] not null default '{}',

  -- Derived by trigger (values supplied by the client are overwritten).
  cloud_total            integer not null default 0,
  cloud_correct          integer not null default 0,
  arch_total             integer not null default 0,
  arch_correct           integer not null default 0,
  mgmt_total             integer not null default 0,
  mgmt_correct           integer not null default 0,
  score_pct              numeric(5,2) generated always as (
                           case
                             when cloud_total + arch_total + mgmt_total = 0 then 0
                             else round(
                               100.0 * (cloud_correct + arch_correct + mgmt_correct)
                                     / (cloud_total   + arch_total   + mgmt_total), 2)
                           end
                         ) stored,

  -- Per-question detail: [{ "q": 17, "pick": "c", "ok": true, "ms": 8400 }, ...]
  answers                jsonb not null default '[]'::jsonb,
  duration_seconds       integer check (duration_seconds is null or duration_seconds >= 0),
  completed_at           timestamptz not null default now(),

  constraint quiz_attempts_domain_mode
    check (mode <> 'domain' or focus_domain is not null),
  constraint quiz_attempts_size
    check (cardinality(question_ids) between 1 and 50),
  constraint quiz_attempts_qids_valid
    check (public.valid_question_ids(question_ids)),
  constraint quiz_attempts_correct_valid
    check (public.valid_question_ids(correct_question_ids)),
  constraint quiz_attempts_incorrect_valid
    check (public.valid_question_ids(incorrect_question_ids)),
  constraint quiz_attempts_correct_subset
    check (correct_question_ids <@ question_ids),
  constraint quiz_attempts_incorrect_subset
    check (incorrect_question_ids <@ question_ids),
  constraint quiz_attempts_disjoint
    check (not (correct_question_ids && incorrect_question_ids)),
  constraint quiz_attempts_all_graded
    check (cardinality(correct_question_ids) + cardinality(incorrect_question_ids)
           = cardinality(question_ids)),
  constraint quiz_attempts_counts_bounded
    check (cloud_correct between 0 and cloud_total
       and arch_correct  between 0 and arch_total
       and mgmt_correct  between 0 and mgmt_total),
  constraint quiz_attempts_answers_shape
    check (case when jsonb_typeof(answers) = 'array'
                then jsonb_array_length(answers) <= 50
                else false end)
);

create index if not exists quiz_attempts_user_completed_idx
  on public.quiz_attempts (user_id, completed_at desc);

create or replace function public.derive_attempt_scores()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  select
    count(*) filter (where t.d = 'cloud_concepts'),
    count(*) filter (where t.d = 'architecture_services'),
    count(*) filter (where t.d = 'management_governance')
  into new.cloud_total, new.arch_total, new.mgmt_total
  from (select public.question_domain(q.id) as d
        from unnest(new.question_ids) as q(id)) t;

  select
    count(*) filter (where t.d = 'cloud_concepts'),
    count(*) filter (where t.d = 'architecture_services'),
    count(*) filter (where t.d = 'management_governance')
  into new.cloud_correct, new.arch_correct, new.mgmt_correct
  from (select public.question_domain(q.id) as d
        from unnest(new.correct_question_ids) as q(id)) t;

  return new;
end;
$$;

drop trigger if exists quiz_attempts_derive_scores on public.quiz_attempts;
create trigger quiz_attempts_derive_scores
  before insert on public.quiz_attempts
  for each row execute function public.derive_attempt_scores();

-- -----------------------------------------------------------------------------
-- 6. study_plans
-- -----------------------------------------------------------------------------
create table if not exists public.study_plans (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null default auth.uid()
                          references auth.users (id) on delete cascade,
  exam_date             date not null,
  days_left             integer not null check (days_left between 1 and 30),
  daily_hours           numeric(3,1) not null check (daily_hours between 0.5 and 12),
  tier                  text generated always as (
                          case
                            when days_left <= 3  then 'last_stand'
                            when days_left <= 7  then 'sprint'
                            when days_left <= 14 then 'focused'
                            else 'full_coverage'
                          end
                        ) stored,
  weak_domains          public.az900_domain[] not null default '{}',
  readiness_at_creation numeric(5,2)
                          check (readiness_at_creation is null
                                 or readiness_at_creation between 0 and 100),
  plan                  jsonb not null
                          check (coalesce(jsonb_typeof(plan -> 'days') = 'array', false)),
  is_active             boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists study_plans_user_created_idx
  on public.study_plans (user_id, created_at desc);

-- At most one active plan per user.
create unique index if not exists study_plans_one_active_per_user
  on public.study_plans (user_id) where is_active;

drop trigger if exists study_plans_touch_updated_at on public.study_plans;
create trigger study_plans_touch_updated_at
  before update on public.study_plans
  for each row execute function public.touch_updated_at();

-- Activating a plan deactivates the user's previous active plan.
create or replace function public.deactivate_other_plans()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  update public.study_plans
     set is_active = false
   where user_id = new.user_id
     and is_active
     and id <> new.id;
  return new;
end;
$$;

drop trigger if exists study_plans_single_active on public.study_plans;
create trigger study_plans_single_active
  before insert or update of is_active on public.study_plans
  for each row when (new.is_active)
  execute function public.deactivate_other_plans();

-- -----------------------------------------------------------------------------
-- 7. saved_padi_analogies
-- -----------------------------------------------------------------------------
create table if not exists public.saved_padi_analogies (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null default auth.uid()
                   references auth.users (id) on delete cascade,
  concept        text not null check (char_length(concept) between 1 and 120),
  azure_service  text check (azure_service is null or char_length(azure_service) between 1 and 120),
  domain         public.az900_domain not null,
  skill_ref      text check (skill_ref is null or char_length(skill_ref) <= 200),
  language       public.padi_language not null default 'en',
  analogy        text not null check (char_length(analogy) between 20 and 2000),
  verified       boolean not null default false,        -- Padi verifier passed
  verifier_flags jsonb not null default '{}'::jsonb
                   check (jsonb_typeof(verifier_flags) = 'object'),
  is_pinned      boolean not null default false,
  created_at     timestamptz not null default now()
);

create index if not exists saved_analogies_user_created_idx
  on public.saved_padi_analogies (user_id, created_at desc);
create index if not exists saved_analogies_user_domain_idx
  on public.saved_padi_analogies (user_id, domain);
create unique index if not exists saved_analogies_dedupe_idx
  on public.saved_padi_analogies (user_id, concept, language, md5(analogy));

-- -----------------------------------------------------------------------------
-- 8. Views and readiness functions
--    security_invoker = true: RLS of the calling user applies to the base tables.
-- -----------------------------------------------------------------------------

-- Latest result per (user, question). Latest answer wins.
create or replace view public.v_question_mastery
with (security_invoker = true) as
select distinct on (a.user_id, r.question_id)
       a.user_id,
       r.question_id,
       public.question_domain(r.question_id) as domain,
       r.correct,
       a.completed_at
from public.quiz_attempts a
cross join lateral (
  select u.id as question_id, true as correct
  from unnest(a.correct_question_ids) as u(id)
  union all
  select u.id, false
  from unnest(a.incorrect_question_ids) as u(id)
) r
order by a.user_id, r.question_id, a.completed_at desc, a.id;

-- Mastered and seen counts per user and domain.
create or replace view public.v_domain_mastery
with (security_invoker = true) as
select m.user_id,
       m.domain,
       count(*)                          as seen,
       count(*) filter (where m.correct) as mastered
from public.v_question_mastery m
group by m.user_id, m.domain;

-- Questions whose latest answer is wrong: feeds the "Replay" mode.
create or replace view public.v_weak_questions
with (security_invoker = true) as
select m.user_id, m.question_id, m.domain, m.completed_at as last_missed_at
from public.v_question_mastery m
where not m.correct;

-- Readiness per domain.
--   W_d = midpoint(weight_min, weight_max) / sum of midpoints
--   A_d = mastered_d / question_count_d      (unseen questions count as 0)
--   contribution_d = 100 * W_d * A_d
-- Overall readiness R = sum(contribution_d).
create or replace function public.readiness_by_domain()
returns table (
  domain_key   public.az900_domain,
  mastered     integer,
  total        integer,
  accuracy     numeric,
  weight       numeric,
  contribution numeric
)
language sql
stable
set search_path = ''
as $$
  with d as (
    select e.domain,
           e.question_count,
           ((e.weight_min + e.weight_max) / 2.0)
             / sum((e.weight_min + e.weight_max) / 2.0) over () as w
    from public.exam_domains e
  ),
  m as (
    select vm.domain, vm.mastered
    from public.v_domain_mastery vm
    where vm.user_id = (select auth.uid())
  )
  select d.domain,
         coalesce(m.mastered, 0)::integer,
         d.question_count::integer,
         round(coalesce(m.mastered, 0)::numeric / d.question_count, 4),
         round(d.w, 4),
         round(100 * d.w * coalesce(m.mastered, 0)::numeric / d.question_count, 2)
  from d
  left join m on m.domain = d.domain
  order by d.domain;
$$;

create or replace function public.readiness_overall()
returns numeric
language sql
stable
set search_path = ''
as $$
  select coalesce(round(sum(r.contribution), 1), 0)
  from public.readiness_by_domain() r;
$$;

-- -----------------------------------------------------------------------------
-- 9. Row Level Security
--    Pattern: (select auth.uid()) = user_id, evaluated once per statement.
-- -----------------------------------------------------------------------------
alter table public.exam_domains         enable row level security;
alter table public.profiles             enable row level security;
alter table public.quiz_attempts        enable row level security;
alter table public.study_plans          enable row level security;
alter table public.saved_padi_analogies enable row level security;

-- exam_domains: public read-only reference data.
drop policy if exists exam_domains_read on public.exam_domains;
create policy exam_domains_read on public.exam_domains
  for select to anon, authenticated using (true);

-- profiles: read, create, update own row. Deletion cascades from auth.users.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- quiz_attempts: append-only. Select, insert, delete (progress reset). No update.
drop policy if exists quiz_attempts_select_own on public.quiz_attempts;
create policy quiz_attempts_select_own on public.quiz_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists quiz_attempts_insert_own on public.quiz_attempts;
create policy quiz_attempts_insert_own on public.quiz_attempts
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists quiz_attempts_delete_own on public.quiz_attempts;
create policy quiz_attempts_delete_own on public.quiz_attempts
  for delete to authenticated using ((select auth.uid()) = user_id);

-- study_plans: full CRUD on own rows.
drop policy if exists study_plans_select_own on public.study_plans;
create policy study_plans_select_own on public.study_plans
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists study_plans_insert_own on public.study_plans;
create policy study_plans_insert_own on public.study_plans
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists study_plans_update_own on public.study_plans;
create policy study_plans_update_own on public.study_plans
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists study_plans_delete_own on public.study_plans;
create policy study_plans_delete_own on public.study_plans
  for delete to authenticated using ((select auth.uid()) = user_id);

-- saved_padi_analogies: full CRUD on own rows; only verified analogies can be saved.
drop policy if exists saved_analogies_select_own on public.saved_padi_analogies;
create policy saved_analogies_select_own on public.saved_padi_analogies
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists saved_analogies_insert_own on public.saved_padi_analogies;
create policy saved_analogies_insert_own on public.saved_padi_analogies
  for insert to authenticated
  with check ((select auth.uid()) = user_id and verified);

drop policy if exists saved_analogies_update_own on public.saved_padi_analogies;
create policy saved_analogies_update_own on public.saved_padi_analogies
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id and verified);

drop policy if exists saved_analogies_delete_own on public.saved_padi_analogies;
create policy saved_analogies_delete_own on public.saved_padi_analogies
  for delete to authenticated using ((select auth.uid()) = user_id);

-- -----------------------------------------------------------------------------
-- 10. Grants (least privilege)
-- -----------------------------------------------------------------------------
revoke all on public.exam_domains, public.profiles, public.quiz_attempts,
              public.study_plans, public.saved_padi_analogies,
              public.v_question_mastery, public.v_domain_mastery, public.v_weak_questions
  from anon, authenticated;

grant select on public.exam_domains to anon, authenticated;
grant select, insert, update          on public.profiles             to authenticated;
grant select, insert, delete          on public.quiz_attempts        to authenticated;
grant select, insert, update, delete  on public.study_plans          to authenticated;
grant select, insert, update, delete  on public.saved_padi_analogies to authenticated;
grant select on public.v_question_mastery, public.v_domain_mastery, public.v_weak_questions
  to authenticated;

revoke execute on function public.readiness_by_domain(), public.readiness_overall()
  from public, anon;
grant execute on function public.readiness_by_domain(), public.readiness_overall()
  to authenticated;

commit;

-- =============================================================================
-- Verification (run manually after applying; expects 62.4 for the worked example)
-- =============================================================================
-- select * from public.readiness_by_domain();
-- select public.readiness_overall();
--
-- Worked example: mastered = (10, 12, 9) of (13, 20, 17)
--   100 * (0.2821*10/13 + 0.3846*12/20 + 0.3333*9/17) = 62.4
