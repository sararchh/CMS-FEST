/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
      extend: {
          boxShadow: {
            'custom': '0px 10px 36px 0px rgba(0, 0, 0, 0.16)',
          },
      },
      screens: {
        'sm': {'max': '450px'},
        'md': '768px',
  
        'lg': '1024px',
  
        'xl': '1280px',
  
        '2xl': '1536px',
      },
  },
//   plugins: [],
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms")
],
}
