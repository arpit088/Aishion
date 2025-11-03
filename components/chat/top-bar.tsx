"use client";

import { Sparkles, SquarePen, Brain } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TopBarProps {
  onOpenMemories: () => void;
  onNewChat?: () => void;
}

export function TopBar({ onOpenMemories, onNewChat }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/40 via-primary/20 to-transparent shadow-glow">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Oxycore
          </p>
          <h1 className="text-xl font-semibold text-foreground">AI Companion</h1>
        </div>
      </div>
      <TooltipProvider>
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="New chat"
                onClick={onNewChat}
              >
                <SquarePen className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Start a new conversation</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="View memories"
                onClick={onOpenMemories}
              >
                <Brain className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Open memory bank</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </header>
  );
}
