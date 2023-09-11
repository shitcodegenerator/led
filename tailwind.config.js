/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009a3e',
        dark: '#3a3a3a',
        gray: '#717271'
      }
    },
  },
  plugins: [],
}

