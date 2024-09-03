/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'primaryBlue':{
        100:'#58bbe7',
        200: '#0082bb',
        300: '#005b82',
        400: '#023448'
      },
      'primaryGreen':{
        100:'#c6df00',
        200:'#bed600'
      },

    },
  },
  plugins: [],
}

