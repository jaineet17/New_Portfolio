/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00FFEE',
        'neon-pink': '#FF00FF',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(100%)',
          },
          '50%': {
            opacity: '.8',
            filter: 'brightness(150%)',
          },
        },
      },
    },
  },
  plugins: [],
} 