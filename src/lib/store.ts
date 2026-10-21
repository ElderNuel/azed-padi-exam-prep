// @ts-nocheck
import { useSyncExternalStore } from "react";
import type { DomainKey, OptionKey } from "@/data/seedQuestions";
import { seedQuestions, DOMAINS } from "@/data/seedQuestions";

export type Vibe = "en" | "pcm" | "sw";
export const VIBES: Record<Vibe, string> = {
  en: "Pan-African English",
  pcm: "Naija Pidgin Flow",
  sw: "East African / Swahili Mix",
};

export interface Bookmark { id: string; title: string; analogy: string; source: "quiz" | "chat"; at: number }
export interface Attempt { qid: number; chosen: OptionKey; correct: boolean; at: number }

export interface AppState {
  vibe: Vibe;
  daysLeft: number;
  hours: number;
  plannerChecks: Record<string, boolean>;
  attempts: Record<number, Attempt>; // latest attempt per question
  mistakes: number[];
  bookmarks: Bookmark[];
  mastered: string[];
  lastExam?: { score: number; total: number; at: number; timedOut: boolean };
}

const KEY = "azedpadi:v1:state";
const DEFAULT: AppState = {
  vibe: "en", daysLeft: 4, hours: 3, plannerChecks: {}, attempts: {}, mistakes: [], bookmarks: [], mastered: [],
};

let state: AppState = DEFAULT;
let loaded = false;
const listeners = new Set<() => void>();
let syncTimer: ReturnType<typeof setTimeout> | undefined;

export function deviceId() {
  let id = localStorage.getItem("azedpadi:v1:device");
  if (!id) { id = crypto.randomUUID(); localStorage.setItem("azedpadi:v1:device", id); }
  return id;
}

/** Called once on the client: reads localStorage, then tries Cloud for a newer copy. */
export function hydrateStore() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...DEFAULT, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  listeners.forEach((l) => l());
  import("./sync.functions").then(({ pullProgress }) =>
    pullProgress({ data: { deviceId: deviceId() } }).then((r) => {
      if (r?.state && Object.keys(r.state).length && !localStorage.getItem(KEY)) {
        state = { ...DEFAULT, ...(r.state as AppState) };
        localStorage.setItem(KEY, JSON.stringify(state));
        listeners.forEach((l) => l());
      }
    }),
  ).catch(() => { /* offline: localStorage fallback */ });
}

export function setState(fn: (s: AppState) => AppState) {
  state = fn(state);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    import("./sync.functions").then(({ pushProgress }) =>
      pushProgress({ data: { deviceId: deviceId(), state } }),
    ).catch(() => { /* stays in localStorage */ });
  }, 1500);
}

export function useApp(): AppState {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => DEFAULT,
  );
}

export function recordAttempt(qid: number, chosen: OptionKey, correct: boolean) {
  setState((s) => ({
    ...s,
    attempts: { ...s.attempts, [qid]: { qid, chosen, correct, at: Date.now() } },
    mistakes: correct ? s.mistakes.filter((m) => m !== qid) : Array.from(new Set([...s.mistakes, qid])),
  }));
}

export function addBookmark(b: Omit<Bookmark, "at">) {
  setState((s) => s.bookmarks.some((x) => x.id === b.id) ? s : { ...s, bookmarks: [{ ...b, at: Date.now() }, ...s.bookmarks] });
}
export function removeBookmark(id: string) {
  setState((s) => ({ ...s, bookmarks: s.bookmarks.filter((b) => b.id !== id) }));
}

export interface DomainStat { key: DomainKey; total: number; done: number; correct: number; accuracy: number }
export function domainStats(s: AppState): DomainStat[] {
  return (Object.keys(DOMAINS) as DomainKey[]).map((key) => {
    const qs = seedQuestions.filter((q) => q.domain_key === key);
    const atts = qs.map((q) => s.attempts[q.id]).filter(Boolean);
    const correct = atts.filter((a) => a.correct).length;
    // accuracy over the whole domain bank so readiness reflects coverage too
    return { key, total: qs.length, done: atts.length, correct, accuracy: qs.length ? Math.round((correct / qs.length) * 100) : 0 };
  });
}

/** Readiness = 0.275·D1 + 0.375·D2 + 0.35·D3 */
export function readinessScore(d1: number, d2: number, d3: number) {
  return Math.round(0.275 * d1 + 0.375 * d2 + 0.35 * d3);
}
export function readinessStatus(score: number) {
  if (score >= 85) return { label: "Ready to Ace AZ-900!", tone: "success" as const };
  if (score >= 65) return { label: "Almost Exam Ready", tone: "amber" as const };
  return { label: "Needs Triage — Focus on Weak Domains", tone: "coral" as const };
}
