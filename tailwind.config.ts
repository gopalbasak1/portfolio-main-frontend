import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-jetbrainsMono)",
    },
    extend: {
      colors: {
        primary: "#1a1a2e", // Custom dark mode background color
        secondary: "#16213e",
        textDark: "#e4e4e4",
        accent: {
          DEFAULT: "#00ff99",
          hover: "#00e187",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        glow: "glow 1.5s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            textShadow:
              "0 0 5px rgba(255, 105, 180, 0.7), 0 0 10px rgba(255, 105, 180, 0.5)",
            transform: "scale(1)",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(255, 105, 180, 0.9), 0 0 30px rgba(255, 105, 180, 0.7)",
            transform: "scale(1.05)",
          },
          "100%": {
            textShadow:
              "0 0 5px rgba(255, 105, 180, 0.7), 0 0 10px rgba(255, 105, 180, 0.5)",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config satisfies Config;
