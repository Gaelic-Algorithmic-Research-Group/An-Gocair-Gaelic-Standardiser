const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      gray: colors.slate,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
