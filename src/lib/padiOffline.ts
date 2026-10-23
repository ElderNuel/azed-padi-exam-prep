import { glossary } from "@/data/glossary";
import { DOMAINS } from "@/data/seedQuestions";

const intro = {
  en: "Here's the picture:",
  pcm: "No wahala, make I break am down:",
  sw: "Sawa rafiki, tuanze na msingi:",
} as const;

type Vibe = keyof typeof intro;

function scoreTerm(query: string, hay: string) {
  const q = query.toLowerCase();
  const h = hay.toLowerCase();
  if (h.includes(q) || q.includes(h)) return 8;
  const words = q.split(/\W+/).filter((w) => w.length > 2);
  return words.reduce((n, w) => n + (h.includes(w) ? 1 : 0), 0);
}

export function offlinePadiAnswer(query: string, vibe: Vibe): string {
  const ranked = [...glossary]
    .map((g) => ({ g, n: scoreTerm(query, `${g.term} ${g.rule} ${g.analogy} ${g.tested}`) }))
    .sort((a, b) => b.n - a.n);
  const hit = ranked[0]?.n ? ranked[0].g : glossary[0];
  const domain = DOMAINS[hit.domain];

  return [
    `**${hit.term} in one line:** ${hit.rule}`,
    `**Padi analogy:** ${intro[vibe]} ${hit.analogy}`,
    `| Analogy | Azure |`,
    `|---|---|`,
    `| Everyday picture above | ${hit.term} (${domain.short}, ${domain.weight}) |`,
    `**Exam trap:** ${hit.tested}`,
    `**Where the analogy breaks:** Analogies teach the decision, not every SLA, SKU, or portal click. Confirm exact numbers on Microsoft Learn.`,
    `**Your turn:** Invent a two-sentence African business scenario that would force a choice on **${hit.term}**. Reply with your pick and I'll coach the trap.`,
    `\n_Padi is in offline fallback (AIM + MAP + OCEAN cards from the jargon bank). Live chat resumes when the network is back._`,
  ].join("\n\n");
}
