import scrollbarHide from 'tailwind-scrollbar-hide';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      maxHeight: {
        'screen': '100vh',  // Ensure 'max-h-screen' covers the viewport height
      },
    },
  },
  plugins: [
    scrollbarHide,
    function ({ addUtilities }) {
      addUtilities(
        {
          '.transition-max-height': {
            transition: 'max-height 0.5s ease-in-out',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}
