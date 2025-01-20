/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue:{
          default: "#2BA3ED",
          regBg:"#B5CBE8",
          home:"#0167FF",
          dept: "#7AC1ED"
        }
      },
    },
  },
  plugins: [],
}

