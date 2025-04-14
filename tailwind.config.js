/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        mainPurple:'#701438',
        secondaryPurple:'#A3466A'
      }
    },
  },
  plugins: [],
}

