"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Social } from "@/lib/types";
import { SOCIAL_PLATFORMS } from "@/lib/types";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface SocialEditorProps {
  socials: Social[];
  userId: string;
  onUpdate: () => void;
}

export function SocialEditor({
  socials: initialSocials,
  userId,
  onUpdate,
}: SocialEditorProps) {
  const supabase = createClient();
  const [socials, setSocials] = useState<Social[]>(initialSocials);
  const [adding, setAdding] = useState(false);
  const [newSocial, setNewSocial] = useState({ platform: "twitter", url: "" });

  async function addSocial() {
    if (!newSocial.url.trim()) return;
    setAdding(true);
    const { data, error } = await supabase
      .from("socials")
      .insert({
        user_id: userId,
        platform: newSocial.platform,
        url: newSocial.url,
        sort_order: socials.length,
      })
      .select()
      .single();

    if (!error && data) {
      setSocials([...socials, data]);
      setNewSocial({ platform: "twitter", url: "" });
      onUpdate();
    }
    setAdding(false);
  }

  async function deleteSocial(id: string) {
    const { error } = await supabase.from("socials").delete().eq("id", id);
    if (!error) {
      setSocials(socials.filter((s) => s.id !== id));
      onUpdate();
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Social Links</h3>

      <div className="space-y-2">
        {socials.map((social) => {
          const platform = SOCIAL_PLATFORMS.find(
            (p) => p.value === social.platform
          );
          return (
            <div
              key={social.id}
              className="flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#262626] rounded-lg"
            >
              <span className="text-xs font-mono text-[#8B5CF6] min-w-[80px]">
                {platform?.label || social.platform}
              </span>
              <span className="text-sm text-[#A1A1AA] flex-1 truncate">
                {social.url}
              </span>
              <button
                onClick={() => deleteSocial(social.id)}
                className="text-[#A1A1AA] hover:text-red-400 transition-colors"
                aria-label="Remove social link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add New Social */}
      <div className="flex gap-2 items-end">
        <select
          value={newSocial.platform}
          onChange={(e) =>
            setNewSocial({ ...newSocial, platform: e.target.value })
          }
          className="kikaru-input text-sm w-40"
        >
          {SOCIAL_PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <div className="flex-1">
          <input
            type="url"
            value={newSocial.url}
            onChange={(e) =>
              setNewSocial({ ...newSocial, url: e.target.value })
            }
            placeholder={
              SOCIAL_PLATFORMS.find((p) => p.value === newSocial.platform)
                ?.placeholder || "https://..."
            }
            className="kikaru-input text-sm"
          />
        </div>
        <button
          onClick={addSocial}
          disabled={adding || !newSocial.url.trim()}
          className="kikaru-btn-primary px-3 py-2.5 disabled:opacity-50"
        >
          {adding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
