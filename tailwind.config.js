/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'avengers-blue': '#1CA7EC',
        'avengers-red': '#E23636',
        'avengers-gold': '#FFD700',
        'avengers-dark': '#1A1A1A',
        'avengers-gray': '#2A2A2A',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to bottom, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.95))",
      },
    },
  },
  plugins: [],
}