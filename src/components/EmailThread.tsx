"use client";

import { motion } from "framer-motion";
import {
  Reply,
  Forward,
  Archive,
  Sparkles,
  Star,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { EmailWithProfiles } from "@/types/database";

interface EmailThreadProps {
  email: EmailWithProfiles;
  currentUserId: string;
  onToggleStar: (emailId: string) => void;
  onArchive: (emailId: string) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EmailThread({ email, currentUserId, onToggleStar, onArchive }: EmailThreadProps) {
  const isInbound = email.to_id === currentUserId;
  const senderInitials = email.sender.display_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      key={email.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-full flex-col"
    >
      {/* Reading progress */}
      <div className="relative h-[2px] w-full bg-transparent">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="absolute inset-y-0 left-0 bg-blue-500/60"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-b border-border px-5 py-2">
        <div className="flex items-center gap-0.5">
          <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
            <Reply className="h-[15px] w-[15px]" strokeWidth={1.8} />
            <span className="hidden md:inline">Reply</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
            <Forward className="h-[15px] w-[15px]" strokeWidth={1.8} />
            <span className="hidden md:inline">Forward</span>
          </button>
          <button
            onClick={() => onArchive(email.id)}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground"
          >
            <Archive className="h-[15px] w-[15px]" strokeWidth={1.8} />
            <span className="hidden md:inline">Archive</span>
          </button>

          <div className="mx-1.5 h-4 w-px bg-border" />

          <button className="flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors duration-150 hover:bg-white/[0.1]">
            <Sparkles className="h-[14px] w-[14px] text-blue-400" strokeWidth={2} />
            AI Summary
          </button>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onToggleStar(email.id)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground"
          >
            <Star
              className={cn(
                "h-4 w-4",
                email.is_starred && "fill-amber-400/80 text-amber-400/80"
              )}
              strokeWidth={1.8}
            />
          </button>
          <button className="rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-8">
          <h1 className="font-serif text-2xl italic leading-tight tracking-tight text-foreground">
            {email.subject || "(no subject)"}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-[12px] text-muted-foreground">
              {formatDate(email.created_at)}
            </span>
          </div>

          <div className="my-6 h-px bg-border" />

          {/* Sender */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-white/[0.06] text-[12px] font-medium text-foreground/70">
                  {senderInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-[13px] font-semibold text-foreground">
                  {email.sender.display_name}
                </span>
                <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <span>{email.sender.username}@pivi.mail</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <span className="text-[12px] text-muted-foreground">
              to {isInbound ? "me" : email.recipient.display_name}
            </span>
          </div>

          {/* Body */}
          <div className="mt-8 whitespace-pre-line text-[14px] leading-[1.7] text-foreground/80">
            {email.body}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
