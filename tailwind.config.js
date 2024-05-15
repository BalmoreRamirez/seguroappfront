/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          '300': '#1C1E4D',
          '500': '#223E69',
          '700': '#223E69',
        },
      }
    },
  },
  plugins: [],
}

