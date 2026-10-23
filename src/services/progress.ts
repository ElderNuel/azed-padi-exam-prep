import { z } from 'zod';
import { seedQuestions, type OptionKey } from '@/data/seedQuestions';

const optionKey = z.enum(['A','B','C','D']);
const attemptSchema = z.object({ qid: z.number().int().min(1).max(50), chosen: optionKey, correct: z.boolean(), at: z.number().finite(), domain: z.enum(['d1','d2','d3']).optional() });
const examDraftSchema = z.object({
  ids: z.array(z.number().int().min(1).max(50)).max(50),
  orders: z.record(z.array(optionKey)),
  answers: z.record(optionKey),
  idx: z.number().int().min(0).default(0),
  endsAt: z.number().finite(),
});
export const progressSchema = z.object({
  displayName: z.string().max(80).default(''), examDate: z.string().regex(/^$|^\d{4}-\d{2}-\d{2}$/).default(''),
  vibe: z.enum(['en','pcm','sw']).default('en'), daysLeft: z.number().int().min(1).max(30).default(4), hours: z.number().int().min(1).max(6).default(3),
  plannerChecks: z.record(z.boolean()).default({}), attempts: z.record(attemptSchema).default({}), mistakes: z.array(z.number().int().min(1).max(50)).default([]),
  bookmarks: z.array(z.object({id:z.string(),title:z.string(),analogy:z.string(),source:z.enum(['quiz','chat']),at:z.number().finite()})).default([]),
  mastered: z.array(z.string()).default([]), lastExam: z.object({score:z.number(),total:z.number().positive(),at:z.number(),timedOut:z.boolean()}).optional(), judgeDemo: z.boolean().default(false),
  examDraft: examDraftSchema.optional(),
});
export type Progress = z.infer<typeof progressSchema>;
export function normalizeProgress(input: unknown): Progress {
  const s = progressSchema.parse(input);
  const attempts: Progress['attempts'] = {};
  for (const a of Object.values(s.attempts)) {
    const q = seedQuestions.find(q => q.id === a.qid);
    if (q) attempts[q.id] = {...a,domain:q.domain_key,correct:a.chosen === q.correct_option};
  }
  return {...s,attempts,mistakes:Object.values(attempts).filter(a=>!a.correct).map(a=>a.qid)};
}
export function freshProgress(): Progress { return progressSchema.parse({}); }
export function judgeProgress(current: Progress, at = Date.now()): Progress {
  const correctCounts = {d1:10,d2:18,d3:16};
  const seen = {d1:0,d2:0,d3:0};
  const attempts: Progress['attempts'] = {};
  for (const q of seedQuestions) {
    const correct = ++seen[q.domain_key] <= correctCounts[q.domain_key];
    const chosen = correct ? q.correct_option : (['A','B','C','D'] as OptionKey[]).find(o=>o!==q.correct_option) ?? 'A';
    attempts[q.id] = {qid:q.id,domain:q.domain_key,chosen,correct,at};
  }
  return normalizeProgress({...current,attempts,judgeDemo:true,lastExam:{score:44,total:50,at,timedOut:false}});
}