"use client";

import { motion } from "framer-motion";
import {
  Reply,
  Forward,
  Archive,
  Sparkles,
  Star,
  MoreHorizontal,
  Paperclip,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Email } from "@/types/email";

interface EmailThreadProps {
  email: Email;
}

export function EmailThread({ email }: EmailThreadProps) {
  return (
    <motion.div
      key={email.id}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex h-full flex-col"
    >
      {/* Reading Heatmap Bar */}
      <div className="relative h-1 w-full overflow-hidden bg-muted">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.7_0.18_270)] via-[oklch(0.65_0.2_200)] to-emerald-500"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute right-2 top-1.5 text-[9px] font-medium text-muted-foreground"
        >
          Read: 100%
        </motion.div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          {[
            { icon: Reply, label: "Reply" },
            { icon: Forward, label: "Forward" },
            { icon: Archive, label: "Archive" },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5",
                "text-sm text-muted-foreground",
                "transition-colors hover:bg-accent hover:text-foreground"
              )}
            >
              <action.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{action.label}</span>
            </motion.button>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {/* AI Summary Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-4 py-1.5",
              "bg-gradient-to-r from-[oklch(0.7_0.18_270)] via-[oklch(0.65_0.22_290)] to-[oklch(0.6_0.25_300)]",
              "text-sm font-semibold text-white",
              "shadow-lg shadow-[oklch(0.7_0.18_270_/_20%)]",
              "transition-shadow hover:shadow-[oklch(0.7_0.18_270_/_40%)]"
            )}
          >
            <Sparkles className="h-4 w-4" />
            AI Summary
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Star
              className={cn(
                "h-4 w-4",
                email.starred && "fill-amber-400 text-amber-400"
              )}
            />
          </button>
          <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Subject */}
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {email.subject}
        </h1>

        {/* Labels */}
        <div className="mt-2 flex items-center gap-2">
          {email.labels.map((label) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {email.timestamp}
          </span>
        </div>

        <Separator className="my-5" />

        {/* Sender info */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-border">
              <AvatarFallback className="bg-gradient-to-br from-[oklch(0.7_0.18_270)] to-[oklch(0.6_0.25_300)] text-sm font-bold text-white">
                {email.from.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {email.from.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {email.from.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Paperclip className="h-3 w-3" />
            <span>to me</span>
          </div>
        </div>

        {/* Email Body */}
        <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
          {email.body}
        </div>
      </div>

      {/* Multiplayer / Typing Indicator */}
      <div className="border-t border-border px-6 py-3">
        <div className="flex items-center gap-3">
          {/* Typing avatar */}
          <div className="relative">
            <Avatar className="h-7 w-7 border border-border">
              <AvatarFallback className="bg-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                DK
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-background bg-emerald-500 shadow-[0_0_6px_oklch(0.72_0.17_142)]" />
          </div>

          {/* Typing text */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-emerald-400">
              Dominik is typing
            </span>
            <motion.div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="inline-block h-1 w-1 rounded-full bg-emerald-400"
                />
              ))}
            </motion.div>
          </div>

          {/* Other viewers */}
          <div className="ml-auto flex items-center gap-1">
            <div className="flex -space-x-1.5">
              {["TS", "JM"].map((initials) => (
                <Avatar
                  key={initials}
                  className="h-6 w-6 border-2 border-background"
                >
                  <AvatarFallback className="bg-muted text-[9px] font-semibold text-muted-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">
              2 viewing
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
