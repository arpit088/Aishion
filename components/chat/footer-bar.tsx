import { Separator } from "@/components/ui/separator";

export function FooterBar() {
  return (
    <footer className="mt-6 flex flex-col items-center justify-between gap-3 rounded-3xl border border-white/5 bg-black/30 px-5 py-4 text-xs text-muted-foreground backdrop-blur-lg md:flex-row">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400/80" />
        <span>Realtime cognition active</span>
      </div>
      <Separator orientation="vertical" className="hidden h-4 md:block" />
      <div className="flex flex-wrap items-center justify-center gap-2 text-center md:justify-end">
        <span className="font-medium text-foreground">Tip:</span>
        <span>
          Use <code className="rounded-md bg-white/10 px-1.5 py-0.5">Shift + Enter</code> to add a newline without
          sending.
        </span>
      </div>
    </footer>
  );
}
