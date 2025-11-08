import React from "react";
import { IoIosCall } from "react-icons/io";


const Call = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href="tel:+18886320709"
        className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => {
          if (window.gtag) {
            window.gtag("event", "conversion", {
              send_to: "AW-11561633611/fyQICPqPsKEbEMuOgokr",
              phone_conversion_number: "+18886320709",
            });
          }
        }}
      >
        <IoIosCall className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default Call;
