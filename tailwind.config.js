/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'dmsans': ['DM Sans', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
      'josefin': ['Josefin Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'white': '#F1F1F1',
        'primary': '#C99DF4',
        'secondary': '#FF8B20',
        '555': '#555555',
        'black': '#222222',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      height: {
        '30': '7.5em',
      }
    },
  },
  plugins: [],
}

