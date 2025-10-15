import type { Config } from "tailwindcss"
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#e5e7eb",
        anthracite: "#151515",
        dim: "#0f0f0f",
        line: "#1c1c1c"
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
} satisfies Config
