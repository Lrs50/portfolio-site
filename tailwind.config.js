/** @type {import('tailwindcss').Config} */
// Design tokens. docs/STYLE_GUIDE.md explains when to use each one.
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0610',      // page background
        ink2: '#140a1a',     // raised areas, dialogs
        wine: '#701438',     // brand: shapes, buttons, dots. Never for text (contrast too low)
        wineHover: '#8a1a47',
        rose: '#d58aa6',     // the only accent allowed on text and focus rings (about 7.6:1 on ink)
        bone: '#ede8ec',     // headings
        mist: '#a79cae',     // secondary text (about 7:1 on ink)
      },
      // Tailwind 3.3 has no 15% step; used for borders
      opacity: {
        15: '0.15',
      },
      boxShadow: {
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px -20px rgba(0,0,0,0.7)',
      },
      fontFamily: {
        // one family for everything. Its width and optical size axes give the display setting its character.
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
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
        // the recommendations strip: the list is rendered twice, so moving by half its width loops seamlessly
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        wax: "wax 26s ease-in-out infinite alternate",
        rise: "rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        marquee: "marquee 36s linear infinite",
      },
      screens: {
        'desktop': '768px',
      },
    },
  },
  plugins: [],
}
