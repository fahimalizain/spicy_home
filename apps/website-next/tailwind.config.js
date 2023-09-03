const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        'light-pink': '#FEF9E9',
        'nav-hover-text': '#B98B82',
        'animation-text': '#6A8D92',
        'sidebar-color': '#E3CEC1',
        'sidebar-border': '#B98B82',
        'reviews-color': '#F4E7D899',
        'media-button': '#EFE1D3',
        'footer-color': '#D68888',
        'backround-full': '#e3cec1',
      },
    },
  },
  plugins: [],
};
