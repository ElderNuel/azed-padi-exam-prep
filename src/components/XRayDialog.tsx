import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIM_MAP_PROMPT, OCEAN_PROMPT, SYSTEM_PROMPT } from "@/data/prompts";
import { Brain } from "lucide-react";

export function XRayDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const tabs = [
    { id: "aim", label: "AIM + MAP", body: AIM_MAP_PROMPT },
    { id: "ocean", label: "OCEAN", body: OCEAN_PROMPT },
    { id: "sys", label: "Padi System Prompt (live)", body: SYSTEM_PROMPT },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <Brain className="h-6 w-6 text-sky" /> Prompt X-Ray
          </DialogTitle>
          <DialogDescription>
            For hackathon judges: the exact prompts powering AZed Padi. The system prompt below is injected server-side into every Ask Padi chat.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="aim">
          <TabsList className="grid w-full grid-cols-3">
            {tabs.map((t) => <TabsTrigger key={t.id} value={t.id} className="text-xs sm:text-sm">{t.label}</TabsTrigger>)}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.id} value={t.id}>
              <ScrollArea className="h-[55vh] rounded-xl border bg-muted/40">
                <pre className="whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-foreground">{t.body}</pre>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
