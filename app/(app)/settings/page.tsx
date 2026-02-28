"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";
import { isValidUsername } from "@/lib/utils";
import {
  User,
  Mail,
  Lock,
  Trash2,
  Loader2,
  AlertCircle,
  Check,
  ArrowLeft,
  Crown,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form state
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setUsername(data.username);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [supabase, router]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  async function updateUsername() {
    if (!profile) return;
    if (!isValidUsername(username)) {
      showMessage("error", "Invalid username. Use 3-30 characters with letters, numbers, hyphens, or underscores.");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username: username.toLowerCase() })
      .eq("id", profile.id);

    if (error) {
      showMessage("error", error.message.includes("unique") ? "Username is already taken." : error.message);
    } else {
      showMessage("success", "Username updated successfully.");
      setProfile({ ...profile, username: username.toLowerCase() });
    }
    setSaving(false);
  }

  async function updatePassword() {
    if (newPassword.length < 6) {
      showMessage("error", "Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("error", "Passwords do not match.");
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      showMessage("error", error.message);
    } else {
      showMessage("success", "Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    }
    setSaving(false);
  }

  async function deleteAccount() {
    if (deleteConfirmText !== "DELETE") return;
    setSaving(true);

    // Sign out and delete (deletion should be handled by a server function in production)
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#8B5CF6]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-[#262626] bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[#A1A1AA] hover:text-white transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-lg font-mono font-bold tracking-tight">
              <span className="text-[#8B5CF6]">k</span>ikaru
            </span>
          </div>
          <span className="text-sm text-[#A1A1AA]">Settings</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message.text}
          </div>
        )}

        {/* Username */}
        <section className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-lg font-semibold">Username</h2>
          </div>
          <p className="text-sm text-[#A1A1AA] mb-4">
            Your public page URL will be kikaru.net/u/{username || "..."}
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="kikaru-input flex-1"
              placeholder="username"
            />
            <button
              onClick={updateUsername}
              disabled={saving || username === profile?.username}
              className="kikaru-btn-primary px-4 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </button>
          </div>
        </section>

        {/* Email (read-only) */}
        <section className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-lg font-semibold">Email</h2>
          </div>
          <p className="text-sm text-[#A1A1AA] mb-2">
            Your email address is managed through your authentication provider.
          </p>
          <div className="kikaru-input bg-[#0A0A0A] opacity-60 cursor-not-allowed">
            {profile?.id ? "Loaded from auth provider" : "..."}
          </div>
        </section>

        {/* Password */}
        <section className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-lg font-semibold">Change Password</h2>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="kikaru-input"
              placeholder="New password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="kikaru-input"
              placeholder="Confirm new password"
            />
            <button
              onClick={updatePassword}
              disabled={saving || !newPassword}
              className="kikaru-btn-primary px-4 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </section>

        {/* Pro Upgrade */}
        <section className="bg-[#141414] border border-[#8B5CF6]/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-lg font-semibold">
              {profile?.is_pro ? "Pro Plan" : "Upgrade to Pro"}
            </h2>
          </div>
          {profile?.is_pro ? (
            <p className="text-sm text-[#A1A1AA]">
              You are on the Pro plan. Thank you for supporting Kikaru.
            </p>
          ) : (
            <div>
              <p className="text-sm text-[#A1A1AA] mb-4">
                Unlock unlimited pages, custom domains, premium themes, analytics, and more.
              </p>
              <div className="flex gap-3">
                <button className="kikaru-btn-primary px-6">
                  $5/month
                </button>
                <button className="kikaru-btn-secondary px-6">
                  $48/year (save 20%)
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Danger Zone */}
        <section className="bg-[#141414] border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">
              Delete Account
            </h2>
          </div>
          <p className="text-sm text-[#A1A1AA] mb-4">
            This action is permanent. All your data, pages, and uploaded content
            will be deleted and cannot be recovered.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
            >
              Delete my account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-400">
                Type DELETE to confirm account deletion.
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="kikaru-input border-red-500/30 focus:border-red-500"
                placeholder="Type DELETE"
              />
              <div className="flex gap-3">
                <button
                  onClick={deleteAccount}
                  disabled={deleteConfirmText !== "DELETE" || saving}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm disabled:opacity-50 hover:bg-red-600 transition-colors"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Permanently Delete Account"
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText("");
                  }}
                  className="kikaru-btn-secondary text-sm px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
