import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#050508",
          card: "#0d0e15",
          border: "#1e293b",
          green: "#22c55e",
          pink: "#ec4899",
          cyan: "#06b6d4",
          yellow: "#eab308",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(34, 197, 94, 0.4), inset 0 0 10px rgba(34, 197, 94, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.8), inset 0 0 15px rgba(34, 197, 94, 0.4)",
          },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
