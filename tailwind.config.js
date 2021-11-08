module.exports = {
  purge: ['./*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif"
      },
      fontSize: {
        input: '1.375rem'
      },
      spacing: {
        'select': '65.8px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
