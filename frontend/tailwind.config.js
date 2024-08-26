/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'a_blue': '#363ff5',
        'a_beige': '#fbfbeb',
        'a_grey': '#696969',
        'a_voilet': '#9398fd',
        'g_blue': '#5b60eb',
        'g_violet': '#EBEBFB',
        'g_pink': '#dd6297',
        'g_red': '#f65166'
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};
