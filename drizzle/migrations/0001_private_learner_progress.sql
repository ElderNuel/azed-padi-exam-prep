CREATE TABLE public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name text NOT NULL DEFAULT '', preferred_language text NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en','pcm','sw')), exam_date date, daily_hours integer NOT NULL DEFAULT 3 CHECK (daily_hours BETWEEN 1 AND 6));
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_profile ON public.profiles FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE TABLE public.quiz_attempts (user_id uuid NOT NULL, question_id integer NOT NULL CHECK (question_id BETWEEN 1 AND 50), domain text NOT NULL CHECK (domain IN ('d1','d2','d3')), chosen_option text NOT NULL CHECK (chosen_option IN ('A','B','C','D')), is_correct boolean NOT NULL, timestamp timestamptz NOT NULL, PRIMARY KEY (user_id, question_id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_attempts ON public.quiz_attempts FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE TABLE public.study_plans (user_id uuid PRIMARY KEY, days_left integer NOT NULL DEFAULT 4 CHECK (days_left BETWEEN 1 AND 30), daily_hours integer NOT NULL DEFAULT 3 CHECK (daily_hours BETWEEN 1 AND 6), completed_topics jsonb NOT NULL DEFAULT '{}', state jsonb NOT NULL DEFAULT '{}', updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_plans TO authenticated;
GRANT ALL ON public.study_plans TO service_role;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_plans ON public.study_plans FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE TABLE public.saved_padi_analogies (user_id uuid NOT NULL, id text NOT NULL, title text NOT NULL, analogy text NOT NULL, source text NOT NULL CHECK (source IN ('quiz','chat')), timestamp timestamptz NOT NULL, PRIMARY KEY (user_id,id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_padi_analogies TO authenticated;
GRANT ALL ON public.saved_padi_analogies TO service_role;
ALTER TABLE public.saved_padi_analogies ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_analogies ON public.saved_padi_analogies FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE FUNCTION public.save_learner_progress(payload jsonb) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); item jsonb;
BEGIN
IF uid IS NULL THEN RAISE EXCEPTION 'Sign in required'; END IF;
IF octet_length(payload::text) > 200000 THEN RAISE EXCEPTION 'Progress too large'; END IF;
PERFORM pg_advisory_xact_lock(hashtext(uid::text));
INSERT INTO public.profiles (id,display_name,preferred_language,exam_date,daily_hours) VALUES (uid, left(coalesce(payload->>'displayName',''),80),payload->>'vibe',nullif(payload->>'examDate','')::date,(payload->>'hours')::integer) ON CONFLICT (id) DO UPDATE SET display_name=EXCLUDED.display_name, preferred_language=EXCLUDED.preferred_language, exam_date=EXCLUDED.exam_date,daily_hours=EXCLUDED.daily_hours;
INSERT INTO public.study_plans (user_id,days_left,daily_hours,completed_topics,state) VALUES (uid,(payload->>'daysLeft')::integer,(payload->>'hours')::integer,payload->'plannerChecks',payload) ON CONFLICT (user_id) DO UPDATE SET days_left=EXCLUDED.days_left,daily_hours=EXCLUDED.daily_hours,completed_topics=EXCLUDED.completed_topics,state=EXCLUDED.state,updated_at=now();
DELETE FROM public.quiz_attempts WHERE user_id=uid;
FOR item IN SELECT value FROM jsonb_each(payload->'attempts') LOOP
INSERT INTO public.quiz_attempts VALUES (uid,(item->>'qid')::integer,item->>'domain',item->>'chosen',(item->>'correct')::boolean,to_timestamp((item->>'at')::double precision/1000));
END LOOP;
DELETE FROM public.saved_padi_analogies WHERE user_id=uid;
FOR item IN SELECT value FROM jsonb_array_elements(payload->'bookmarks') LOOP
INSERT INTO public.saved_padi_analogies VALUES (uid,item->>'id',item->>'title',item->>'analogy',item->>'source',to_timestamp((item->>'at')::double precision/1000));
END LOOP;
END $$;
REVOKE ALL ON FUNCTION public.save_learner_progress(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_learner_progress(jsonb) TO authenticated;
COMMENT ON TABLE public.learner_progress IS 'DEPRECATED: device-based progress replaced by authenticated user-owned progress tables; local guest progress remains on the device.';