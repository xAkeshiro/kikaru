"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { LinkEditor } from "@/components/dashboard/link-editor";
import { PortfolioEditor } from "@/components/dashboard/portfolio-editor";
import { SocialEditor } from "@/components/dashboard/social-editor";
import { ProfileEditor } from "@/components/dashboard/profile-editor";
import { ThemeSelector } from "@/components/dashboard/theme-selector";
import type { Profile, Link as LinkType, Social, PortfolioItem } from "@/lib/types";
import {
  Link2,
  Image,
  Users,
  UserCircle,
  Palette,
  ExternalLink,
  LogOut,
  Loader2,
} from "lucide-react";

type Tab = "links" | "portfolio" | "socials" | "profile" | "themes";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "links", label: "Links", icon: Link2 },
  { id: "portfolio", label: "Portfolio", icon: Image },
  { id: "socials", label: "Socials", icon: Users },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "themes", label: "Themes", icon: Palette },
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("links");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [pageViews, setPageViews] = useState(0);
  const [userId, setUserId] = useState<string>("");

  const fetchData = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUserId(user.id);

    const [profileRes, linksRes, socialsRes, portfolioRes, viewsRes] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
          .from("links")
          .select("*")
          .eq("user_id", user.id)
          .order("sort_order"),
        supabase
          .from("socials")
          .select("*")
          .eq("user_id", user.id)
          .order("sort_order"),
        supabase
          .from("portfolio_items")
          .select("*")
          .eq("user_id", user.id)
          .order("sort_order"),
        supabase
          .from("page_views")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

    if (!profileRes.data) {
      router.push("/onboarding");
      return;
    }

    setProfile(profileRes.data);
    setLinks(linksRes.data || []);
    setSocials(socialsRes.data || []);
    setPortfolio(portfolioRes.data || []);
    setPageViews(viewsRes.count || 0);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#8B5CF6]" />
          <p className="text-sm text-[#A1A1AA] font-mono">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Top Navigation */}
      <nav className="border-b border-[#262626] bg-[#0A0A0A]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-mono font-bold tracking-tight">
            <span className="text-[#8B5CF6]">k</span>ikaru
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#A1A1AA] font-mono">
              @{profile.username}
            </span>
            <button
              onClick={handleSignOut}
              className="text-[#A1A1AA] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#141414]"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {profile.display_name || profile.username}
            </h2>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Manage your page, links, and portfolio
            </p>
          </div>
          <a
            href={`/u/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="kikaru-btn-secondary text-sm flex items-center gap-2"
          >
            View your page
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Stats */}
        <StatsCards
          pageViews={pageViews}
          linkCount={links.length}
          portfolioCount={portfolio.length}
          isPro={profile.is_pro}
        />

        {/* Tabs */}
        <div>
          <div className="flex gap-1 border-b border-[#262626]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-mono transition-colors relative ${
                    isActive
                      ? "text-[#8B5CF6]"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B5CF6]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="mt-6 bg-[#141414] border border-[#262626] rounded-xl p-6">
            {activeTab === "links" && (
              <LinkEditor
                links={links}
                userId={userId}
                onUpdate={fetchData}
              />
            )}
            {activeTab === "portfolio" && (
              <PortfolioEditor
                items={portfolio}
                userId={userId}
                onUpdate={fetchData}
              />
            )}
            {activeTab === "socials" && (
              <SocialEditor
                socials={socials}
                userId={userId}
                onUpdate={fetchData}
              />
            )}
            {activeTab === "profile" && (
              <ProfileEditor
                profile={profile}
                onUpdate={fetchData}
              />
            )}
            {activeTab === "themes" && (
              <ThemeSelector
                currentTheme={profile.theme}
                isPro={profile.is_pro}
                userId={userId}
                onUpdate={fetchData}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
