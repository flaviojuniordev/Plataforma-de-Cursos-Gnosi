import forms from '@tailwindcss/forms'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        backgroundcolor: "#171529",

        secondarypurple: "#AA47F0",

        terciarypurple: "#282539",
        quartrypurle: "#1F1D35",
        white: "#ffffff",
      },
      fontFamily: {
        gnosi: ["Chakra Petch", "sans-serif"],
      },
      backgroundImage: {
        "img-atenas": "url('/src/assets/templeatenas.jpg')"
      }
    },
  },
  plugins: [forms],
}

