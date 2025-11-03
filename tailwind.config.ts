import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(222.2 84% 4.9%)",
        "card-foreground": "hsl(210 40% 98%)",
        popover: "hsl(222.2 84% 4.9%)",
        "popover-foreground": "hsl(210 40% 98%)",
        primary: "hsl(210 100% 66%)",
        "primary-foreground": "hsl(210 40% 98%)",
        secondary: "hsl(217.2 32.6% 17.5%)",
        "secondary-foreground": "hsl(210 40% 98%)",
        muted: "hsl(217.2 32.6% 17.5%)",
        "muted-foreground": "hsl(215 20.2% 65.1%)",
        accent: "hsl(217.2 32.6% 17.5%)",
        "accent-foreground": "hsl(210 40% 98%)",
        destructive: "hsl(0 62.8% 30.6%)",
        "destructive-foreground": "hsl(210 40% 98%)",
        border: "hsla(0,0%,100%,0.08)",
        input: "hsla(0,0%,100%,0.12)",
        ring: "hsla(210,100%,66%,0.7)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem"
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear'
      },
      boxShadow: {
        glow: '0 0 25px rgba(80, 130, 255, 0.25)',
        subtle: '0 20px 60px -25px rgba(15, 23, 42, 0.8)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
