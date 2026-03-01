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
    description: "Pure black with blue accent",
    isPro: false,
    variables: {
      "--kikaru-bg": "#000000",
      "--kikaru-surface": "rgba(255, 255, 255, 0.05)",
      "--kikaru-border": "#FFFFFF",
      "--kikaru-text": "#FFFFFF",
      "--kikaru-text-secondary": "rgba(255, 255, 255, 0.6)",
      "--kikaru-accent": "#0000FF",
      "--kikaru-accent-hover": "#0000CC",
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
    },
  },
  {
    id: "neon",
    name: "Neon",
    description: "Dark with neon cyan accents",
    isPro: false,
    variables: {
      "--kikaru-bg": "#000000",
      "--kikaru-surface": "rgba(255, 255, 255, 0.05)",
      "--kikaru-border": "#1F2937",
      "--kikaru-text": "#F0FDF4",
      "--kikaru-text-secondary": "#9CA3AF",
      "--kikaru-accent": "#06B6D4",
      "--kikaru-accent-hover": "#0891B2",
    },
  },
  {
    id: "mono",
    name: "Mono",
    description: "Black and white, typographic",
    isPro: false,
    variables: {
      "--kikaru-bg": "#000000",
      "--kikaru-surface": "rgba(255, 255, 255, 0.05)",
      "--kikaru-border": "#FFFFFF",
      "--kikaru-text": "#FFFFFF",
      "--kikaru-text-secondary": "rgba(255, 255, 255, 0.6)",
      "--kikaru-accent": "#FFFFFF",
      "--kikaru-accent-hover": "#E5E5E5",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep blue gradients",
    isPro: true,
    variables: {
      "--kikaru-bg": "#000000",
      "--kikaru-surface": "rgba(255, 255, 255, 0.05)",
      "--kikaru-border": "#1E3A5F",
      "--kikaru-text": "#F0F9FF",
      "--kikaru-text-secondary": "#93C5FD",
      "--kikaru-accent": "#3B82F6",
      "--kikaru-accent-hover": "#2563EB",
    },
  },
  {
    id: "ember",
    name: "Ember",
    description: "Dark with warm orange accents",
    isPro: true,
    variables: {
      "--kikaru-bg": "#000000",
      "--kikaru-surface": "rgba(255, 255, 255, 0.05)",
      "--kikaru-border": "#44280B",
      "--kikaru-text": "#FFF7ED",
      "--kikaru-text-secondary": "#FDBA74",
      "--kikaru-accent": "#F97316",
      "--kikaru-accent-hover": "#EA580C",
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
