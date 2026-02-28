export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  isPro: boolean;
  variables: Record<string, string>;
}

export const themes: ThemeConfig[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Dark with deep purple accents",
    isPro: false,
    variables: {
      "--kikaru-bg": "#0A0A0A",
      "--kikaru-surface": "#141414",
      "--kikaru-border": "#262626",
      "--kikaru-text": "#FAFAFA",
      "--kikaru-text-secondary": "#A1A1AA",
      "--kikaru-accent": "#8B5CF6",
      "--kikaru-accent-hover": "#7C3AED",
      "--kikaru-gradient-start": "#8B5CF6",
      "--kikaru-gradient-end": "#6D28D9",
    },
  },
  {
    id: "sakura",
    name: "Sakura",
    description: "Soft pink, light and airy",
    isPro: false,
    variables: {
      "--kikaru-bg": "#FFF5F7",
      "--kikaru-surface": "#FFFFFF",
      "--kikaru-border": "#FDE2E8",
      "--kikaru-text": "#1A1A2E",
      "--kikaru-text-secondary": "#6B7280",
      "--kikaru-accent": "#EC4899",
      "--kikaru-accent-hover": "#DB2777",
      "--kikaru-gradient-start": "#EC4899",
      "--kikaru-gradient-end": "#F472B6",
    },
  },
  {
    id: "neon",
    name: "Neon",
    description: "Dark with neon cyan accents",
    isPro: false,
    variables: {
      "--kikaru-bg": "#0A0A0A",
      "--kikaru-surface": "#111111",
      "--kikaru-border": "#1F2937",
      "--kikaru-text": "#F0FDF4",
      "--kikaru-text-secondary": "#9CA3AF",
      "--kikaru-accent": "#06B6D4",
      "--kikaru-accent-hover": "#0891B2",
      "--kikaru-gradient-start": "#06B6D4",
      "--kikaru-gradient-end": "#22D3EE",
    },
  },
  {
    id: "mono",
    name: "Mono",
    description: "Black and white, typographic",
    isPro: false,
    variables: {
      "--kikaru-bg": "#0A0A0A",
      "--kikaru-surface": "#141414",
      "--kikaru-border": "#333333",
      "--kikaru-text": "#FFFFFF",
      "--kikaru-text-secondary": "#888888",
      "--kikaru-accent": "#FFFFFF",
      "--kikaru-accent-hover": "#E5E5E5",
      "--kikaru-gradient-start": "#FFFFFF",
      "--kikaru-gradient-end": "#CCCCCC",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep blue gradients",
    isPro: true,
    variables: {
      "--kikaru-bg": "#0B1120",
      "--kikaru-surface": "#111827",
      "--kikaru-border": "#1E3A5F",
      "--kikaru-text": "#F0F9FF",
      "--kikaru-text-secondary": "#93C5FD",
      "--kikaru-accent": "#3B82F6",
      "--kikaru-accent-hover": "#2563EB",
      "--kikaru-gradient-start": "#3B82F6",
      "--kikaru-gradient-end": "#1D4ED8",
    },
  },
  {
    id: "ember",
    name: "Ember",
    description: "Dark with warm orange accents",
    isPro: true,
    variables: {
      "--kikaru-bg": "#0A0A0A",
      "--kikaru-surface": "#1A1008",
      "--kikaru-border": "#44280B",
      "--kikaru-text": "#FFF7ED",
      "--kikaru-text-secondary": "#FDBA74",
      "--kikaru-accent": "#F97316",
      "--kikaru-accent-hover": "#EA580C",
      "--kikaru-gradient-start": "#F97316",
      "--kikaru-gradient-end": "#DC2626",
    },
  },
];

export function getTheme(themeId: string): ThemeConfig {
  return themes.find((t) => t.id === themeId) || themes[0];
}

export function getThemeStyles(themeId: string): Record<string, string> {
  const theme = getTheme(themeId);
  return theme.variables;
}
