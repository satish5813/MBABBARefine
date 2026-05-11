/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        klblue: "#4338ca",
        klgold: "#f59e0b",
        clay: {
          bg: "#eef0fb",
          surface: "#f5f3ff",
          mint: "#d9f5e7",
          peach: "#ffe1d6",
          sky: "#d6ecff",
          lilac: "#e8defb",
          rose: "#ffd9e8",
          sun: "#fff3c4",
        },
      },
      boxShadow: {
        clay:
          "12px 12px 28px rgba(159,170,210,0.55), -12px -12px 28px rgba(255,255,255,0.95)",
        "clay-sm":
          "6px 6px 14px rgba(159,170,210,0.45), -6px -6px 14px rgba(255,255,255,0.9)",
        "clay-inset":
          "inset 6px 6px 14px rgba(159,170,210,0.45), inset -6px -6px 14px rgba(255,255,255,0.9)",
        "clay-pop":
          "16px 16px 36px rgba(99,102,241,0.35), -10px -10px 28px rgba(255,255,255,1)",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        blob: "blob 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blob: {
          "0%,100%": { borderRadius: "60% 40% 50% 60% / 50% 60% 40% 50%" },
          "50%": { borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" },
        },
      },
    },
  },
  plugins: [],
};
