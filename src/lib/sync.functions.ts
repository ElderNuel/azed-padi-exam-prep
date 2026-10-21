// @ts-nocheck
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const idSchema = z.string().uuid();

export const pullProgress = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ deviceId: idSchema }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("learner_progress").select("state").eq("device_id", data.deviceId).maybeSingle();
    return { state: (row?.state ?? {}) as Record<string, unknown> };
  });

export const pushProgress = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ deviceId: idSchema, state: z.record(z.string(), z.any()) }).parse(d),
  )
  .handler(async ({ data }) => {
    if (JSON.stringify(data.state).length > 200_000) return { ok: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("learner_progress").upsert({
      device_id: data.deviceId, state: data.state, updated_at: new Date().toISOString(),
    });
    return { ok: !error };
  });
