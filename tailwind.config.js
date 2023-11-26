/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#8d6ec8',
        'main-hover': '#594285',
        'main-border': 'b0b0b0',
        'kakao-color': '#FEE500',
        'kakao-hover': '#f5db4b',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
