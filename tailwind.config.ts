import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF50",
          foreground: "#FFFFFF",
          dark: "#388E3C",
        },
        accent: {
          DEFAULT: "#FF9800",
          foreground: "#FFFFFF",
        },
        background: {
          DEFAULT: "#F8F5F0",
          dark: "#1A1A1A",
        },
        foreground: {
          DEFAULT: "#212121",
          muted: "#616161",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#2D2D2D",
        },
        border: {
          DEFAULT: "#E0E0E0",
          dark: "#404040",
        },
      },
      fontFamily: {
        arabic: ["var(--font-cairo)", "Cairo", "Tajawal", "sans-serif"],
      },
      borderRadius: {
        calm: "1rem",
        "calm-lg": "1.5rem",
        "calm-xl": "2rem",
      },
      boxShadow: {
        calm: "0 4px 20px rgba(0, 0, 0, 0.06)",
        "calm-lg": "0 8px 30px rgba(0, 0, 0, 0.08)",
      },
      spacing: {
        touch: "3.5rem",
        "touch-lg": "4.5rem",
      },
      minHeight: {
        touch: "3.5rem",
      },
      minWidth: {
        touch: "3.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
