import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF3E7",
        "brutal-black": "#111111",
        "brutal-coral": "#FF6B6B",
        "brutal-purple": "#8C7AE6",
        "brutal-teal": "#2DD4BF",
        "brutal-yellow": "#FFD93D",
        "brutal-pink": "#FFC2D1",
        "brutal-blue": "#5AC8FA",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "brutal-sm": "3px 3px 0px 0px rgba(17,17,17,1)",
        brutal: "6px 6px 0px 0px rgba(17,17,17,1)",
        "brutal-lg": "8px 8px 0px 0px rgba(17,17,17,1)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(14px) rotate(-6deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(24px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        "drift-slow": "drift 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
