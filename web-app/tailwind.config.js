/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sos: {
          red: '#9C1C1F',
          'red-dark': '#7a1518',
          'red-light': '#c22328',
        },
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
