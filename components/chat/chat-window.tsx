"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { SendHorizonal } from "lucide-react";

import type { ChatMessage } from "@/lib/api";
import { sendChatMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MemoryPanel } from "@/components/chat/memory-panel";
import { TopBar } from "@/components/chat/top-bar";
import { FooterBar } from "@/components/chat/footer-bar";

const createMessage = (overrides: Partial<ChatMessage>): ChatMessage => ({
  id: crypto.randomUUID(),
  role: "assistant",
  content: "",
  createdAt: new Date().toISOString(),
  ...overrides
});

const createWelcomeMessage = () =>
  createMessage({
    role: "assistant",
    content:
      "Welcome back! I'm Oxycore, your adaptive companion. What's on your mind today?",
    createdAt: new Date().toISOString()
  });

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createWelcomeMessage()
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage = createMessage({ role: "user", content: trimmed });
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const placeholderId = crypto.randomUUID();
    const placeholder: ChatMessage = {
      id: placeholderId,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, placeholder]);

    try {
      const response = await sendChatMessage(trimmed);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderId
            ? { ...response.message, id: placeholderId }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== placeholderId));
      toast({
        title: "Unable to reach Oxycore",
        description:
          error instanceof Error ? error.message : "Something went wrong while contacting the AI.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([createWelcomeMessage()]);
    setInputValue("");
  };

  return (
    <div className="relative grid w-full max-w-5xl grid-rows-[auto,1fr,auto] gap-6 rounded-[32px] border border-white/10 bg-black/50 p-6 shadow-subtle backdrop-blur-2xl">
      <TopBar onOpenMemories={() => setIsMemoriesOpen(true)} onNewChat={handleNewChat} />
      <div className="glass-panel flex min-h-[420px] flex-col overflow-hidden border-white/5 bg-black/40 p-0">
        <ScrollArea className="h-full p-6">
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isStreaming={isLoading && message === messages[messages.length - 1] && message.role === "assistant" && !message.content}
                />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="border-t border-white/5 bg-black/30 p-4">
          <div className="flex items-end gap-3">
            <Textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share a thought, ask for guidance, or explore a new idea..."
              className="h-28 resize-none bg-black/40"
            />
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="mb-1 h-12 w-20 rounded-3xl"
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <motion.span
                  className="flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white delay-150" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white delay-300" />
                </motion.span>
              ) : (
                <SendHorizonal className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <FooterBar />
      <MemoryPanel open={isMemoriesOpen} onOpenChange={setIsMemoriesOpen} />
    </div>
  );
}
