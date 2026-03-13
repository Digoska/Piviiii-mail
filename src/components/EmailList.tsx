"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function EmailList({ emails, selectedId, onSelect }: EmailListProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[13px] font-semibold text-foreground">Inbox</h2>
        <div className="flex gap-0.5">
          {["All", "Unread"].map((filter) => (
            <button
              key={filter}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-medium transition-colors duration-150",
                filter === "All"
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
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
            onClick={() => onSelect(email)}
            className={cn(
              "group relative cursor-pointer border-b border-border px-4 py-3",
              "transition-colors duration-150",
              selectedId === email.id
                ? "bg-white/[0.06]"
                : "hover:bg-white/[0.03]"
            )}
          >
            {/* Unread dot */}
            {!email.read && (
              <div className="absolute left-1.5 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-blue-500" />
            )}

            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-medium",
                  !email.read
                    ? "bg-foreground text-background"
                    : "bg-white/[0.06] text-muted-foreground"
                )}
              >
                {email.from.avatar}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-[13px]",
                      !email.read
                        ? "font-semibold text-foreground"
                        : "font-medium text-foreground/70"
                    )}
                  >
                    {email.from.name}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {email.starred && (
                      <Star className="h-3 w-3 fill-amber-400/80 text-amber-400/80" />
                    )}
                    <span className="text-[11px] tabular-nums text-muted-foreground">
                      {email.timestamp}
                    </span>
                  </div>
                </div>
                <p
                  className={cn(
                    "truncate text-[13px] leading-snug",
                    !email.read
                      ? "text-foreground/80"
                      : "text-foreground/50"
                  )}
                >
                  {email.subject}
                </p>
                <p className="mt-0.5 truncate text-[12px] leading-snug text-muted-foreground">
                  {email.preview}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
