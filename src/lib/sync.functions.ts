import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { normalizeProgress } from '@/services/progress';

export const pullProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const {data,error}=await context.supabase.from('study_plans').select('state').eq('user_id',context.userId).maybeSingle();
    return {state:error ? null : data?.state ?? null};
  });

export const pushProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(normalizeProgress)
  .handler(async ({ data,context }) => {
    try {
      const {error}=await context.supabase.rpc('save_learner_progress',{payload:JSON.parse(JSON.stringify(data))});
      return {ok:!error};
    } catch {return {ok:false};}
  });
