export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  theme: string;
  is_pro: boolean;
  created_at: string;
  updated_at: string;
}

export interface Social {
  id: string;
  user_id: string;
  platform: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface Link {
  id: string;
  user_id: string;
  title: string;
  url: string;
  icon: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string;
  external_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface PageView {
  id: string;
  user_id: string;
  viewed_at: string;
  referrer: string | null;
  country: string | null;
}

export interface CreatorPageData {
  profile: Profile;
  socials: Social[];
  links: Link[];
  portfolio: PortfolioItem[];
}

export type SocialPlatform =
  | "twitter"
  | "instagram"
  | "pixiv"
  | "artstation"
  | "kofi"
  | "youtube"
  | "twitch"
  | "tiktok"
  | "github"
  | "custom";

export const SOCIAL_PLATFORMS: {
  value: SocialPlatform;
  label: string;
  placeholder: string;
}[] = [
  { value: "twitter", label: "Twitter / X", placeholder: "https://x.com/username" },
  { value: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
  { value: "pixiv", label: "Pixiv", placeholder: "https://pixiv.net/users/id" },
  { value: "artstation", label: "ArtStation", placeholder: "https://artstation.com/username" },
  { value: "kofi", label: "Ko-fi", placeholder: "https://ko-fi.com/username" },
  { value: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel" },
  { value: "twitch", label: "Twitch", placeholder: "https://twitch.tv/username" },
  { value: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@username" },
  { value: "github", label: "GitHub", placeholder: "https://github.com/username" },
  { value: "custom", label: "Custom Link", placeholder: "https://example.com" },
];
