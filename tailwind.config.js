/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        body: "#050214",
      },
      keyframes: {
        overlayShown: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShown: {
          from: { opacity: 0, transform: "translateY(100%)" },
          to: { opacity: 1, transform: "translateY(-10px) " },
        },
        contentShownSm: {
          from: { opacity: 0, transform: "translate(-50%, 100%)" },
          to: { opacity: 1, transform: "translate(-50%, -35%) " },
        },
      },
      animation: {
        overlayShown: "overlayShown 0.2s ease-in-out",
        contentShown: "contentShown 0.3s ease-in-out",
        contentShownSm: "contentShownSm 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
