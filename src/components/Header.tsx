"use client";

import { Search, Bell, Command } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      {/* Search Bar */}
      <div className="flex max-w-xl flex-1 items-center">
        <div
          className={cn(
            "glass flex w-full max-w-md items-center gap-3 rounded-xl px-4 py-2.5",
            "transition-all duration-300",
            "focus-within:neon-glow focus-within:border-[oklch(0.7_0.18_270_/_30%)]"
          )}
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search emails, contacts, or use AI..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="flex shrink-0 items-center gap-1 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <Command className="h-3 w-3" />K
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[oklch(0.7_0.18_270)] shadow-[0_0_6px_oklch(0.7_0.18_270)]" />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <Avatar className="h-9 w-9 border-2 border-border transition-all hover:border-[oklch(0.7_0.18_270_/_50%)]">
            <AvatarFallback className="bg-gradient-to-br from-[oklch(0.7_0.18_270)] to-[oklch(0.6_0.25_300)] text-sm font-bold text-white">
              NK
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500 shadow-[0_0_8px_oklch(0.72_0.17_142)]" />
        </div>
      </div>
    </header>
  );
}
