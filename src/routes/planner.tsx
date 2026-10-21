// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Clock, PartyPopper, Siren, Target } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DomainBadge, WeightStrip } from "@/components/DomainBadge";
import { buildPlan, isCramMode } from "@/lib/planner";
import { setState, useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Time-Crunch Triage Planner — AZed Padi" },
      { name: "description", content: "Tell Padi your exam date and daily hours; get a weighted AZ-900 study roadmap with Emergency Cram Mode." },
      { property: "og:title", content: "Time-Crunch Triage Planner — AZed Padi" },
      { property: "og:description", content: "Day-by-day AZ-900 roadmap weighted by exam domain." },
    ],
  }),
  component: Planner,
});

function Planner() {
  const s = useApp();
  const plan = buildPlan(s.daysLeft, s.hours);
  const cram = isCramMode(s.daysLeft);
  const all = plan.flatMap((d) => d.topics);
  const checked = all.filter((t) => s.plannerChecks[t.key]).length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Time-Crunch Triage Planner</h1>
        <p className="text-muted-foreground">Two sliders. One plan. Padi puts your minutes where the marks are.</p>
        <WeightStrip />
      </header>

      <div className="flex gap-3 rounded-2xl border border-success/40 bg-success/10 p-4">
        <PartyPopper className="h-6 w-6 shrink-0 text-success" />
        <p className="text-sm"><strong>Exam Format Reality Check:</strong> AZ-900 has ZERO live portal coding labs! You only need to master scenario decisions, drop-downs, and concept matching.</p>
      </div>

      <section className="grid gap-4 rounded-2xl border bg-card p-6 shadow-card md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <label className="font-semibold">How many days until your AZ-900 exam?</label>
            <span className="font-display text-3xl font-extrabold text-sky">{s.daysLeft}<span className="text-sm text-muted-foreground"> days</span></span>
          </div>
          <Slider min={1} max={30} step={1} value={[s.daysLeft]} onValueChange={([v]) => setState((x) => ({ ...x, daysLeft: v }))} />
        </div>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <label className="font-semibold">Daily study hours available</label>
            <span className="font-display text-3xl font-extrabold text-amber">{s.hours}<span className="text-sm text-muted-foreground"> hrs</span></span>
          </div>
          <Slider min={1} max={6} step={1} value={[s.hours]} onValueChange={([v]) => setState((x) => ({ ...x, hours: v }))} />
        </div>
      </section>

      {cram ? (
        <div className="flex gap-3 rounded-2xl border border-coral/50 bg-coral/10 p-4">
          <Siren className="h-6 w-6 shrink-0 animate-pulse-red text-coral" />
          <div className="text-sm">
            <p className="font-display text-lg font-bold text-coral">Emergency Cram Mode activated</p>
            <p>Under 5 days left — Padi front-loads <strong>Domain 2: Architecture & Services (35–40%)</strong> and <strong>Domain 3: Management & Governance (30–35%)</strong>. Cloud Concepts comes last and lighter. You've got this.</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 rounded-2xl border border-sky/40 bg-sky/10 p-4 text-sm">
          <Target className="h-5 w-5 shrink-0 text-sky" /> Balanced mode: foundations first, then the heavy-weight domains. Time is split by official exam weight.
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your roadmap</h2>
        <span className="text-sm text-muted-foreground"><CheckCircle2 className="mr-1 inline h-4 w-4 text-success" />{checked} / {all.length} topics done</span>
      </div>

      <div className="space-y-4">
        {plan.map((day) => (
          <section key={day.day} className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Day {day.day}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> ~{day.minutes} min</span>
            </div>
            <ul className="divide-y">
              {day.topics.map((t) => {
                const done = !!s.plannerChecks[t.key];
                return (
                  <li key={t.key} className="flex flex-wrap items-center gap-3 py-3">
                    <Checkbox checked={done} onCheckedChange={(c) => setState((x) => ({ ...x, plannerChecks: { ...x.plannerChecks, [t.key]: !!c } }))} />
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm font-medium", done && "text-muted-foreground line-through")}>{t.topic}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <DomainBadge d={t.domain} />
                        <span className="text-xs text-muted-foreground">{t.minutes} min</span>
                      </div>
                    </div>
                    <Button asChild size="sm" variant="success">
                      <Link to="/quiz" search={{ mode: "study", domain: t.domain, q: Number(t.key.slice(1)) }}>Practice This Topic Now</Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="flex items-center gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5" /> Plans are coaching, not a pass guarantee. Use the Readiness tab to check real progress.</p>
    </div>
  );
}
