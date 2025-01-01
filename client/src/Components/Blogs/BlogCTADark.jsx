import React from 'react';

function BlogCTA({ togglePopup }) {
  return (
    <button
      onClick={togglePopup}
      className="text-white text-base sm:text-lg md:text-xl tracking-wide font-black px-4 py-2 sm:px-6 sm:py-3 rounded-xl md:rounded-2xl border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-lg w-full sm:w-auto"
    >
      FIND YOUR PART NOW
    </button>
  );
}

export default BlogCTA;
