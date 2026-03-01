import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        kikaru: {
          bg: "var(--kikaru-bg)",
          surface: "var(--kikaru-surface)",
          border: "var(--kikaru-border)",
          text: "var(--kikaru-text)",
          "text-secondary": "var(--kikaru-text-secondary)",
          accent: "var(--kikaru-accent)",
          "accent-hover": "var(--kikaru-accent-hover)",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "system-ui", "sans-serif"],
        heading: ["Oswald", "Bebas Neue", "sans-serif"],
        decorative: ["Cormorant Garamond", "Georgia", "serif"],
        cjk: ["Noto Sans JP", "Noto Sans KR", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
