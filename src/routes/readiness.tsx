// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crosshair, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DomainBadge } from "@/components/DomainBadge";
import { DOMAINS } from "@/data/seedQuestions";
import { domainStats, readinessScore, readinessStatus, useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/readiness")({
  head: () => ({
    meta: [
      { title: "Domain-Weighted Readiness Tracker — AZed Padi" },
      { name: "description", content: "Your AZ-900 readiness score weighted exactly like the exam: 27.5% Cloud Concepts, 37.5% Architecture, 35% Governance." },
      { property: "og:title", content: "AZ-900 Readiness Tracker — AZed Padi" },
      { property: "og:description", content: "Domain-weighted AZ-900 readiness gauge with weakest-domain drills." },
    ],
  }),
  component: Readiness,
});

const toneCls = { success: "bg-success/15 text-success border-success/40", amber: "bg-amber/15 text-amber border-amber/40", coral: "bg-coral/15 text-coral border-coral/40" };
const stroke = { success: "var(--success)", amber: "var(--amber)", coral: "var(--coral)" };

function Readiness() {
  const s = useApp();
  const stats = domainStats(s);
  const [d1, d2, d3] = stats;
  const score = readinessScore(d1.accuracy, d2.accuracy, d3.accuracy);
  const status = readinessStatus(score);
  const weakest = [...stats].sort((a, b) => a.accuracy - b.accuracy)[0];
  const R = 80, C = 2 * Math.PI * R;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Readiness Tracker</h1>
        <p className="font-mono text-sm text-muted-foreground">Readiness = 0.275 × D1 + 0.375 × D2 + 0.35 × D3</p>
      </header>

      {s.lastExam && (
        <div className="flex items-center gap-3 rounded-2xl border border-sky/40 bg-sky/10 p-4 text-sm">
          <Trophy className="h-5 w-5 text-sky" />
          Last timed simulation: <strong>{s.lastExam.score} / {s.lastExam.total}</strong> ({Math.round((s.lastExam.score / s.lastExam.total) * 100)}%){s.lastExam.timedOut && " — auto-submitted at 00:00"}.
        </div>
      )}

      <section className="flex flex-col items-center gap-6 rounded-3xl border bg-card p-8 shadow-card md:flex-row">
        <div className="relative h-52 w-52 shrink-0">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="var(--muted)" strokeWidth="16" />
            <circle cx="100" cy="100" r={R} fill="none" stroke={stroke[status.tone]} strokeWidth="16" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C - (C * score) / 100} className="transition-all duration-700" />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div><p className="font-display text-5xl font-extrabold">{score}%</p><p className="text-xs text-muted-foreground">weighted readiness</p></div>
          </div>
        </div>
        <div className="space-y-3">
          <span className={cn("inline-flex rounded-full border px-4 py-1.5 text-sm font-bold", toneCls[status.tone])}>{status.label}</span>
          <p className="text-muted-foreground">
            {score >= 85 ? "You're in the zone. Run one more timed simulation to lock in your pace." :
             score >= 65 ? `So close. A focused drill on ${DOMAINS[weakest.key].short} pushes you over 85%.` :
             `Every expert started here. Hit ${DOMAINS[weakest.key].short} first — it's where your next marks are hiding.`}
          </p>
          <p className="text-xs text-muted-foreground">Accuracy counts correct answers against the full bank for each domain, so coverage matters too.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((d) => (
          <div key={d.key} className={cn("space-y-3 rounded-2xl border bg-card p-5 shadow-card", d.key === weakest.key && "ring-2 ring-coral/50")}>
            <DomainBadge d={d.key} />
            <h3 className="font-bold">{DOMAINS[d.key].name}</h3>
            <p className="font-display text-4xl font-extrabold">{d.accuracy}%</p>
            <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn("h-full", `bg-${d.key}`)} style={{ width: `${d.accuracy}%` }} /></div>
            <p className="text-xs text-muted-foreground">{d.done} of {d.total} domain questions completed · {d.correct} correct · 50 total in bank</p>
            <Button asChild variant={d.key === weakest.key ? "amber" : "outline"} className="w-full">
              <Link to="/quiz" search={{ mode: "study", domain: d.key }}><Crosshair /> Drill {d.key === weakest.key ? "Weakest Domain" : "This Domain"}</Link>
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}
