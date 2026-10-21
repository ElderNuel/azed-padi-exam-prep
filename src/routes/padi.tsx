import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookOpen, Loader2, MessagesSquare, Search, Send, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { DomainBadge, vibeIntro, WeightStrip } from "@/components/DomainBadge";
import { glossary } from "@/data/glossary";
import { askPadi } from "@/lib/padi.functions";
import { addBookmark, domainStats, useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/padi")({
  validateSearch: (s: Record<string, unknown>): { ask?: string } => ({ ask: typeof s.ask === "string" ? s.ask : undefined }),
  head: () => ({
    meta: [
      { title: "AZed Padi Jargon Translator & AI Study Buddy" },
      { name: "description", content: "The 20 toughest AZ-900 terms translated with African analogies, plus an AI study buddy that explains any Azure concept." },
      { property: "og:title", content: "AZed Padi Jargon Translator" },
      { property: "og:description", content: "Flip cards for tough AZ-900 terms and an AI buddy with African analogies." },
    ],
  }),
  component: PadiPage,
});

function PadiPage() {
  const { ask } = Route.useSearch();
  const [qText, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<string | undefined>();
  const { vibe } = useApp();
  useEffect(() => { if (ask) { setSeed(ask); setOpen(true); } }, [ask]);

  const list = useMemo(() => {
    const t = qText.toLowerCase();
    return glossary.filter((g) => !t || (g.term + g.rule + g.analogy).toLowerCase().includes(t));
  }, [qText]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Jargon Translator</h1>
          <p className="text-muted-foreground">The 20 terms that trip people up — flipped into everyday African life.</p>
          <WeightStrip />
        </div>
        <Button variant="hero" size="lg" onClick={() => { setSeed(undefined); setOpen(true); }}>
          <MessagesSquare /> Ask Padi anything
        </Button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={qText} onChange={(e) => setQ(e.target.value)} placeholder="Search: GZRS, ExpressRoute, Bicep, CapEx…" className="h-12 rounded-xl pl-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((g) => <TermCard key={g.id} g={g} intro={vibeIntro[vibe]} />)}
      </div>

      <PadiChat open={open} onOpenChange={setOpen} seed={seed} />
    </div>
  );
}

function TermCard({ g, intro }: { g: (typeof glossary)[number]; intro: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="perspective h-80 cursor-pointer" onClick={() => setFlipped((f) => !f)}>
      <div className={cn("preserve-3d relative h-full w-full transition-transform duration-500", flipped && "rotate-y-180")}>
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border bg-card p-5 shadow-card">
          <DomainBadge d={g.domain} />
          <h3 className="mt-3 text-xl font-extrabold">{g.term}</h3>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-sky">10-Second Exam Rule</p>
          <p className="mt-1 text-sm">{g.rule}</p>
          <p className="mt-auto text-xs font-semibold text-success">Tap to flip for Padi's analogy →</p>
        </div>
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col gap-3 overflow-auto rounded-2xl border border-success/40 bg-gradient-to-br from-success/15 to-amber/10 p-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-success">African Real-Life Analogy</p>
            <p className="mt-1 text-sm"><span className="font-semibold">{intro}</span> {g.analogy}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber">How the Exam Tests It</p>
            <p className="mt-1 text-sm">{g.tested}</p>
          </div>
          <Button size="sm" variant="outline" className="mt-auto self-start" onClick={(e) => {
            e.stopPropagation();
            addBookmark({ id: `g-${g.id}`, title: g.term, analogy: g.analogy, source: "chat" });
            toast.success("Saved to Memory Vault");
          }}><Bookmark /> Bookmark</Button>
        </div>
      </div>
    </div>
  );
}

interface Msg { role: "user" | "assistant"; content: string; verified?: boolean }

const STARTERS = ["Explain Availability Zones vs Region Pairs", "When do I pick ExpressRoute over VPN?", "Azure Policy vs RBAC vs Locks?", "I have 3 days left. Where do I start?"];

function PadiChat({ open, onOpenChange, seed }: { open: boolean; onOpenChange: (o: boolean) => void; seed?: string }) {
  const s = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const sentSeed = useRef<string | undefined>(undefined);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const send = async (content: string) => {
    if (!content.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: content.trim() }];
    setMsgs(next); setText(""); setBusy(true);
    const weak = domainStats(s).filter((d) => d.done > 0 && d.correct / d.done < 0.65)
      .map((d) => ({ d1: "cloud_concepts", d2: "architecture_services", d3: "management_governance" } as const)[d.key]);
    try {
      const r = await askPadi({ data: { language: s.vibe, daysLeft: s.daysLeft, weakDomains: weak, messages: next.slice(-12).map(({ role, content }) => ({ role, content })) } });
      setMsgs((m) => [...m, { role: "assistant", content: r.answer, verified: r.verified }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Padi couldn't connect. Check your network and try again." }]);
    } finally { setBusy(false); }
  };

  useEffect(() => {
    if (open && seed && sentSeed.current !== seed) { sentSeed.current = seed; void send(seed); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2 font-display"><Sparkles className="h-5 w-5 text-success" /> AZed Padi · Study Buddy</SheetTitle>
          <SheetDescription>AIM + MAP + OCEAN structured answers in {s.vibe === "pcm" ? "Naija Pidgin" : s.vibe === "sw" ? "Swahili mix" : "Pan-African English"}. {s.daysLeft} days to go.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {msgs.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Ask any confusing Azure question. Padi answers with a definition, an African analogy, a mapping table, the exam trap and a practice scenario.</p>
              <div className="grid gap-2">
                {STARTERS.map((st) => <button key={st} onClick={() => send(st)} className="rounded-xl border bg-muted/50 p-3 text-left text-sm hover:border-success/60">{st}</button>)}
              </div>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={cn("max-w-[92%] rounded-2xl p-3 text-sm", m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "border bg-card")}>
              {m.role === "assistant" ? <PadiAnswer text={m.content} verified={m.verified} /> : m.content}
            </div>
          ))}
          {busy && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Padi is thinking and fact-checking…</div>}
          <div ref={endRef} />
        </div>
        <form className="flex gap-2 border-t p-3" onSubmit={(e) => { e.preventDefault(); void send(text); }}>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="e.g. What's the difference between GRS and GZRS?"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(text); } }} className="min-h-0 resize-none" />
          <Button type="submit" variant="success" size="icon" className="h-auto w-12" disabled={busy}><Send /></Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

/** Light markdown: bold, tables, line breaks. */
function PadiAnswer({ text, verified }: { text: string; verified?: boolean }) {
  const blocks = text.split(/\n{2,}/);
  const analogy = text.match(/\*\*Padi analogy:\*\*\s*([\s\S]*?)(\n\n|$)/)?.[1];
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        const lines = b.trim().split("\n");
        if (lines.every((l) => l.trim().startsWith("|"))) {
          const rows = lines.filter((l) => !/^\|\s*-/.test(l.trim())).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
          return (
            <table key={i} className="w-full text-xs">
              <tbody>{rows.map((r, j) => <tr key={j} className={cn("border-b", j === 0 && "font-bold")}>{r.map((c, k) => <td key={k} className="p-1.5">{c}</td>)}</tr>)}</tbody>
            </table>
          );
        }
        return <p key={i} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: escapeHtml(b).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />;
      })}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {verified && <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success"><ShieldCheck className="h-3 w-3" /> Fact-sheet verified</span>}
        {analogy && (
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => {
            addBookmark({ id: `chat-${Date.now()}`, title: text.match(/\*\*(.+?) in one line/)?.[1] ?? "Padi chat analogy", analogy: analogy.trim(), source: "chat" });
            toast.success("Analogy bookmarked");
          }}><BookOpen className="h-3 w-3" /> Bookmark analogy</Button>
        )}
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
