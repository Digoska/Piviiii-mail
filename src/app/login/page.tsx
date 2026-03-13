"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
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
            Welcome back
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Sign in to your pivi.mail account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
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
              placeholder="Your password"
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
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-foreground underline underline-offset-2 hover:no-underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
