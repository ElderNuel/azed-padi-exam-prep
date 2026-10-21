// @ts-nocheck
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
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Lovable-API-Key": key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: system,
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
        reasoning: { effort: "low" },
        store: false,
        stream: true,
      }),
    });
    if (res.status === 429) return { answer: "Padi is getting too many questions right now. Wait a moment and try again.", error: true };
    if (res.status === 402) return { answer: "AI credits have run out for this workspace. Add credits to keep chatting with Padi.", error: true };
    if (!res.ok || !res.body) return { answer: "Padi hit a snag. Please try again.", error: true };
    let raw = "";
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const ev = JSON.parse(payload);
          if (ev.type === "response.output_text.delta" && typeof ev.delta === "string") raw += ev.delta;
        } catch { /* partial */ }
      }
    }
    const m = raw.match(/<answer>([\s\S]*?)<\/answer>/i);
    const answer = (m ? m[1] : raw.replace(/<scratchpad>[\s\S]*?<\/scratchpad>/gi, "").replace(/<meta>[\s\S]*?<\/meta>/gi, "")).trim();
    const meta = raw.match(/<meta>([\s\S]*?)<\/meta>/i)?.[1]?.trim();
    let verified: boolean | undefined;
    try { verified = meta ? JSON.parse(meta).verified : undefined; } catch { /* ignore */ }
    return { answer, verified, error: false };
  });
