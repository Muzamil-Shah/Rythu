const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'regal-blue': '#243c5a',
        lightBlue: colors.lightBlue,
        cyan: colors.cyan,
        indigo: colors.indigo,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
        rose: colors.rose,
        teal: colors.teal,
        emeraid: colors.emerald,
        lime: colors.lime,
        amber: colors.amber,
        orange: colors.orange,
        warmGray: colors.warmGra,
        trueGray: colors.trueGra,
        coolGray: colors.gray,
        blueGray: colors.blueGra
      },
      fontFamily:{
        header: ['Lemon'],
        brand: ['Rye'],
        body: ['Lemonada']
      },
      fontSize:{
        "2xs": ['0.50rem', { lineHeight: '1rem' }],
        "3xs": ['0.25rem', { lineHeight: '1rem' }],
        "4xs": ['0.01rem', { lineHeight: '1rem' }],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
