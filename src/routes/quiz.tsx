// @ts-nocheck
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, GripVertical, MessagesSquare, Sparkles, Timer, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DomainBadge, vibeIntro } from "@/components/DomainBadge";
import { DOMAINS, quizInteraction, seedQuestions, type DomainKey, type OptionKey, type Question } from "@/data/seedQuestions";
import { addBookmark, clearExamDraft, getState, recordAttempt, setState, useApp } from "@/lib/store";
import { buildStudyDeck, buildTimedDeck, EXAM_SECONDS, formatCountdown, parseQuestionId, type QuizItem } from "@/lib/quiz";
import { cn } from "@/lib/utils";

type Mode = "study" | "timed" | "mistakes";
type DomainFilter = "all" | DomainKey;
interface Search { mode: Mode; domain: DomainFilter; q?: number }

export const Route = createFileRoute("/quiz")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: s.mode === "timed" || s.mode === "mistakes" ? s.mode : "study",
    domain: s.domain === "d1" || s.domain === "d2" || s.domain === "d3" ? s.domain : "all",
    q: parseQuestionId(s.q),
  }),
  head: () => ({
    meta: [
      { title: "Scenario Smart Quiz & 45:00 Simulator — AZed Padi" },
      { name: "description", content: "50 original AZ-900 scenario questions with instant feedback, exam traps, African analogies and a timed exam simulation." },
      { property: "og:title", content: "Scenario Smart Quiz — AZed Padi" },
      { property: "og:description", content: "Study Mode with instant feedback or a 45-minute shuffled exam simulation." },
    ],
  }),
  component: Quiz,
});

const LETTERS: OptionKey[] = ["A", "B", "C", "D"];

// --- CUSTOM HOOK: PROMPT 3C KEYBOARD ACCESSIBILITY ---
function useQuizKeyboard(
  order: OptionKey[] | undefined,
  onPick: (k: OptionKey) => void,
  onNext: () => void,
  disabled: boolean
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcut interference if typing in an input (future proofing)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      
      if (key === 'enter') {
        e.preventDefault();
        onNext();
        return;
      }

      if (disabled || !order) return;

      // Map keys 1-4 and A-D to the current randomized option order
      if (key === '1' || key === 'a') onPick(order[0]);
      if (key === '2' || key === 'b') onPick(order[1]);
      if (key === '3' || key === 'c') onPick(order[2]);
      if (key === '4' || key === 'd') onPick(order[3]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [order, onPick, onNext, disabled]);
}
// -----------------------------------------------------

