"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

import type { ChatMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

const avatarMap = {
  assistant: Bot,
  user: User
};

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";
  const Icon = avatarMap[message.role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex w-full gap-3", isAssistant ? "justify-start" : "justify-end")}
    >
      {isAssistant && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner">
          <Icon size={20} className="text-primary" />
        </div>
      )}
      <div
        className={cn(
          "flex max-w-[80%] flex-col space-y-2",
          isAssistant ? "items-start" : "items-end"
        )}
      >
        <div
          className={cn(
            "glass-panel relative rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-subtle",
            isAssistant
              ? "bg-white/10 text-foreground"
              : "ml-auto bg-primary/10 text-primary-foreground/90"
          )}
        >
          <p className="whitespace-pre-wrap text-sm">
            {isStreaming ? (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-150" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-300" />
              </span>
            ) : (
              message.content
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="subtle" className="border-none bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide">
            {isAssistant ? "Oxycore" : "You"}
          </Badge>
          <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
      {!isAssistant && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-inner">
          <Icon size={20} className="text-foreground" />
        </div>
      )}
    </motion.div>
  );
}
