import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cinzel'", "sans-serif"],
        body: ["'Source Serif 4'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
