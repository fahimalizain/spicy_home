const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { nextui } = require('@nextui-org/react');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app,modules}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
