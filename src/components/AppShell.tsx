import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { CalendarClock, Cloud, Gauge, Layers, MessagesSquare, ShieldCheck, Sparkles, Brain, Moon, Sun, Home, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { XRayDialog } from "@/components/XRayDialog";
import { hydrateStore, setState, useApp, VIBES, type Vibe } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Start", icon: Home },
  { to: "/planner", label: "Triage Planner", icon: CalendarClock },
  { to: "/quiz", label: "Smart Quiz", icon: ListChecks },
  { to: "/padi", label: "Ask Padi", icon: MessagesSquare },
  { to: "/flashcards", label: "Memory Vault", icon: Layers },
  { to: "/readiness", label: "Readiness", icon: Gauge },
] as const;

export function UnofficialBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold text-amber", className)}>
      <ShieldCheck className="h-3.5 w-3.5" />
      Unofficial AZ-900 Exam Prep Tool — Not Affiliated with Microsoft
    </span>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
        <Cloud className="h-5 w-5 text-background" strokeWidth={2.5} />
        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-amber" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-extrabold tracking-tight">AZed <span className="text-gradient-brand">Padi</span></span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">AZ-900 prep</span>
      </span>
    </Link>
  );
}

function VibePill() {
  const { vibe } = useApp();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/20">
          <MessagesSquare className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Vibe:</span> {VIBES[vibe]}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(VIBES) as Vibe[]).map((v) => (
          <DropdownMenuItem key={v} onClick={() => setState((s) => ({ ...s, vibe: v }))}>
            {VIBES[v]} {v === vibe && "✓"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("azedpadi:v1:theme");
    const d = saved ? saved === "dark" : true;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => {
      const d = !dark; setDark(d);
      document.documentElement.classList.toggle("dark", d);
      localStorage.setItem("azedpadi:v1:theme", d ? "dark" : "light");
    }}>
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [xray, setXray] = useState(false);
  useEffect(() => { hydrateStore(); }, []);

  return (
    <div className="min-h-screen">
      <div className="kente h-1 w-full" />
      <header className="glass sticky top-0 z-40 border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Brand />
          <UnofficialBadge className="ml-2 hidden xl:inline-flex" />
          <span className="ml-1 inline-flex rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber xl:hidden">Unofficial Prep</span>
          <div className="ml-auto flex items-center gap-2">
            <VibePill />
            <Button size="sm" variant="xray" onClick={() => setXray(true)}>
              <Brain className="h-4 w-4" /> <span className="hidden sm:inline">Prompt X-Ray</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4">
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 flex-col gap-1 py-6 md:flex">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link key={to} to={to} className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-card" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}>
                <Icon className={cn("h-4 w-4", active && "text-success")} /> {label}
              </Link>
            );
          })}
          <div className="mt-auto rounded-xl border bg-card/60 p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Exam weights</p>
            <p className="mt-1"><span className="text-d1">●</span> Cloud Concepts 25–30%</p>
            <p><span className="text-d2">●</span> Architecture 35–40%</p>
            <p><span className="text-d3">●</span> Governance 30–35%</p>
          </div>
        </aside>
        <main className="min-w-0 flex-1 py-6 pb-28 md:pb-10">{children}</main>
      </div>

      <footer className="border-t pb-24 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <UnofficialBadge />
          <p>Built for the Power Learn Project Vibe Coding Hackathon · #1MillionDevs · Original practice questions only.</p>
        </div>
      </footer>

      <nav className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link key={to} to={to} className={cn("flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium", active ? "text-success" : "text-muted-foreground")}>
              <Icon className="h-5 w-5" /> {label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>

      <XRayDialog open={xray} onOpenChange={setXray} />
    </div>
  );
}
