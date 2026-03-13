"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Paperclip, Image, Send, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ComposeModal({ open, onClose }: ComposeModalProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [minimized, setMinimized] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={
            minimized
              ? { opacity: 1, y: 0, scale: 1, height: 48 }
              : { opacity: 1, y: 0, scale: 1, height: "auto" }
          }
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn(
            "fixed bottom-4 right-6 z-50 w-[520px]",
            "glass rounded-2xl",
            "shadow-2xl shadow-black/40",
            "neon-glow",
            "flex flex-col overflow-hidden"
          )}
        >
          {/* Title Bar — draggable look */}
          <div
            className={cn(
              "flex items-center justify-between px-4 py-3",
              "border-b border-glass-border",
              "bg-gradient-to-r from-[oklch(0.12_0.02_270)] to-[oklch(0.1_0.015_300)]",
              "cursor-grab active:cursor-grabbing"
            )}
          >
            <span className="text-sm font-semibold text-foreground">
              New Message
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col"
              >
                {/* To */}
                <div className="flex items-center border-b border-border/50 px-4 py-2">
                  <span className="mr-3 text-xs font-medium text-muted-foreground">
                    To
                  </span>
                  <input
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    placeholder="recipient@email.com"
                  />
                </div>

                {/* Subject */}
                <div className="flex items-center border-b border-border/50 px-4 py-2">
                  <span className="mr-3 text-xs font-medium text-muted-foreground">
                    Subject
                  </span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Body */}
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  className="flex-1 resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                  placeholder="Write your message..."
                />

                {/* AI Auto-Reply Button */}
                <div className="px-4 pb-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-xl py-3",
                      "animate-shimmer bg-gradient-to-r from-[oklch(0.65_0.2_270)] via-[oklch(0.7_0.22_300)] to-[oklch(0.65_0.2_270)]",
                      "text-sm font-bold text-white",
                      "neon-glow-strong",
                      "transition-all hover:brightness-110"
                    )}
                  >
                    <Sparkles className="h-5 w-5" />
                    Auto-Reply in My Tone
                  </motion.button>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between border-t border-border/50 px-4 py-2.5">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                      <Image className="h-4 w-4" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-5 py-2",
                      "bg-primary text-primary-foreground",
                      "text-sm font-semibold",
                      "shadow-lg shadow-primary/20",
                      "transition-shadow hover:shadow-primary/40"
                    )}
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
