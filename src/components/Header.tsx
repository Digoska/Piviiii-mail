"use client";

import { Search, Bell, Command } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-5">
      {/* Search */}
      <div className="flex max-w-lg flex-1 items-center">
        <div className="flex w-full max-w-sm items-center gap-2.5 rounded-md bg-white/[0.04] px-3 py-[6px] transition-colors duration-150 focus-within:bg-white/[0.06] focus-within:ring-1 focus-within:ring-white/[0.08]">
          <Search className="h-[14px] w-[14px] shrink-0 text-muted-foreground" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-border bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-muted-foreground sm:flex">
            <Command className="h-[10px] w-[10px]" />K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
          <Bell className="h-[16px] w-[16px]" strokeWidth={1.8} />
          <span className="absolute right-1 top-1 h-[6px] w-[6px] rounded-full bg-blue-500" />
        </button>

        <div className="relative">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarFallback className="bg-white/[0.06] text-[11px] font-medium text-foreground/70">
              NK
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-px -right-px h-[9px] w-[9px] rounded-full border-[1.5px] border-background bg-emerald-500" />
        </div>
      </div>
    </header>
  );
}
