/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      black: '#191414',
      white: '#ffffff'
    },
    extend: {
      colors: {
        primary: '#1DB954'
      }
    }
  },
  plugins: []
};
