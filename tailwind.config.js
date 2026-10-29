/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        black: '#0A0A0A',
        white: '#FFFFFF',
        green: {
          DEFAULT: '#1F9D55',
          500: '#1F9D55',
        },
        blue: {
          DEFAULT: '#1D4ED8',
          600: '#1D4ED8',
        },
        red: {
          DEFAULT: '#DC2626',
          600: '#DC2626',
        },
      },
      borderRadius: {
        DEFAULT: '0',
        none: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0',
      },
    },
  },
  plugins: [],
}
