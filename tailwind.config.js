/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.js",
    "./**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        red: {
          DEFAULT: '#DC2626'
        },
        yellow: {
          DEFAULT: '#FACC15'
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}