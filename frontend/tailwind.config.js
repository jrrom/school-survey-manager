/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safeList: [
    "bg-white",
    "bg-gray-50"
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Fira Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        lightpur: "#a61380",
        darkpur: "#7A3E6A"
      },
    },
  },
  plugins: [],
}
