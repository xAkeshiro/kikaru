import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTheme } from "@/lib/themes";
import { CreatorPageClient } from "@/components/creator-page/creator-page-client";
import type { CreatorPageData } from "@/lib/types";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return { title: "Not Found" };
  }

  const displayName = profile.display_name || profile.username;
  const description =
    profile.bio || `Check out ${displayName} on Kikaru`;

  return {
    title: `${displayName} | Kikaru`,
    description,
    openGraph: {
      title: displayName,
      description,
      images: profile.avatar_url ? [profile.avatar_url] : [],
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: displayName,
      description,
    },
  };
}

export default async function CreatorPage({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  const [
    { data: socials },
    { data: links },
    { data: portfolio },
  ] = await Promise.all([
    supabase
      .from("socials")
      .select("*")
      .eq("user_id", profile.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("links")
      .select("*")
      .eq("user_id", profile.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("portfolio_items")
      .select("*")
      .eq("user_id", profile.id)
      .order("sort_order", { ascending: true }),
  ]);

  const theme = getTheme(profile.theme);

  const data: CreatorPageData = {
    profile,
    socials: socials || [],
    links: links || [],
    portfolio: portfolio || [],
  };

  return (
    <CreatorPageClient
      data={data}
      themeStyles={theme.variables}
      isPro={profile.is_pro}
    />
  );
}
