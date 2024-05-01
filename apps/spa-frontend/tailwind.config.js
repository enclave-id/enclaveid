const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        greenBg: '#2FA68A',
        iconColor: '#D2D6DE',
        activeIconColor: '#98C6BB',
        passiveIconColor: '#D2D6DE',
        passiveLinkColor: '#6C7A8A',
        'primary-gradient-start': '#5799E6',
        'primary-gradient-stop': '#2FA68A',
        'secondary-gradient-start': '#C6DED8',
        'secondary-gradient-stop': '#C9DEEC',
        'active-breadcrumb-title': '#AFB5BC',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      blur: {
        xs: '2px',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
};
