"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Database } from "lucide-react";

import type { MemoryItem } from "@/lib/api";
import { fetchMemories } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface MemoryPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MemoryPanel({ open, onOpenChange }: MemoryPanelProps) {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMemories();
        if (!isMounted) return;
        setMemories(data);
      } catch (err) {
        if (!isMounted) return;
        setError((err as Error).message);
        setMemories([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-panel border-white/5 bg-black/70">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Database className="h-5 w-5 text-primary" />
            Memory Bank
          </SheetTitle>
          <SheetDescription>
            Contextual knowledge the assistant can recall during your conversations.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex-1">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted-foreground">Loading memories…</span>
            </div>
          ) : memories.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <CalendarClock className="mb-3 h-10 w-10 text-muted-foreground/60" />
              <p>No memories yet.</p>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground/80">
                Memories will appear here once the AI begins storing contextual insights from your chats.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-full pr-4">
              <ul className="space-y-4">
                {memories.map((memory) => (
                  <li key={memory.id} className="rounded-3xl border border-white/5 bg-white/5 p-4 shadow-inner">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{memory.title}</h3>
                      <Badge variant="subtle" className="border-none bg-primary/10 text-[10px] uppercase tracking-wide text-primary">
                        {new Date(memory.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    {memory.summary && (
                      <p className="mt-2 text-sm text-muted-foreground">{memory.summary}</p>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
          {error && (
            <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}
        </div>
        <Separator className="my-4 border-white/10" />
        <div className="flex items-center justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
