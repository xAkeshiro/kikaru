"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";
import { Save, Loader2, Upload } from "lucide-react";

interface ProfileEditorProps {
  profile: Profile;
  onUpdate: () => void;
}

export function ProfileEditor({ profile, onUpdate }: ProfileEditorProps) {
  const supabase = createClient();
  const [displayName, setDisplayName] = useState(profile.display_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [location, setLocation] = useState(profile.location || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile.avatar_url
  );

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${profile.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", profile.id);

    setAvatarPreview(publicUrl);
    onUpdate();
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName || null,
        bio: bio || null,
        location: location || null,
      })
      .eq("id", profile.id);

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onUpdate();
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Profile</h3>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <label className="relative cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-[#0A0A0A] border border-[#262626] flex items-center justify-center overflow-hidden group-hover:border-[#8B5CF6] transition-colors">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload className="w-5 h-5 text-[#A1A1AA]" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </label>
        <div className="text-sm text-[#A1A1AA]">
          Click to change avatar
        </div>
      </div>

      {/* Fields */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your Name"
          className="kikaru-input"
          maxLength={50}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A short bio about yourself..."
          className="kikaru-input min-h-[100px] resize-none"
          maxLength={300}
        />
        <p className="text-xs text-[#A1A1AA] mt-1 text-right">
          {bio.length}/300
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country"
          className="kikaru-input"
          maxLength={100}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="kikaru-btn-primary"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : saved ? (
          <>
            <Save className="w-4 h-4" />
            Saved!
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Profile
          </>
        )}
      </button>
    </div>
  );
}
