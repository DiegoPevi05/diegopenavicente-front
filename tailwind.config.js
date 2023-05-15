/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#011c32",
        secondary: "#068cf9",
        tertiary: "#02223c",
        fourth: "#0570c7",
        fifth:"#03467c",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        cardlight:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        heading: ['Orbitron','sans-serif'],
        body: ['Roboto+Slab','serif'],
      },
      backgroundImage: {
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