function Quiz() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/quiz" });
  const s = useApp();
  const [items, setItems] = useState<QuizItem[] | null>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (search.mode === "timed") {
      const draft = getState().examDraft;
      const alive = draft && draft.endsAt > Date.now() && draft.ids.length === seedQuestions.length;
      if (alive) {
        const restored = draft.ids
          .map((id) => {
            const q = seedQuestions.find((x) => x.id === id);
            if (!q) return null;
            const order = (draft.orders[id] ?? draft.orders[String(id)] ?? LETTERS) as OptionKey[];
            return { q, order };
          })
          .filter(Boolean) as QuizItem[];
        if (restored.length === seedQuestions.length) {
          setItems(restored);
          setIdx(Math.min(draft.idx, restored.length - 1));
          return;
        }
      }
      const deck = buildTimedDeck(seedQuestions);
      setItems(deck);
      setIdx(0);
      setState((x) => ({
        ...x,
        examDraft: {
          ids: deck.map((i) => i.q.id),
          orders: Object.fromEntries(deck.map((i) => [i.q.id, i.order])),
          answers: {},
          idx: 0,
          endsAt: Date.now() + EXAM_SECONDS * 1000,
        },
      }));
      return;
    }

    let pool = seedQuestions;
    if (search.domain !== "all") pool = pool.filter((q) => q.domain_key === search.domain);
    if (search.mode === "mistakes") pool = pool.filter((q) => getState().mistakes.includes(q.id));
    const built = buildStudyDeck(pool, search.q);
    setItems(built.items);
    setIdx(built.idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.mode, search.domain, search.q]);

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Scenario Smart Quiz</h1>
        <p className="text-muted-foreground">Real-world African business scenarios. Pick the decision a cloud pro would make.</p>
      </header>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-3 shadow-card">
        <Select
          value={search.mode === "timed" ? "all" : search.domain}
          disabled={search.mode === "timed"}
          onValueChange={(v) => navigate({ search: (p) => ({ ...p, domain: v as DomainFilter, q: undefined }) })}
        >
          <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All domains (50 questions)</SelectItem>
            {(Object.keys(DOMAINS) as DomainKey[]).map((d) => (
              <SelectItem key={d} value={d}>D{d.slice(1)} · {DOMAINS[d].short} ({DOMAINS[d].weight})</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-1 rounded-xl bg-muted p-1">
          {([["study", "Study Mode with Instant Feedback"], ["timed", "Timed Exam Simulation"], ["mistakes", `Mistakes Review Deck (${s.mistakes.length})`]] as const).map(([m, label]) => (
            <button key={m} onClick={() => navigate({ search: (p) => ({ ...p, mode: m, domain: m === "timed" ? "all" : p.domain, q: undefined }) })}
              className={cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors", search.mode === m ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground")}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {!items ? (
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      ) : items.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
          <p className="mt-3 font-display text-xl font-bold">No mistakes to review. Clean sheet!</p>
          <p className="text-sm text-muted-foreground">Answer some questions in Study Mode — anything you miss lands here.</p>
        </div>
      ) : search.mode === "timed" ? (
        <TimedExam key={items.map((i) => i.q.id).join(",")} items={items} />
      ) : (
        <StudyRunner items={items} idx={Math.min(idx, items.length - 1)} setIdx={setIdx} />
      )}
    </div>
  );
}

function StudyRunner({ items, idx, setIdx }: { items: QuizItem[]; idx: number; setIdx: (n: number) => void }) {
  const item = items[idx];
  const [chosen, setChosen] = useState<OptionKey | null>(null);
  useEffect(() => setChosen(null), [item.q.id]);

  const pick = (k: OptionKey) => {
    if (chosen) return;
    setChosen(k);
    recordAttempt(item.q.id, k, k === item.q.correct_option);
  };

  const handleNext = () => {
    if (idx < items.length - 1) {
      setIdx(idx + 1);
    } else {
      document.getElementById('readiness-link')?.click();
    }
  };

  // Bind Keyboard Accessibility
  useQuizKeyboard(item.order, pick, handleNext, !!chosen);

  return (
    <div className="space-y-4">
      <ProgressBar value={idx + 1} total={items.length} />
      <QuestionCard item={item} chosen={chosen} onPick={pick} reveal={!!chosen} />
      {chosen && <Remediation q={item.q} correct={chosen === item.q.correct_option} />}
      <div className="flex justify-between">
        <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}><ArrowLeft /> Previous</Button>
        {idx < items.length - 1 ? (
          <Button variant="hero" onClick={handleNext}>Next scenario <ArrowRight /></Button>
        ) : (
          <Button asChild variant="hero"><Link id="readiness-link" to="/readiness">See my readiness <ArrowRight /></Link></Button>
        )}
      </div>
    </div>
  );
}

function Remediation({ q, correct }: { q: Question; correct: boolean }) {
  const { vibe, bookmarks } = useApp();
  const [open, setOpen] = useState(false);
  const saved = bookmarks.some((b) => b.id === `q${q.id}`);
  return (
    <div className="space-y-3 animate-pop">
      <div className={cn("flex gap-3 rounded-2xl border p-4", correct ? "border-success/50 bg-success/10" : "border-coral/50 bg-coral/10")}>
        {correct ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" /> : <XCircle className="h-5 w-5 shrink-0 text-coral" />}
        <div className="text-sm">
          <p className="font-bold">{correct ? "Correct! You read that scenario like a pro." : `Not quite — the answer is ${q.correct_option}. Let's lock it in.`}</p>
          <p className="mt-1 text-muted-foreground">{q.explanation}</p>
        </div>
      </div>
      <div className="flex gap-3 rounded-2xl border border-amber/50 bg-amber/10 p-4 text-sm">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber" />
        <div><p className="font-bold text-amber">⚠️ Exam Trap Warning</p><p className="mt-1">{q.exam_trap_warning}</p></div>
      </div>
      <div className="rounded-2xl border border-success/40 bg-gradient-to-br from-success/15 to-sky/10 p-4">
        <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-success text-success-foreground"><Sparkles className="h-5 w-5" /></span>
          <span className="flex-1 font-display font-bold">Ask AZed Padi: Break This Down with an African Analogy</span>
          <span className="text-xs font-semibold text-success">{open ? "Hide" : "Reveal"}</span>
        </button>
        {open && (
          <div className="mt-3 space-y-3 animate-pop">
            <p className="text-sm"><span className="font-semibold text-success">{vibeIntro[vibe]}</span> {q.padi_analogy}</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={saved ? "secondary" : "success"} onClick={() => {
                addBookmark({ id: `q${q.id}`, title: q.topic, analogy: q.padi_analogy, source: "quiz" });
                toast.success("Analogy saved to your Memory Vault");
              }}>
                {saved ? <BookmarkCheck /> : <Bookmark />} {saved ? "Bookmarked" : "Bookmark Analogy"}
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/padi" search={{ ask: `Explain this AZ-900 topic: ${q.topic}` }}><MessagesSquare /> Chat with Padi about this</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AskPadiLink({ topic }: { topic: string }) {
  return (
    <Button asChild size="sm" variant="outline">
      <Link to="/padi" search={{ ask: `Explain this AZ-900 topic like Padi: ${topic}` }}>
        <MessagesSquare /> Ask Padi
      </Link>
    </Button>
  );
}

function QuestionCard({ item, chosen, onPick, reveal }: { item: QuizItem; chosen: OptionKey | null; onPick: (k: OptionKey) => void; reveal: boolean }) {
  const { q, order } = item;
  const kind = quizInteraction(q);
  return (
    <article className="space-y-4 rounded-2xl border bg-card p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <DomainBadge d={q.domain_key} />
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {kind === "dropdown" ? "dropdown" : kind === "drag_and_drop" ? "drag & drop" : "multiple choice"}
        </span>
        <span className="text-[11px] text-muted-foreground">{q.topic}</span>
        <span className="ml-auto"><AskPadiLink topic={q.topic} /></span>
      </div>
      <div className="rounded-xl border-l-4 border-sky bg-sky/10 p-4 text-sm leading-relaxed">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky">Scenario</p>
        {q.scenario}
      </div>
      <h2 className="text-lg font-bold leading-snug">{q.question}</h2>

      {kind === "dropdown" && !reveal ? (
        <Select value={chosen ? LETTERS[order.indexOf(chosen)] : undefined} onValueChange={(letter) => onPick(order[LETTERS.indexOf(letter as OptionKey)])}>
          <SelectTrigger className="h-auto min-h-12 whitespace-normal text-left"><SelectValue placeholder="Select the best match…" /></SelectTrigger>
          <SelectContent>
            {order.map((orig, i) => <SelectItem key={orig} value={LETTERS[i]}>{LETTERS[i]}. {q.options[orig]}</SelectItem>)}
          </SelectContent>
        </Select>
      ) : kind === "drag_and_drop" && !reveal ? (
        <DragDropOptions q={q} order={order} chosen={chosen} onPick={onPick} />
      ) : (
        <OptionGrid q={q} order={order} chosen={chosen} onPick={onPick} reveal={reveal} />
      )}
    </article>
  );
}

function OptionGrid({ q, order, chosen, onPick, reveal }: { q: Question; order: OptionKey[]; chosen: OptionKey | null; onPick: (k: OptionKey) => void; reveal: boolean }) {
  return (
    <div className="grid gap-2.5">
      {order.map((orig, i) => {
        const isCorrect = orig === q.correct_option;
        const isChosen = orig === chosen;
        return (
          <button key={orig} onClick={() => onPick(orig)} disabled={reveal}
            className={cn(
              "flex items-start gap-3 rounded-xl border-2 p-3.5 text-left text-sm transition-all",
              !reveal && !isChosen && "hover:border-primary/60 hover:bg-primary/5",
              !reveal && isChosen && "border-primary bg-primary/10",
              reveal && isCorrect && "border-success bg-success/15",
              reveal && isChosen && !isCorrect && "border-coral bg-coral/15",
              reveal && !isCorrect && !isChosen && "opacity-60",
            )}>
            <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold",
              reveal && isCorrect ? "bg-success text-success-foreground" : reveal && isChosen ? "bg-coral text-background" : isChosen ? "bg-primary text-primary-foreground" : "bg-muted")}>
              {LETTERS[i]}
            </span>
            <span className="pt-0.5">{q.options[orig]}</span>
          </button>
        );
      })}
    </div>
  );
}

function DragDropOptions({ q, order, chosen, onPick }: { q: Question; order: OptionKey[]; chosen: OptionKey | null; onPick: (k: OptionKey) => void }) {
  const [over, setOver] = useState(false);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Drag an option</p>
        {order.map((orig, i) => (
          <div
            key={orig}
            draggable
            onDragStart={(e) => { e.dataTransfer.setData("text/plain", orig); e.dataTransfer.effectAllowed = "move"; }}
            onClick={() => onPick(orig)}
            className={cn(
              "flex cursor-grab items-start gap-3 rounded-xl border-2 bg-card p-3.5 text-left text-sm active:cursor-grabbing",
              chosen === orig ? "border-primary bg-primary/10" : "hover:border-primary/60",
            )}
          >
            <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted font-mono text-xs font-bold">{LETTERS[i]}</span>
            <span className="pt-0.5">{q.options[orig]}</span>
          </div>
        ))}
      </div>
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const k = e.dataTransfer.getData("text/plain") as OptionKey;
          if (LETTERS.includes(k)) onPick(k);
        }}
        className={cn(
          "flex min-h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center text-sm",
          over ? "border-success bg-success/10" : "border-muted-foreground/30 bg-muted/30",
        )}
      >
        <p className="font-semibold">Drop your answer here</p>
        <p className="mt-1 text-xs text-muted-foreground">Or tap a card — same as the real matching items.</p>
        {chosen && <p className="mt-3 rounded-xl bg-primary/10 px-3 py-2 text-sm">{q.options[chosen]}</p>}
      </div>
    </div>
  );
}

