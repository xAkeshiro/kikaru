"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { themes } from "@/lib/themes";
import { Check, Lock, Loader2 } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: string;
  isPro: boolean;
  userId: string;
  onUpdate: () => void;
}

export function ThemeSelector({
  currentTheme,
  isPro,
  userId,
  onUpdate,
}: ThemeSelectorProps) {
  const supabase = createClient();
  const [selected, setSelected] = useState(currentTheme);
  const [saving, setSaving] = useState(false);

  async function selectTheme(themeId: string) {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;
    if (theme.isPro && !isPro) return;

    setSelected(themeId);
    setSaving(true);

    await supabase
      .from("profiles")
      .update({ theme: themeId })
      .eq("id", userId);

    setSaving(false);
    onUpdate();
  }

  return (
    <div className="space-y-4" id="themes">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Theme</h3>
        {saving && <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themes.map((theme) => {
          const isLocked = theme.isPro && !isPro;
          const isSelected = selected === theme.id;

          return (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              disabled={isLocked}
              className={`relative p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/5 ring-1 ring-[#8B5CF6]/20"
                  : isLocked
                  ? "border-[#262626] opacity-50 cursor-not-allowed"
                  : "border-[#262626] hover:border-[#404040]"
              }`}
            >
              {/* Theme Preview Bar */}
              <div className="flex gap-1.5 mb-3">
                <div
                  className="h-6 flex-1 rounded"
                  style={{ background: theme.variables["--kikaru-bg"] }}
                />
                <div
                  className="h-6 w-6 rounded"
                  style={{ background: theme.variables["--kikaru-accent"] }}
                />
                <div
                  className="h-6 flex-1 rounded"
                  style={{ background: theme.variables["--kikaru-surface"] }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{theme.name}</p>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    {theme.description}
                  </p>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-[#8B5CF6]" />
                )}
                {isLocked && (
                  <div className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                    <Lock className="w-3 h-3" />
                    Pro
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
