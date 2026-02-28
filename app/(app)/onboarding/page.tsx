"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isValidUsername } from "@/lib/utils";
import { themes } from "@/lib/themes";
import {
  User,
  Upload,
  Palette,
  Link2,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

const steps = [
  { title: "Choose Username", icon: User },
  { title: "Your Profile", icon: Upload },
  { title: "Pick a Theme", icon: Palette },
  { title: "Add Links", icon: Link2 },
];

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Username
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Step 2: Profile
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Step 3: Theme
  const [selectedTheme, setSelectedTheme] = useState("midnight");

  // Step 4: Links
  const [links, setLinks] = useState([{ title: "", url: "" }]);

  async function checkUsername(value: string) {
    if (!isValidUsername(value)) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", value.toLowerCase())
      .single();
    setUsernameAvailable(!data);
    setCheckingUsername(false);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function addLink() {
    setLinks([...links, { title: "", url: "" }]);
  }

  function updateLink(index: number, field: "title" | "url", value: string) {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  }

  function removeLink(index: number) {
    setLinks(links.filter((_, i) => i !== index));
  }

  function canProceed(): boolean {
    switch (currentStep) {
      case 0:
        return isValidUsername(username) && usernameAvailable === true;
      case 1:
        return displayName.trim().length > 0;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  }

  async function handleComplete() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let avatarUrl = null;
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `${user.id}/avatar.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true });
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath);
        avatarUrl = publicUrl;
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        username: username.toLowerCase(),
        display_name: displayName,
        bio: bio || null,
        avatar_url: avatarUrl,
        theme: selectedTheme,
      });

      if (profileError) throw profileError;

      // Add links
      const validLinks = links.filter((l) => l.title.trim() && l.url.trim());
      if (validLinks.length > 0) {
        const { error: linksError } = await supabase.from("links").insert(
          validLinks.map((l, i) => ({
            user_id: user.id,
            title: l.title,
            url: l.url,
            sort_order: i,
          }))
        );
        if (linksError) throw linksError;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono font-bold tracking-tight">
            <span className="text-[#8B5CF6]">k</span>ikaru
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Let&apos;s set up your page</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
                  i === currentStep
                    ? "bg-[#8B5CF6] text-white"
                    : i < currentStep
                    ? "bg-[#8B5CF6]/20 text-[#8B5CF6]"
                    : "bg-[#141414] text-[#A1A1AA] border border-[#262626]"
                }`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-[2px] mx-1 ${
                    i < currentStep ? "bg-[#8B5CF6]/40" : "bg-[#262626]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-1">{steps[currentStep].title}</h2>

          {/* Step 1: Username */}
          {currentStep === 0 && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-[#A1A1AA]">
                Pick a unique username. This will be your public page URL.
              </p>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#A1A1AA] font-mono">kikaru.net/u/</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameAvailable(null);
                    }}
                    onBlur={() => checkUsername(username)}
                    placeholder="yourname"
                    className="kikaru-input flex-1"
                    maxLength={30}
                  />
                </div>
                {checkingUsername && (
                  <p className="text-xs text-[#A1A1AA] mt-2 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Checking availability...
                  </p>
                )}
                {usernameAvailable === true && (
                  <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Username is available
                  </p>
                )}
                {usernameAvailable === false && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Username is taken
                  </p>
                )}
                {username && !isValidUsername(username) && (
                  <p className="text-xs text-[#A1A1AA] mt-2">
                    3-30 characters. Letters, numbers, hyphens, underscores only.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Profile */}
          {currentStep === 1 && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-[#A1A1AA]">
                Tell the world about yourself.
              </p>
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
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                <div className="text-sm text-[#A1A1AA]">
                  Upload your avatar
                  <br />
                  <span className="text-xs">JPG, PNG, or WebP. Max 2MB.</span>
                </div>
              </div>
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
                  placeholder="Tell people about yourself and your work..."
                  className="kikaru-input min-h-[100px] resize-none"
                  maxLength={300}
                />
                <p className="text-xs text-[#A1A1AA] mt-1 text-right">
                  {bio.length}/300
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Theme */}
          {currentStep === 2 && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-[#A1A1AA]">
                Choose a theme for your public page. You can change this anytime.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {themes
                  .filter((t) => !t.isPro)
                  .map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        selectedTheme === theme.id
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                          : "border-[#262626] hover:border-[#404040]"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ background: theme.variables["--kikaru-accent"] }}
                        />
                        <span className="text-sm font-medium">{theme.name}</span>
                      </div>
                      <p className="text-xs text-[#A1A1AA]">{theme.description}</p>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Step 4: Links */}
          {currentStep === 3 && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-[#A1A1AA]">
                Add some links to get started. You can always add more later.
              </p>
              <div className="space-y-3">
                {links.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(i, "title", e.target.value)}
                      placeholder="Link Title"
                      className="kikaru-input flex-1"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(i, "url", e.target.value)}
                      placeholder="https://..."
                      className="kikaru-input flex-1"
                    />
                    {links.length > 1 && (
                      <button
                        onClick={() => removeLink(i)}
                        className="px-3 text-[#A1A1AA] hover:text-red-400 transition-colors"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addLink}
                className="text-sm text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
              >
                + Add another link
              </button>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400 mt-4 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            className="kikaru-btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="kikaru-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={loading}
              className="kikaru-btn-primary disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Complete Setup
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
