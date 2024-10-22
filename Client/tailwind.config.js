/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgba(6,55,102,255)', 
        addblue:'#0261be', 
        bgcolor:"#9ed8fc" ,// Another example
        grey:"rgba(239,239,239,255)"
      },
      height:{
        height:"600px",
        newh:"600px"

      },
      margin: {
        'default': '150px',
        'st':'140px',
        'sa':'82px',
        'vi':'110px'
      },
    },
  },
  plugins: [],
}