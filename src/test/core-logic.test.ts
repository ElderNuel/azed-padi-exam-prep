import { describe, expect, it } from "vitest";
import { DOMAINS, quizInteraction, seedQuestions, starterQuestions, questionsByDomain } from "@/data/seedQuestions";
import { glossary } from "@/data/glossary";
import { buildPlan, isCramMode } from "@/lib/planner";
import { buildTimedDeck, parseQuestionId, formatCountdown, EXAM_QUESTION_COUNT } from "@/lib/quiz";
import { offlinePadiAnswer } from "@/lib/padiOffline";
import { domainStats, readinessScore, readinessStatus } from "@/lib/store";
import { freshProgress, judgeProgress } from "@/services/progress";

describe("question bank", () => {
  it("holds 50 original questions split like the exam weights", () => {
    expect(seedQuestions).toHaveLength(50);
    expect(seedQuestions.map((q) => q.id)).toEqual([...Array(50)].map((_, i) => i + 1));
    expect(seedQuestions.filter((q) => q.domain_key === "d1")).toHaveLength(13);
    expect(seedQuestions.filter((q) => q.domain_key === "d2")).toHaveLength(20);
    expect(seedQuestions.filter((q) => q.domain_key === "d3")).toHaveLength(17);
  });

  it("exports a 12-question starter slice spanning all domains", () => {
    expect(starterQuestions).toHaveLength(12);
    expect(new Set(starterQuestions.map((q) => q.domain_key)).size).toBe(3);
    expect(questionsByDomain("d2")).toHaveLength(20);
  });

  it("maps matching items onto dropdown and drag-and-drop", () => {
    const kinds = new Set(seedQuestions.map(quizInteraction));
    expect(kinds.has("multiple_choice")).toBe(true);
    expect(kinds.has("dropdown")).toBe(true);
    expect(kinds.has("drag_and_drop")).toBe(true);
  });
});

describe("glossary", () => {
  it("covers the 20 toughest AZ-900 terms", () => {
    expect(glossary).toHaveLength(20);
    const blob = glossary.map((g) => g.term).join(" ");
    expect(blob).toMatch(/CapEx/);
    expect(blob).toMatch(/ExpressRoute/);
    expect(blob).toMatch(/Entra/);
    expect(blob).toMatch(/Copilot/);
  });
});

describe("planner", () => {
  it("activates Emergency Cram Mode under 5 days and front-loads D2 then D3", () => {
    expect(isCramMode(4)).toBe(true);
    expect(isCramMode(5)).toBe(false);
    const plan = buildPlan(4, 3);
    const firstDomain = plan[0].topics[0].domain;
    expect(firstDomain).toBe("d2");
    expect(plan.flatMap((d) => d.topics).some((t) => t.domain === "d3")).toBe(true);
  });
});

describe("readiness", () => {
  it("uses the official midpoint weights 0.275 / 0.375 / 0.35", () => {
    expect(DOMAINS.d1.factor + DOMAINS.d2.factor + DOMAINS.d3.factor).toBeCloseTo(1, 5);
    expect(readinessScore(100, 100, 100)).toBe(100);
    expect(readinessScore(0, 0, 0)).toBe(0);
    expect(readinessStatus(64).label).toMatch(/Triage/);
    expect(readinessStatus(65).label).toMatch(/Almost/);
    expect(readinessStatus(85).label).toMatch(/Ready/);
  });

  it("treats unseen questions as 0% so coverage matters", () => {
    const stats = domainStats(freshProgress());
    expect(stats.every((d) => d.accuracy === 0 && d.done === 0)).toBe(true);
    const demo = domainStats(judgeProgress(freshProgress()));
    const score = readinessScore(demo[0].accuracy, demo[1].accuracy, demo[2].accuracy);
    expect(score).toBeGreaterThanOrEqual(85);
  });
});

describe("quiz search", () => {
  it("coerces planner deep-link ids from strings", () => {
    expect(parseQuestionId("14")).toBe(14);
    expect(parseQuestionId(14)).toBe(14);
    expect(parseQuestionId("nope")).toBeUndefined();
  });

  it("formats the 45:00 clock and red-zone seconds", () => {
    expect(formatCountdown(45 * 60)).toBe("45:00");
    expect(formatCountdown(5 * 60 - 1)).toBe("04:59");
    expect(formatCountdown(0)).toBe("00:00");
  });

  it("builds a full 50-question timed deck with shuffled option orders", () => {
    const deck = buildTimedDeck();
    expect(deck).toHaveLength(EXAM_QUESTION_COUNT);
    expect(new Set(deck.map((i) => i.q.id)).size).toBe(50);
    expect(deck.every((i) => i.order.length === 4)).toBe(true);
  });
});

describe("padi offline", () => {
  it("returns an AIM-shaped analogy card when the network is down", () => {
    const answer = offlinePadiAnswer("Explain ExpressRoute vs VPN", "en");
    expect(answer).toMatch(/Padi analogy/i);
    expect(answer).toMatch(/Exam trap/i);
    expect(answer).toMatch(/ExpressRoute|VPN/i);
  });
});
