"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  Send,
  FileEdit,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onCompose: () => void;
  activeFolder: string;
  onFolderChange: (folder: string) => void;
  folderCounts: Record<string, number>;
}

const navItems = [
  { icon: Inbox, label: "Inbox" },
  { icon: Send, label: "Sent" },
  { icon: FileEdit, label: "Drafts" },
  { icon: Users, label: "Shared" },
  { icon: Sparkles, label: "AI Insights" },
];

export function Sidebar({
  collapsed,
  onToggle,
  onCompose,
  activeFolder,
  onFolderChange,
  folderCounts,
}: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex h-full flex-col border-r border-border bg-sidebar"
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 px-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground">
          <span className="font-serif text-sm italic text-background">N</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="flex items-baseline gap-1.5"
            >
              <h1 className="font-serif text-lg italic tracking-tight text-foreground">
                Nikodem
              </h1>
              <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
                MAIL
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compose */}
      <div className="px-3 pb-1 pt-2">
        <button
          onClick={onCompose}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg",
            "bg-foreground px-3 py-2 text-[13px] font-medium text-background",
            "transition-opacity hover:opacity-90",
            collapsed && "px-0"
          )}
        >
          <Plus className="h-4 w-4 shrink-0" strokeWidth={2} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.12 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Compose
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-3 flex-1 space-y-0.5 px-2">
        {navItems.map((navItem) => {
          const Icon = navItem.icon;
          const isActive = activeFolder === navItem.label;
          const count = folderCounts[navItem.label] ?? 0;
          return (
            <button
              key={navItem.label}
              onClick={() => onFolderChange(navItem.label)}
              className={cn(
                "group relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] transition-colors duration-150",
                isActive
                  ? "bg-white/[0.08] font-medium text-foreground"
                  : "text-sidebar-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="flex-1 text-left"
                  >
                    {navItem.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && count > 0 && (
                <span
                  className={cn(
                    "min-w-[20px] text-right text-xs tabular-nums",
                    isActive ? "text-foreground/60" : "text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-2 py-2">
        {!collapsed && (
          <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-sidebar-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
            <Settings className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span>Settings</span>
          </button>
        )}
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          ) : (
            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
