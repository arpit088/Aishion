import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Oxycore UI",
  description: "A clean conversational interface for the Oxycore AI companion"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          inter.variable,
          "font-sans"
        )}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.12),transparent_60%)]" />
        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
