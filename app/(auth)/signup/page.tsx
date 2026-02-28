"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Chrome, MessageCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setEmailSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuthSignup(provider: "google" | "discord") {
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  if (emailSent) {
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
          We sent a confirmation link to{" "}
          <span className="text-kikaru-text font-medium">{email}</span>.
          Click the link to verify your account and get started.
        </p>
        <button
          onClick={() => {
            setEmailSent(false);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }}
          className="kikaru-btn-secondary w-full"
        >
          Back to sign up
        </button>
      </div>
    );
  }

  return (
    <div className="kikaru-card">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-kikaru-text mb-1">
          Create your account
        </h1>
        <p className="text-kikaru-text-secondary text-sm">
          Start building your creative page
        </p>
      </div>

      {/* OAuth buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => handleOAuthSignup("google")}
          disabled={loading}
          className="kikaru-btn-secondary w-full"
        >
          <Chrome className="w-4 h-4" />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignup("discord")}
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
            or sign up with email
          </span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Signup form */}
      <form onSubmit={handleSignup} className="space-y-4">
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
              placeholder="At least 6 characters"
              required
              minLength={6}
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

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-kikaru-text-secondary mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kikaru-text-secondary" />
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              minLength={6}
              className="kikaru-input pl-10 pr-10"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-kikaru-text-secondary hover:text-kikaru-text transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-kikaru-text-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-kikaru-accent hover:text-kikaru-accent-hover font-medium transition-colors"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
