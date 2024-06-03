const withMT = require("@material-tailwind/react/utils/withMT");
const tailwindForms = require("@tailwindcss/forms");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "chat-bg": "#f3f4f6",
        "user-msg": "#3b82f6",
        "bot-msg": "#e5e7eb",
      },
      height: {
        96: "24rem",
      },
      keyframes: {
        "water-ripple": {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
      animation: {
        "water-ripple": "water-ripple 1s ease-out infinite",
      },
    },
  },
  plugins: [tailwindForms],
});
