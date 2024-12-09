import React from "react";
import { IoIosCall } from "react-icons/io";


const Call = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href="tel:+18556009080" 
        className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <IoIosCall className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default Call;
