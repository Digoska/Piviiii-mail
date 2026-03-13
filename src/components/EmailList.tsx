"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Email } from "@/types/email";

interface EmailListProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (email: Email) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function EmailList({ emails, selectedId, onSelect }: EmailListProps) {
  return (
    <div className="flex h-full flex-col">
      {/* List Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Inbox</h2>
          <p className="text-xs text-muted-foreground">
            {emails.filter((e) => !e.read).length} unread
          </p>
        </div>
        <div className="flex gap-1">
          {["All", "Unread", "Starred"].map((filter) => (
            <button
              key={filter}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                filter === "All"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Email Items */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto"
      >
        {emails.map((email) => (
          <motion.div
            key={email.id}
            variants={item}
            whileHover={{ scale: 1.01, x: 2 }}
            whileTap={{ scale: 0.995 }}
            onClick={() => onSelect(email)}
            className={cn(
              "group relative cursor-pointer border-b border-border px-4 py-3.5",
              "transition-colors duration-200",
              selectedId === email.id
                ? "bg-accent/80"
                : "hover:bg-accent/30",
              !email.read && "bg-accent/20"
            )}
          >
            {/* Unread indicator — glowing left border */}
            {!email.read && (
              <div className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[oklch(0.7_0.18_270)] shadow-[0_0_8px_oklch(0.7_0.18_270)]" />
            )}

            <div className="flex gap-3">
              {/* Avatar */}
              <Avatar className="h-10 w-10 shrink-0 border border-border">
                <AvatarFallback
                  className={cn(
                    "text-xs font-semibold",
                    !email.read
                      ? "bg-gradient-to-br from-[oklch(0.7_0.18_270)] to-[oklch(0.6_0.25_300)] text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {email.from.avatar}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "truncate text-sm",
                      !email.read
                        ? "font-semibold text-foreground"
                        : "font-medium text-foreground/80"
                    )}
                  >
                    {email.from.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {email.starred && (
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    )}
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {email.timestamp}
                    </span>
                  </div>
                </div>
                <p
                  className={cn(
                    "truncate text-sm",
                    !email.read
                      ? "font-medium text-foreground/90"
                      : "text-foreground/60"
                  )}
                >
                  {email.subject}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {email.preview}
                </p>
                {/* Labels */}
                {email.labels.length > 0 && (
                  <div className="mt-1.5 flex gap-1">
                    {email.labels.map((label) => (
                      <Badge
                        key={label}
                        variant="secondary"
                        className="h-5 px-1.5 text-[10px] font-medium"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
