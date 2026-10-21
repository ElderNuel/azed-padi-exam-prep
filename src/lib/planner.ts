// @ts-nocheck
import { DOMAINS, seedQuestions, type DomainKey } from "@/data/seedQuestions";

export interface PlanTopic { key: string; topic: string; domain: DomainKey; minutes: number }
export interface PlanDay { day: number; topics: PlanTopic[]; minutes: number }

export function isCramMode(days: number) { return days < 5; }

/** Builds a day-by-day plan. Cram mode (<5 days) orders D2 → D3 → D1 and trims D1 time. */
export function buildPlan(days: number, hours: number): PlanDay[] {
  const cram = isCramMode(days);
  const order: DomainKey[] = cram ? ["d2", "d3", "d1"] : ["d1", "d2", "d3"];
  const budget = days * hours * 60;
  const factor: Record<DomainKey, number> = cram
    ? { d1: 0.2, d2: 0.43, d3: 0.37 }
    : { d1: DOMAINS.d1.factor, d2: DOMAINS.d2.factor, d3: DOMAINS.d3.factor };

  const topics: PlanTopic[] = [];
  for (const d of order) {
    const qs = seedQuestions.filter((q) => q.domain_key === d);
    const per = Math.max(10, Math.round((budget * factor[d]) / qs.length / 5) * 5);
    qs.forEach((q) => topics.push({ key: `q${q.id}`, topic: q.topic, domain: d, minutes: per }));
  }
  const perDay = hours * 60;
  const plan: PlanDay[] = Array.from({ length: days }, (_, i) => ({ day: i + 1, topics: [], minutes: 0 }));
  let di = 0;
  for (const t of topics) {
    if (plan[di].minutes + t.minutes > perDay && di < days - 1) di++;
    plan[di].topics.push(t);
    plan[di].minutes += t.minutes;
  }
  return plan.filter((p) => p.topics.length > 0);
}
