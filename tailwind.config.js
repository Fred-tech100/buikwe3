/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    // Only scan JS files in your project, not node_modules
    "./js/**/*.js",
    // If you have other JS files outside the js folder, add them here
    // "./*.js",
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