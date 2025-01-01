import React from 'react';

function BlogCTA({ togglePopup }) {
  return (
    <button
      onClick={togglePopup}
      className="bg-white text-base md:text-xl tracking-wide text-black font-black px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-lg w-full md:w-auto"
    >
      FIND YOUR PART NOW
    </button>
  );
}

export default BlogCTA;
