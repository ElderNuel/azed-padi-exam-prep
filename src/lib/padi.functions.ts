import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import SYSTEM_PROMPT from "@/data/system_prompt_padi.txt?raw";

const input = z.object({
  language: z.enum(["en", "pcm", "sw"]),
  daysLeft: z.number().int().min(1).max(30),
  weakDomains: z.array(z.enum(["cloud_concepts", "architecture_services", "management_governance"])).max(3),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) })).min(1).max(20),
});

export const askPadi = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { answer: "Padi is offline right now. Try again shortly.", error: true };
    const system = SYSTEM_PROMPT
      .replaceAll("{{LANGUAGE}}", data.language)
      .replaceAll("{{DAYS_LEFT}}", String(data.daysLeft))
      .replaceAll("{{WEAK_DOMAINS}}", data.weakDomains.join(", ") || "none")
      .replaceAll("{{DISPLAY_NAME}}", "");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, ...data.messages],
      }),
    });
    if (res.status === 429) return { answer: "Padi is getting too many questions right now. Wait a moment and try again.", error: true };
    if (res.status === 402) return { answer: "AI credits have run out for this workspace. Add credits to keep chatting with Padi.", error: true };
    if (!res.ok) return { answer: "Padi hit a snag. Please try again.", error: true };
    const json = await res.json();
    const raw: string = json.choices?.[0]?.message?.content ?? "";
    const m = raw.match(/<answer>([\s\S]*?)<\/answer>/i);
    const answer = (m ? m[1] : raw.replace(/<scratchpad>[\s\S]*?<\/scratchpad>/gi, "").replace(/<meta>[\s\S]*?<\/meta>/gi, "")).trim();
    const meta = raw.match(/<meta>([\s\S]*?)<\/meta>/i)?.[1]?.trim();
    let verified: boolean | undefined;
    try { verified = meta ? JSON.parse(meta).verified : undefined; } catch { /* ignore */ }
    return { answer, verified, error: false };
  });
