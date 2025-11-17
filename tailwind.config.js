/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        plex: ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        midnight: '#0d0f15',
      },
    },
  },
  plugins: [],
};
