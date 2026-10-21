import { DOMAINS, type DomainKey } from "@/data/seedQuestions";
import { cn } from "@/lib/utils";

const tone: Record<DomainKey, string> = {
  d1: "border-d1/40 bg-d1/10 text-d1",
  d2: "border-d2/40 bg-d2/10 text-d2",
  d3: "border-d3/40 bg-d3/10 text-d3",
};

export function DomainBadge({ d, full, className }: { d: DomainKey; full?: boolean; className?: string }) {
  const info = DOMAINS[d];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", tone[d], className)}>
      D{d.slice(1)} · {full ? info.name : info.short} · {info.weight}
    </span>
  );
}

export function WeightStrip() {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(DOMAINS) as DomainKey[]).map((d) => <DomainBadge key={d} d={d} />)}
    </div>
  );
}

export const vibeIntro = { en: "Here's the picture:", pcm: "No wahala, make I break am down:", sw: "Sawa rafiki, tuanze na msingi:" } as const;
