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
        marquee: 'marquee 15s linear infinite',
        'car-slide': 'carSlide 2s ease-out forwards',
        'car-slideM': 'carSlideM 2s ease-out forwards'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        carSlide: {
          '0%': {
            transform: 'translateX(-100%)', // Start off-screen
          },
          '100%': {
            transform: 'translateX(-30%)', // End at normal position
          },
        },
        carSlideM: {
          '0%': {
            transform: 'translateX(-100%)', // Start off-screen
          },
          '100%': {
            transform: 'translateX(0%)', // End at normal position
          },
        }
      },
      maxHeight: {
        'screen': '100vh',  // Ensure 'max-h-screen' covers the viewport height
      },
    },
  },
  plugins: [
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
