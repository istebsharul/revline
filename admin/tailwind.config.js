/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))', // Adds support for 14 columns
      },
      height: {
        'screen-minus-14': 'calc(100vh - 3.5rem)',
      },
    },
  },
  plugins: [],
}