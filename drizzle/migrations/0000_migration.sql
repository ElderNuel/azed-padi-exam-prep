CREATE TABLE public.learner_progress (
  device_id text PRIMARY KEY,
  state jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.learner_progress TO service_role;
ALTER TABLE public.learner_progress ENABLE ROW LEVEL SECURITY;