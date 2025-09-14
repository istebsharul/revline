import React from "react";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function SubCTA({ togglePopup,part }) {
  return (
    <div className="md:w-full 2xl:max-w-6xl max-w-4xl bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl shadow-md p-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 m-10">
      {/* Text Section */}
      <div className="text-center md:text-left ">
        <h3 className="text-lg sm:text-xl md:text-lg font-semibold">
          Ready to stop the {capitalize(part)} light?
        </h3>
        <p className="text-sm sm:text-base md:text-sm lg:text-base opacity-90">
          Send your details now and we’ll confirm the exact module or pump you need.
        </p>
      </div>

      {/* Button Section */}
      <button  
        onClick={togglePopup}
        className="bg-red-700 text-sm sm:text-base hover:bg-red-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition duration-200">
        Get {capitalize(part)} Quote
      </button>
    </div>
  );
}

export default SubCTA;