function ProgressBar({ value, total }: { value: number; total: number }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="font-mono">{value}/{total}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-brand transition-all" style={{ width: `${(value / total) * 100}%` }} /></div>
    </div>
  );
}

function TimedExam({ items }: { items: QuizItem[] }) {
  const navigate = useNavigate();
  const { examDraft } = useApp();
  const [answers, setAnswers] = useState<Record<number, OptionKey>>(() => {
    const raw = examDraft?.answers ?? {};
    const next: Record<number, OptionKey> = {};
    for (const [k, v] of Object.entries(raw)) next[Number(k)] = v as OptionKey;
    return next;
  });
  const [idx, setIdx] = useState(examDraft?.idx ?? 0);
  const endsAt = examDraft?.endsAt ?? (Date.now() + EXAM_SECONDS * 1000);
  const [left, setLeft] = useState(() => Math.max(0, Math.round((endsAt - Date.now()) / 1000)));
  const submitted = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const persist = (patch: { answers?: Record<number, OptionKey>; idx?: number }) => {
    setState((s) => {
      if (!s.examDraft) return s;
      return {
        ...s,
        examDraft: {
          ...s.examDraft,
          answers: patch.answers ?? s.examDraft.answers,
          idx: patch.idx ?? s.examDraft.idx,
        },
      };
    });
  };

  const submit = useCallback((timedOut: boolean) => {
    if (submitted.current) return;
    submitted.current = true;
    const a = answersRef.current;
    let score = 0;
    for (const it of items) {
      const chosen = a[it.q.id];
      if (!chosen) continue;
      const ok = chosen === it.q.correct_option;
      if (ok) score++;
      recordAttempt(it.q.id, chosen, ok);
    }
    setState((s) => ({ ...s, lastExam: { score, total: items.length, at: Date.now(), timedOut }, examDraft: undefined }));
    toast[timedOut ? "warning" : "success"](timedOut ? "Time's up! Exam auto-submitted." : "Exam submitted. Let's see where you stand.");
    navigate({ to: "/readiness" });
  }, [items, navigate]);

  useEffect(() => {
    const t = setInterval(() => {
      const l = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) { clearInterval(t); submit(true); }
    }, 250);
    return () => clearInterval(t);
  }, [endsAt, submit]);

  const handleNext = () => {
    if (idx < items.length - 1) { 
      const n = idx + 1; 
      setIdx(n); 
      persist({ idx: n }); 
    } else {
      submit(false);
    }
  };

  const danger = left < 5 * 60;
  const item = items[Math.min(idx, items.length - 1)];
  const answered = Object.keys(answers).length;

  // Bind Keyboard Accessibility for Timed Exam
  useQuizKeyboard(
    item.order,
    (k) => {
      const next = { ...answers, [item.q.id]: k };
      setAnswers(next);
      persist({ answers: next });
    },
    handleNext,
    false // False because users can change their answer in mock exams
  );

  return (
    <div className="space-y-4">
      <div className={cn("glass sticky top-[4.5rem] z-30 flex items-center gap-4 rounded-2xl border-2 p-3 shadow-card", danger ? "animate-pulse-red border-coral bg-coral/15" : "border-sky/50")}>
        <Timer className={cn("h-7 w-7", danger ? "text-coral" : "text-sky")} />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Timed Exam Simulation · 50 shuffled questions · AZ-900 45:00</p>
          <p className={cn("font-mono text-3xl font-bold tabular-nums", danger ? "text-coral" : "text-foreground")}>{formatCountdown(left)}</p>
        </div>
        <div className="ml-auto text-right text-xs text-muted-foreground">
          <p>{answered} / {items.length} answered</p>
          <Button size="sm" variant="amber" className="mt-1" onClick={() => submit(false)}>Submit exam</Button>
        </div>
      </div>
      <ProgressBar value={idx + 1} total={items.length} />
      <QuestionCard item={item} chosen={answers[item.q.id] ?? null} reveal={false}
        onPick={(k) => {
          const next = { ...answers, [item.q.id]: k };
          setAnswers(next);
          persist({ answers: next });
        }} />
      <div className="flex justify-between">
        <Button variant="outline" disabled={idx === 0} onClick={() => { const n = idx - 1; setIdx(n); persist({ idx: n }); }}><ArrowLeft /> Previous</Button>
        {idx < items.length - 1
          ? <Button variant="hero" onClick={handleNext}>Next <ArrowRight /></Button>
          : <Button variant="hero" onClick={() => submit(false)}>Finish & submit <ArrowRight /></Button>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <button key={it.q.id} onClick={() => { setIdx(i); persist({ idx: i }); }}
            className={cn("h-8 w-8 rounded-lg font-mono text-xs", i === idx ? "bg-primary text-primary-foreground" : answers[it.q.id] ? "bg-success/25 text-success" : "bg-muted text-muted-foreground")}>
            {i + 1}
          </button>
        ))}
      </div>
      <button className="text-xs text-muted-foreground underline" onClick={() => { clearExamDraft(); window.location.reload(); }}>Discard this attempt and reshuffle</button>
    </div>
  );
}
