// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Gauge, Layers, ListChecks, MessagesSquare, Sparkles, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeightStrip } from "@/components/DomainBadge";
import { domainStats, readinessScore, useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AZed Padi — From AZ-900 Panic to 85%+ Confidence" },
      { name: "description", content: "Unofficial AZ-900 prep: triage study plan, scenario quiz, 45-minute exam simulator and African analogies from your study Padi." },
      { property: "og:title", content: "AZed Padi — Unofficial AZ-900 Exam Prep" },
      { property: "og:description", content: "Triage plan, scenario quiz with African analogies, and domain-weighted readiness tracking." },
    ],
  }),
  component: Index,
});

const STEPS = [
  { to: "/planner", icon: CalendarClock, n: "01", title: "Triage your time", body: "Tell Padi how many days you have. Get an hour-by-hour plan weighted to what scores.", tone: "text-sky" },
  { to: "/quiz", icon: ListChecks, n: "02", title: "Drill real scenarios", body: "50 African business scenarios. Instant feedback, exam traps, and a 45:00 simulator.", tone: "text-success" },
  { to: "/padi", icon: MessagesSquare, n: "03", title: "Ask your Padi", body: "Confused by GZRS or Bicep? Padi breaks it down with a danfo, a vault or an M-Pesa agent.", tone: "text-amber" },
  { to: "/readiness", icon: Gauge, n: "04", title: "Hit 85%+", body: "Readiness weighted exactly like the exam. Drill your weakest domain until it turns green.", tone: "text-coral" },
] as const;

function Index() {
  const s = useApp();
  const [d1, d2, d3] = domainStats(s);
  const score = readinessScore(d1.accuracy, d2.accuracy, d3.accuracy);
  const done = d1.done + d2.done + d3.done;

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-card sm:p-10">
        <div className="max-w-2xl space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <Sparkles className="h-3.5 w-3.5" /> Exam in a few days? Breathe. Padi dey for you. 😎
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            From exam panic to <span className="text-gradient-brand">AZ-900 confidence.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Skip the endless reading list. Triage your days, drill scenario questions set in Lagos, Nairobi and Accra, and let Padi turn cloud jargon into things you already understand.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/planner">Build my triage plan <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/quiz" search={{ mode: "timed" }}><Timer /> Start 45:00 simulation</Link></Button>
          </div>
          <WeightStrip />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:absolute sm:right-8 sm:top-10 sm:mt-0 sm:w-64 sm:grid-cols-1">
          <Stat label="Readiness" value={`${score}%`} />
          <Stat label="Questions done" value={`${done} / 50`} />
          <Stat label="Analogies saved" value={String(s.bookmarks.length)} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ to, icon: Icon, n, title, body, tone }) => (
          <Link key={to} to={to} className="group rounded-2xl border bg-card p-5 shadow-card transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <Icon className={`h-6 w-6 ${tone}`} />
              <span className="font-mono text-xs text-muted-foreground">{n}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Go <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </section>

      <Link to="/flashcards" className="flex items-center gap-4 rounded-2xl border border-amber/30 bg-amber/10 p-5">
        <Layers className="h-8 w-8 text-amber" />
        <div>
          <p className="font-display text-lg font-bold">Padi's Memory Vault</p>
          <p className="text-sm text-muted-foreground">20 flip-cards for the toughest terms. Tap "Still Confusing" and Padi brings it back until it sticks.</p>
        </div>
        <ArrowRight className="ml-auto text-amber" />
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background/60 p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-extrabold">{value}</p>
    </div>
  );
}
