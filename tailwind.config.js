/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      green: colors.green,
      gray: {
        ...colors.gray,
        DEFAULT: "#333333"
      },
      red: colors.red,
      purple: {
        ...colors.purple,
        DEFAULT: "#942F70",
        50: "#F9F5FF"
      },
      yellow: {
        ...colors.yellow,
        DEFAULT: "#FEF452"
      }
    }
  },
  plugins: [],
}