"use client";

import { useState } from "react";
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
}

const navItems = [
  { icon: Inbox, label: "Inbox", count: 12, active: true },
  { icon: Send, label: "Sent", count: 0 },
  { icon: FileEdit, label: "Drafts", count: 3 },
  { icon: Users, label: "Shared", count: 5 },
  { icon: Sparkles, label: "AI Insights", count: 0, special: true },
];

export function Sidebar({ collapsed, onToggle, onCompose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Inbox");

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex h-full flex-col border-r border-border bg-sidebar",
        "backdrop-blur-xl"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.18_270)] to-[oklch(0.6_0.25_300)] neon-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              <h1 className="gradient-text text-lg font-bold tracking-tight">
                NikodemMail
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                AI Powered
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compose Button */}
      <div className="p-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCompose}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl",
            "bg-gradient-to-r from-[oklch(0.7_0.18_270)] to-[oklch(0.6_0.25_300)]",
            "px-4 py-2.5 text-sm font-semibold text-white",
            "shadow-lg shadow-[oklch(0.7_0.18_270_/_20%)]",
            "transition-shadow hover:shadow-[oklch(0.7_0.18_270_/_40%)]",
            collapsed && "px-2"
          )}
        >
          <Plus className="h-4 w-4 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Compose
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          return (
            <motion.button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              whileHover={{ x: 2 }}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                item.special && "text-[oklch(0.75_0.2_270)]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-accent"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 h-4.5 w-4.5 shrink-0",
                  item.special && "text-[oklch(0.75_0.2_270)]"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10 flex-1 text-left"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && item.count !== undefined && item.count > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className={cn(
                    "relative z-10 rounded-full px-2 py-0.5 text-xs font-semibold",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.count}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Settings / Collapse */}
      <div className="border-t border-border p-3">
        {!collapsed && (
          <button className="mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
            <Settings className="h-4.5 w-4.5" />
            <span>Settings</span>
          </button>
        )}
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
