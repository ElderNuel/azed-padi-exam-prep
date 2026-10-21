// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PartyPopper, RotateCcw, ThumbsUp, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DomainBadge, vibeIntro } from "@/components/DomainBadge";
import { glossary } from "@/data/glossary";
import { seedQuestions } from "@/data/seedQuestions";
import { removeBookmark, setState, useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Padi's Memory Vault — AZ-900 Flashcards" },
      { name: "description", content: "Spaced-repetition AZ-900 flashcards with 3D flips, exam traps and your bookmarked African analogies." },
      { property: "og:title", content: "Padi's Memory Vault — AZ-900 Flashcards" },
      { property: "og:description", content: "Flip, retry, master. AZ-900 terms and traps with African analogies." },
    ],
  }),
  component: Vault,
});

interface Card { id: string; front: string; kind: "Term" | "Scenario Trap"; domain: "d1" | "d2" | "d3"; definition: string; analogy: string }

const DECK: Card[] = [
  ...glossary.map((g) => ({ id: `g-${g.id}`, front: g.term, kind: "Term" as const, domain: g.domain, definition: g.rule, analogy: g.analogy })),
  ...seedQuestions.filter((_, i) => i % 5 === 0).map((q) => ({
    id: `t-${q.id}`, front: q.exam_trap_warning.split(/(?<=\.)\s/)[0], kind: "Scenario Trap" as const, domain: q.domain_key,
    definition: `${q.topic}: ${q.options[q.correct_option]}`, analogy: q.padi_analogy,
  })),
];

function Vault() {
  const s = useApp();
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Padi's Memory Vault</h1>
        <p className="text-muted-foreground">Flip it. Be honest. Padi brings back what hasn't stuck yet.</p>
      </header>
      <Tabs defaultValue="deck">
        <TabsList>
          <TabsTrigger value="deck">Flashcard Deck</TabsTrigger>
          <TabsTrigger value="saved">Bookmarked Analogies ({s.bookmarks.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="deck" className="mt-6"><Deck /></TabsContent>
        <TabsContent value="saved" className="mt-6"><Saved /></TabsContent>
      </Tabs>
    </div>
  );
}

function Deck() {
  const s = useApp();
  const [queue, setQueue] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setQueue(DECK.filter((c) => !s.mastered.includes(c.id)).map((c) => c.id)); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [s.mastered.length === 0]);

  const mastered = DECK.filter((c) => s.mastered.includes(c.id)).length;
  const card = DECK.find((c) => c.id === queue[0]);

  const confusing = () => { setFlipped(false); setQueue((q) => [...q.slice(1, 3), q[0], ...q.slice(3)].filter(Boolean)); };
  const gotIt = () => {
    if (!card) return;
    setFlipped(false);
    setState((x) => ({ ...x, mastered: Array.from(new Set([...x.mastered, card.id])) }));
    setQueue((q) => q.slice(1));
  };

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Cards Mastered: <span className="text-success">{mastered}</span> / {DECK.length}</span>
        <span className="text-muted-foreground">{queue.length} in active deck</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-brand transition-all" style={{ width: `${(mastered / DECK.length) * 100}%` }} /></div>

      {!card ? (
        <div className="animate-pop space-y-3 rounded-3xl border border-success/40 bg-success/10 p-10 text-center">
          <PartyPopper className="mx-auto h-12 w-12 text-amber" />
          <p className="font-display text-2xl font-extrabold">Deck cleared! Padi is proud of you.</p>
          <p className="text-sm text-muted-foreground">Every card mastered. Prove it under pressure in a timed simulation.</p>
          <div className="flex justify-center gap-2">
            <Button asChild variant="hero"><Link to="/quiz" search={{ mode: "timed" }}>Start 45:00 simulation</Link></Button>
            <Button variant="outline" onClick={() => setState((x) => ({ ...x, mastered: [] }))}><RotateCcw /> Reset deck</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="perspective h-96 cursor-pointer" onClick={() => setFlipped((f) => !f)}>
            <div className={cn("preserve-3d relative h-full w-full transition-transform duration-700", flipped && "rotate-y-180")}>
              <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl border bg-card p-8 text-center shadow-card">
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold", card.kind === "Term" ? "bg-sky/15 text-sky" : "bg-amber/15 text-amber")}>{card.kind}</span>
                <p className="font-display text-2xl font-extrabold leading-tight">{card.front}</p>
                <DomainBadge d={card.domain} />
                <p className="text-xs text-muted-foreground">Tap to flip</p>
              </div>
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col gap-4 overflow-auto rounded-3xl border border-success/40 bg-gradient-to-br from-success/15 via-card to-sky/10 p-7">
                <div><p className="text-[11px] font-bold uppercase tracking-wider text-sky">Technical Definition</p><p className="mt-1 text-sm">{card.definition}</p></div>
                <div><p className="text-[11px] font-bold uppercase tracking-wider text-success">Padi's African Analogy</p><p className="mt-1 text-sm"><span className="font-semibold">{vibeIntro[s.vibe]}</span> {card.analogy}</p></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="border-coral/50 text-coral hover:bg-coral/10" onClick={confusing}><Undo2 /> Still Confusing</Button>
            <Button variant="success" size="lg" onClick={gotIt}><ThumbsUp /> Got It, Padi!</Button>
          </div>
        </>
      )}
    </div>
  );
}

function Saved() {
  const { bookmarks } = useApp();
  if (!bookmarks.length) return (
    <div className="rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground">
      No saved analogies yet. Tap <strong>Bookmark Analogy</strong> in the quiz or Padi chat and they'll gather here.
    </div>
  );
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bookmarks.map((b) => (
        <div key={b.id} className="space-y-2 rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold">{b.title}</h3>
            <button aria-label="Remove bookmark" onClick={() => removeBookmark(b.id)} className="text-muted-foreground hover:text-coral"><Trash2 className="h-4 w-4" /></button>
          </div>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">From {b.source === "quiz" ? "quiz" : "Padi"}</span>
          <p className="text-sm">{b.analogy}</p>
        </div>
      ))}
    </div>
  );
}
