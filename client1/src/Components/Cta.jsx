import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Cta() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Link
        to="/contact"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="px-6 py-3 text-white text-sm"
      >
        <button
          className={`px-8 py-2 flex justify-center items-center rounded-full bg-gradient-to-r from-red-800 to-red-400 transition duration-300 ease-in-out ${
            hovered ? 'from-red-900 to-red-500' : ''
          }`}
        >
          {hovered ? "Let's TAC" : "Let's Talk"}
          <FaChevronRight className="ml-1" />
        </button>
      </Link>
    </div>
  );
}

export default Cta;
