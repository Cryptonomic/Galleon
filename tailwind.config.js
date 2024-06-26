/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Inter', 'sans-serif']
    },
    extend: {
      colors: {
        sky: {
          DEFAULT: '#1A325F',
          10: '#EEF0F6',
          20: '#2C7DF71A',
          30: '#2C7DF7',
        },
        grey: {
          DEFAULT: '#767676',
          10: '#00000033'
        }
      },
    },
  },
  plugins: [],
}

