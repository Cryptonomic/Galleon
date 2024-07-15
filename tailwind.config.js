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
          20: '#2C7DF70D',
          30: '#2C7DF7',
          40: '#698CC1',
          50: '#2D33BE',
          60: '#2D33BE21',
          70: '#1A325F80',
        },
        grey: {
          DEFAULT: '#767676',
          10: '#0000001A',
          20: '#FFFFFF4D'
        }
      },
    },
  },
  plugins: [],
}

