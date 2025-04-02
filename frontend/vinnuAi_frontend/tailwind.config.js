/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Orbitron', 'sans-serif'],
        },
        colors: {
          'space-blue': {
            100: '#e6f5ff',
            200: '#b3e0ff',
            300: '#80ccff',
            400: '#4db8ff',
            500: '#1aa3ff',
            600: '#0088cc',
            700: '#006699',
            800: '#004466',
            900: '#002233',
          },
          'deep-space': {
            100: '#d9dadf',
            200: '#b3b5bf',
            300: '#8d909f',
            400: '#676b7f',
            500: '#41465f',
            600: '#34384c',
            700: '#272a39',
            800: '#1a1c26',
            900: '#0d0e13',
          },
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'pulse-glow': {
            '0%, 100%': { boxShadow: '0 0 15px rgba(0, 191, 255, 0.4)' },
            '50%': { boxShadow: '0 0 30px rgba(0, 191, 255, 0.8)' },
          },
        },
        boxShadow: {
          'neon': '0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3), 0 0 30px rgba(0, 191, 255, 0.1)',
          'neon-strong': '0 0 15px rgba(0, 191, 255, 0.7), 0 0 30px rgba(0, 191, 255, 0.5), 0 0 45px rgba(0, 191, 255, 0.3)',
        },
      },
    },
    plugins: [],
  }