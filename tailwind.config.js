/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#e5c19d',
          DEFAULT: '#c8a27c',
          dark: '#a8845c',
          bright: '#d4af37',
        },
        charcoal: {
          light: '#1c1c1c',
          DEFAULT: '#121212',
          dark: '#0a0a0a',
          deep: '#050505',
        },
        slate: {
          400: '#94a3b8',
          500: '#64748b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        mega: '.3em',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      height: {
        'screen-90': '90vh',
      }
    },
  },
  plugins: [],
}
