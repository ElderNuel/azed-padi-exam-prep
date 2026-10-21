import SYSTEM_PROMPT from "./system_prompt_padi.txt?raw";

export { SYSTEM_PROMPT };

export const AIM_MAP_PROMPT = `# AIM + MAP — Build Prompt behind AZed Padi

A — ACTOR
Principal Frontend Product Designer + Full-Stack React/TypeScript Architect
specialising in high-engagement EdTech.

I — INPUT
Cloud beginners are overwhelmed by Microsoft Learn reading lists, dry
terminology, and fear of scenario questions — with only days left.

M — MISSION
A responsive full-stack study app: 4+ integrated modules, a Prompt X-Ray
for judges, and dual persistence (Lovable Cloud + localStorage fallback).

M — MEMORY (hard rules)
1. "Unofficial AZ-900 Exam Prep Tool — Not Affiliated with Microsoft" badge
   in header AND footer.
2. No Microsoft / Azure logos. Lucide cloud / shield / sparkles only.
3. Exact domain weights: D1 Cloud Concepts 25–30% · D2 Architecture &
   Services 35–40% · D3 Management & Governance 30–35%.

A — ASSETS
50 original scenario questions: id, domain, domain_weight, topic,
question_type, scenario, question, options A–D, correct_option,
explanation, padi_analogy, exam_trap_warning.

P — PROMPT / ACTIONS
Planner (triage + Emergency Cram Mode) → Smart Quiz (Study vs 45:00 Timed
Simulation, shuffled questions + options, auto-submit) → Padi translator +
AI chat → Domain-weighted Readiness → Memory Vault flashcards.

Readiness = 0.275·D1 + 0.375·D2 + 0.35·D3`;

export const OCEAN_PROMPT = `# OCEAN — Styling & Analogy Mandate

O — ORIGINAL
Distinctive flagship-EdTech UI: deep slate #0B0F19, electric sky #0EA5E9,
warm amber #F59E0B, emerald #10B981. Analogies drawn from Lagos danfos,
M-Pesa agents, Balogun Market, Kariakoo, trotros — never stock lines.

C — CONCRETE
Every analogy element maps to exactly ONE real Azure element (mapping
table). Realistic African business scenarios pre-loaded on first visit.

E — EVIDENT
Domain weight badges (25–30%, 35–40%, 30–35%) on every view. Visible
45:00 countdown in Timed Mode. Exam numbers stated exactly (nines, days).

A — ASSERTIVE
Energetic, reassuring, action-oriented micro-copy. No hedging on facts.

N — NARRATIVE
Panic about the exam → Triage Plan → Scenario Quiz with Padi →
85%+ Readiness Confidence.

+ Honesty line: every analogy ends with "Where the analogy breaks".`;
