import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070708",
          900: "#0c0c0e",
          800: "#141417",
          700: "#1a1a1f",
          600: "#23232a",
          500: "#2c2c34",
        },
        brand: {
          red: "#e10a17",
          redDark: "#a30810",
          redSoft: "#ff2330",
          gold: "#d4a44a",
          cream: "#f3e7c7",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Cinzel", "Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(225,10,23,0.4), 0 10px 30px -10px rgba(225,10,23,0.5)",
      },
      backgroundImage: {
        "radial-spot":
          "radial-gradient(circle at 20% 10%, rgba(225,10,23,0.15), transparent 60%), radial-gradient(circle at 90% 80%, rgba(212,164,74,0.10), transparent 50%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scrollDot: {
          /* Dot rises from bottom of pill to top, loops smoothly. */
          "0%": { transform: "translateY(22px)", opacity: "0.15" },
          "15%": { opacity: "1" },
          "75%": { transform: "translateY(0)", opacity: "0.35" },
          "100%": { transform: "translateY(0)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "scroll-dot": "scrollDot 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        marquee: "marquee 60s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
