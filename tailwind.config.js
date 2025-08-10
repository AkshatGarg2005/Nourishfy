/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#10b981", dark: "#065f46", light: "#a7f3d0" }
      }
    },
  },
  plugins: [],
};
