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
        secondaryPurple:'#A3466A',
        offWhite:'#F2F4F7',
        offBlack:'#272727',
        pastelOrange: '#ffead5',
        darkBlue : '#475467'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      screens: {
        'desktop': '768px',       // custom small screen
      },
    },
  },
  plugins: [],
}

