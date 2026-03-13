"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Paperclip, Image, ArrowUp, Minus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/database";

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
  currentProfile: Profile;
  onSent: () => void;
}

export function ComposeModal({ open, onClose, currentProfile, onSent }: ComposeModalProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!to.trim()) {
      setError("Enter a recipient");
      return;
    }

    setError("");
    setSending(true);

    const supabase = createClient();

    // Resolve recipient username — strip @pivi.mail if present
    const recipientUsername = to
      .trim()
      .toLowerCase()
      .replace(/@pivi\.mail$/, "");

    const { data: recipient } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", recipientUsername)
      .single();

    if (!recipient) {
      setError(`User "${recipientUsername}@pivi.mail" not found`);
      setSending(false);
      return;
    }

    const { error: insertErr } = await supabase.from("emails").insert({
      from_id: currentProfile.id,
      to_id: recipient.id,
      subject: subject.trim(),
      body: body.trim(),
    });

    if (insertErr) {
      setError(insertErr.message);
      setSending(false);
      return;
    }

    // Success — reset and close
    setTo("");
    setSubject("");
    setBody("");
    setSending(false);
    onSent();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={
            minimized
              ? { opacity: 1, y: 0, scale: 1, height: 44 }
              : { opacity: 1, y: 0, scale: 1, height: "auto" }
          }
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            "fixed bottom-4 right-5 z-50 w-[480px]",
            "overflow-hidden rounded-xl border border-border bg-[#1c1d21]",
            "shadow-2xl shadow-black/50",
            "flex flex-col"
          )}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between bg-[#191a1e] px-4 py-2.5">
            <span className="text-[13px] font-medium text-foreground">
              New Message
            </span>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setMinimized(!minimized)}
                className="rounded p-1 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.06] hover:text-foreground"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onClose}
                className="rounded p-1 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.06] hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col"
              >
                {/* To */}
                <div className="flex items-center border-b border-border px-4 py-2">
                  <span className="mr-3 text-[12px] text-muted-foreground">
                    To
                  </span>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                    placeholder="username or username@pivi.mail"
                  />
                </div>

                {/* Subject */}
                <div className="flex items-center border-b border-border px-4 py-2">
                  <span className="mr-3 text-[12px] text-muted-foreground">
                    Subject
                  </span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                    placeholder="Subject"
                  />
                </div>

                {/* Body */}
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  className="flex-1 resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  placeholder="Write your message..."
                />

                {/* Error */}
                {error && (
                  <div className="px-4 pb-2">
                    <p className="text-[12px] text-red-400">{error}</p>
                  </div>
                )}

                {/* AI button */}
                <div className="px-4 pb-3">
                  <button
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-lg py-2.5",
                      "bg-gradient-to-r from-blue-600/90 to-indigo-600/90",
                      "text-[13px] font-medium text-white",
                      "transition-opacity hover:opacity-90"
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    Auto-Reply in My Tone
                  </button>
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-between border-t border-border px-4 py-2">
                  <div className="flex items-center gap-0.5">
                    <button className="rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
                      <Paperclip className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                    <button className="rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground">
                      <Image className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
