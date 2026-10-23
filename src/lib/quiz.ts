import { OPTION_KEYS, seedQuestions, type OptionKey, type Question } from "@/data/seedQuestions";

export const EXAM_SECONDS = 45 * 60;
export const EXAM_QUESTION_COUNT = 50;

export function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export interface QuizItem {
  q: Question;
  order: OptionKey[];
}

export function parseQuestionId(raw: unknown): number | undefined {
  if (typeof raw === "number" && Number.isInteger(raw) && raw >= 1 && raw <= 50) return raw;
  if (typeof raw === "string" && /^\d+$/.test(raw)) {
    const n = Number(raw);
    if (n >= 1 && n <= 50) return n;
  }
  return undefined;
}

export function buildStudyDeck(pool: Question[], startId?: number): { items: QuizItem[]; idx: number } {
  const items = pool.map((q) => ({ q, order: [...OPTION_KEYS] as OptionKey[] }));
  const idx = startId ? Math.max(0, pool.findIndex((q) => q.id === startId)) : 0;
  return { items, idx: items.length ? Math.min(idx, items.length - 1) : 0 };
}

/** Timed AZ-900 simulation: full 50-question bank, shuffled stems and options. */
export function buildTimedDeck(pool: Question[] = seedQuestions): QuizItem[] {
  return shuffle(pool).map((q) => ({ q, order: shuffle([...OPTION_KEYS] as OptionKey[]) }));
}

export function formatCountdown(seconds: number) {
  const s = Math.max(0, seconds);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
