import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          obsidian: "#0B0E14",
          dark: "#0F1319",
          surface: "#131922",
          surfaceRaised: "#1A222E",
          surfaceHover: "#232D3D",
          border: "rgba(255, 255, 255, 0.12)",
          borderLight: "rgba(255, 255, 255, 0.20)",
          gold: "#C5A059",
          goldHover: "#B08B44",
          goldLight: "#F4E8D1",
          goldDark: "#8C6D2B",
          blue: "#0F63BD",
          blueHover: "#0D529C",
          blueLight: "#AECFF3",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
          textMuted: "#64748B",
        },
        // Backward compatibility mapping for existing components
        blacklane: {
          dark: "#0F1319",
          card: "#131922",
          surface: "#1A222E",
          border: "rgba(255, 255, 255, 0.12)",
          blue: "#0F63BD",
          blueHover: "#0D529C",
          blueLight: "#AECFF3",
          textMuted: "#94A3B8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.12)",
        "glass-elevated": "0 20px 48px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.18)",
        "gold-glow": "0 0 25px -5px rgba(197, 160, 89, 0.35)",
        "blue-glow": "0 0 25px -5px rgba(15, 99, 189, 0.35)",
        card: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
