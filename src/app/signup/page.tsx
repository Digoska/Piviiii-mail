"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailAddress = username
    ? `${username.toLowerCase().replace(/[^a-z0-9._-]/g, "")}@pivi.mail`
    : "";

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9._-]/g, "");
    if (cleanUsername.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    // Check if username is taken
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", cleanUsername)
      .single();

    if (existing) {
      setError("Username already taken");
      setLoading(false);
      return;
    }

    // Sign up — the trigger will create the profile
    const { error: err } = await supabase.auth.signUp({
      email: `${cleanUsername}@pivi.mail`,
      password,
      options: {
        data: {
          username: cleanUsername,
          display_name: displayName || cleanUsername,
        },
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Auto-login after signup
    const { error: loginErr } = await supabase.auth.signInWithPassword({
      email: `${cleanUsername}@pivi.mail`,
      password,
    });

    if (!loginErr) {
      router.push("/");
      router.refresh();
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="font-serif text-xl italic text-foreground">
            Welcome to pivi.mail
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Your address is <span className="text-foreground">{emailAddress}</span>
          </p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Redirecting...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-[360px]"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
            <span className="font-serif text-lg italic text-background">N</span>
          </div>
          <h1 className="font-serif text-2xl italic tracking-tight text-foreground">
            Create your mailbox
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Get your own @pivi.mail address
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              Choose your address
            </label>
            <div className="flex items-center overflow-hidden rounded-lg border border-border bg-white/[0.03] transition-colors duration-150 focus-within:border-white/[0.12] focus-within:ring-1 focus-within:ring-white/[0.06]">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                className="flex-1 bg-transparent px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              <span className="border-l border-border bg-white/[0.02] px-3 py-2 text-[13px] text-muted-foreground">
                @pivi.mail
              </span>
            </div>
            {username && (
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                Your email will be{" "}
                <span className="text-foreground">{emailAddress}</span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              Display name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className={cn(
                "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2",
                "text-[13px] text-foreground placeholder:text-muted-foreground/50",
                "transition-colors duration-150",
                "focus:border-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/[0.06]"
              )}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required
              className={cn(
                "w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2",
                "text-[13px] text-foreground placeholder:text-muted-foreground/50",
                "transition-colors duration-150",
                "focus:border-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/[0.06]"
              )}
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg",
              "bg-foreground px-3 py-2 text-[13px] font-medium text-background",
              "transition-opacity hover:opacity-90 disabled:opacity-50"
            )}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground underline underline-offset-2 hover:no-underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
