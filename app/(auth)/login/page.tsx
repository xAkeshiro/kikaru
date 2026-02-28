"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Chrome, MessageCircle, Loader2, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "password" | "magic-link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<AuthMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const supabase = createClient();

  async function handleEmailPasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMagicLinkSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuthLogin(provider: "google" | "discord") {
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  if (magicLinkSent) {
    return (
      <div className="kikaru-card text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full kikaru-gradient-bg flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-kikaru-text mb-2">
          Check your email
        </h2>
        <p className="text-kikaru-text-secondary text-sm mb-6">
          We sent a magic link to <span className="text-kikaru-text font-medium">{email}</span>.
          Click the link in your email to sign in.
        </p>
        <button
          onClick={() => {
            setMagicLinkSent(false);
            setEmail("");
          }}
          className="kikaru-btn-secondary w-full"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="kikaru-card">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-kikaru-text mb-1">
          Welcome back
        </h1>
        <p className="text-kikaru-text-secondary text-sm">
          Sign in to your account to continue
        </p>
      </div>

      {/* OAuth buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading}
          className="kikaru-btn-secondary w-full"
        >
          <Chrome className="w-4 h-4" />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin("discord")}
          disabled={loading}
          className="kikaru-btn-secondary w-full"
        >
          <MessageCircle className="w-4 h-4" />
          Continue with Discord
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-kikaru-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-kikaru-surface px-3 text-kikaru-text-secondary">
            or continue with email
          </span>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-lg border border-kikaru-border overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => {
            setMode("password");
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            mode === "password"
              ? "bg-kikaru-accent text-white"
              : "bg-transparent text-kikaru-text-secondary hover:text-kikaru-text"
          }`}
        >
          <Lock className="w-3 h-3 inline-block mr-1" />
          Password
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("magic-link");
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            mode === "magic-link"
              ? "bg-kikaru-accent text-white"
              : "bg-transparent text-kikaru-text-secondary hover:text-kikaru-text"
          }`}
        >
          <Sparkles className="w-3 h-3 inline-block mr-1" />
          Magic Link
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Email/Password form */}
      {mode === "password" && (
        <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-kikaru-text-secondary mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kikaru-text-secondary" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="kikaru-input pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-kikaru-text-secondary mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kikaru-text-secondary" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="kikaru-input pl-10 pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-kikaru-text-secondary hover:text-kikaru-text transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="kikaru-btn-primary w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      )}

      {/* Magic link form */}
      {mode === "magic-link" && (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label htmlFor="magic-email" className="block text-sm font-medium text-kikaru-text-secondary mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kikaru-text-secondary" />
              <input
                id="magic-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="kikaru-input pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="kikaru-btn-primary w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending link...
              </>
            ) : (
              "Send magic link"
            )}
          </button>
        </form>
      )}

      {/* Sign up link */}
      <p className="mt-6 text-center text-sm text-kikaru-text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-kikaru-accent hover:text-kikaru-accent-hover font-medium transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
