// @ts-nocheck
import { useSyncExternalStore } from "react";
import type { DomainKey, OptionKey } from "@/data/seedQuestions";
import { seedQuestions, DOMAINS } from "@/data/seedQuestions";
import { initializeStorage, writeProgress } from '@/services/storageService';
import { freshProgress, judgeProgress, type Progress } from '@/services/progress';

export type Vibe = "en" | "pcm" | "sw";
export const VIBES: Record<Vibe, string> = {
  en: "Pan-African English",
  pcm: "Naija Pidgin Flow",
  sw: "East African / Swahili Mix",
};

export interface Bookmark { id: string; title: string; analogy: string; source: "quiz" | "chat"; at: number }
export interface Attempt { qid: number; chosen: OptionKey; correct: boolean; at: number; domain: DomainKey }

export type AppState = Progress;

const DEFAULT: AppState = freshProgress();

let state: AppState = DEFAULT;
let loaded = false;
const listeners = new Set<() => void>();

/** Called once on the client: reads localStorage, then tries Cloud for a newer copy. */
export function hydrateStore() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  initializeStorage((saved) => {state=saved;listeners.forEach(l=>l());});
}

export function setState(fn: (s: AppState) => AppState) {
  state = fn(state);
  writeProgress(state as Progress);
  listeners.forEach((l) => l());
}

export function getState(): AppState {
  return state;
}

export function useApp(): AppState {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => DEFAULT,
  );
}

export function recordAttempt(qid: number, chosen: OptionKey, correct: boolean) {
  const question = seedQuestions.find(q => q.id === qid);
  if (!question) return;
  correct = chosen === question.correct_option;
  setState((s) => ({
    ...s,
    judgeDemo: false,
    attempts: { ...s.attempts, [qid]: { qid, domain: question.domain_key, chosen, correct, at: Date.now() } },
    mistakes: correct ? s.mistakes.filter((m) => m !== qid) : Array.from(new Set([...s.mistakes, qid])),
  }));
}

export function seedJudgeDemo() { setState(s=>judgeProgress(s as Progress)); }
export function resetProgress() { setState(s=>({...freshProgress(),displayName:s.displayName,examDate:s.examDate,vibe:s.vibe})); }

export function clearExamDraft() {
  setState((s) => ({ ...s, examDraft: undefined }));
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
