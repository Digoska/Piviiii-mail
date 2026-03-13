"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmailWithProfiles } from "@/types/database";

interface EmailListProps {
  emails: EmailWithProfiles[];
  selectedId: string | null;
  onSelect: (email: EmailWithProfiles) => void;
  currentUserId: string;
  activeFolder: string;
  loading: boolean;
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

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function EmailList({
  emails,
  selectedId,
  onSelect,
  currentUserId,
  activeFolder,
  loading,
}: EmailListProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[13px] font-semibold text-foreground">{activeFolder}</h2>
        <span className="text-[11px] text-muted-foreground">
          {emails.length} {emails.length === 1 ? "message" : "messages"}
        </span>
      </div>

      {/* List */}
      {loading && emails.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground" />
        </div>
      ) : emails.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-8 text-center">
          <p className="text-[13px] text-muted-foreground">
            No emails in {activeFolder.toLowerCase()}
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 overflow-y-auto"
        >
          {emails.map((email) => {
            const isInbound = email.to_id === currentUserId;
            const displayName = isInbound
              ? email.sender.display_name
              : email.recipient.display_name;
            const initials = displayName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
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
                {!email.is_read && isInbound && (
                  <div className="absolute left-1.5 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-blue-500" />
                )}

                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-medium",
                      !email.is_read && isInbound
                        ? "bg-foreground text-background"
                        : "bg-white/[0.06] text-muted-foreground"
                    )}
                  >
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-[13px]",
                          !email.is_read && isInbound
                            ? "font-semibold text-foreground"
                            : "font-medium text-foreground/70"
                        )}
                      >
                        {!isInbound && (
                          <span className="mr-1 text-muted-foreground">To:</span>
                        )}
                        {displayName}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {email.is_starred && (
                          <Star className="h-3 w-3 fill-amber-400/80 text-amber-400/80" />
                        )}
                        <span className="text-[11px] tabular-nums text-muted-foreground">
                          {timeAgo(email.created_at)}
                        </span>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "truncate text-[13px] leading-snug",
                        !email.is_read && isInbound
                          ? "text-foreground/80"
                          : "text-foreground/50"
                      )}
                    >
                      {email.subject || "(no subject)"}
                    </p>
                    <p className="mt-0.5 truncate text-[12px] leading-snug text-muted-foreground">
                      {email.body.slice(0, 100)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
