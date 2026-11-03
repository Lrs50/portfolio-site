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
        darkBlue : '#475467',
        ink: '#0b0610',      // page background (dark, slightly purple)
        ink2: '#140a1a',     // raised dark areas
        glow: '#701438',     // accent: brand dark purple (text, dots, highlights)
        violet: '#a78bfa',   // secondary light
      },
      // Tailwind 3.3 has no 15% step; the dark theme uses it for glass borders
      opacity: {
        15: '0.15',
      },
      boxShadow: {
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px -20px rgba(0,0,0,0.7)',
        glow: '0 0 24px rgba(255,111,174,0.35)',
        'glow-lg': '0 0 40px rgba(255,111,174,0.55)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      keyframes: {
        wax: {
          from: { transform: "translate(0, 0)" },
          to: { transform: "translate(var(--dx, 0px), var(--rise, 0px))" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        wax: "wax 20s ease-in-out infinite alternate",
        rise: "rise 0.7s ease-out both",
      },
      screens: {
        'desktop': '768px',       // custom small screen
      },
    },
  },
  plugins: [],
}

