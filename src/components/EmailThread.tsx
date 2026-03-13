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
import type { Email } from "@/types/email";

interface EmailThreadProps {
  email: Email;
}

export function EmailThread({ email }: EmailThreadProps) {
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
          {[
            { icon: Reply, label: "Reply" },
            { icon: Forward, label: "Forward" },
            { icon: Archive, label: "Archive" },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground"
            >
              <action.icon className="h-[15px] w-[15px]" strokeWidth={1.8} />
              <span className="hidden md:inline">{action.label}</span>
            </button>
          ))}

          <div className="mx-1.5 h-4 w-px bg-border" />

          {/* AI Summary */}
          <button className="flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors duration-150 hover:bg-white/[0.1]">
            <Sparkles className="h-[14px] w-[14px] text-blue-400" strokeWidth={2} />
            AI Summary
          </button>
        </div>

        <div className="flex items-center gap-0.5">
          <button className="rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
            <Star
              className={cn(
                "h-4 w-4",
                email.starred && "fill-amber-400/80 text-amber-400/80"
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
          {/* Subject */}
          <h1 className="font-serif text-2xl italic leading-tight tracking-tight text-foreground">
            {email.subject}
          </h1>

          {/* Labels */}
          <div className="mt-3 flex items-center gap-2">
            {email.labels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {label}
              </span>
            ))}
            <span className="text-[12px] text-muted-foreground">
              {email.timestamp}
            </span>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-border" />

          {/* Sender */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-white/[0.06] text-[12px] font-medium text-foreground/70">
                  {email.from.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-foreground">
                    {email.from.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <span>{email.from.email}</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <span className="text-[12px] text-muted-foreground">to me</span>
          </div>

          {/* Body */}
          <div className="mt-8 whitespace-pre-line text-[14px] leading-[1.7] text-foreground/80">
            {email.body}
          </div>
        </div>
      </div>

      {/* Multiplayer footer */}
      <div className="border-t border-border px-5 py-2.5">
        <div className="flex items-center gap-2.5">
          {/* Typing indicator */}
          <div className="relative">
            <Avatar className="h-6 w-6 border border-border">
              <AvatarFallback className="bg-emerald-500/10 text-[9px] font-medium text-emerald-500">
                DK
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-px -right-px h-2 w-2 rounded-full border-[1.5px] border-background bg-emerald-500" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-foreground/60">
              Dominik is typing
            </span>
            <span className="flex gap-[3px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="inline-block h-[4px] w-[4px] rounded-full bg-foreground/40"
                />
              ))}
            </span>
          </div>

          {/* Viewers */}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {["TS", "JM"].map((initials) => (
                <Avatar
                  key={initials}
                  className="h-5 w-5 border-[1.5px] border-background"
                >
                  <AvatarFallback className="bg-white/[0.06] text-[8px] font-medium text-muted-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              2 viewing
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
