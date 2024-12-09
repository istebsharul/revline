import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  return (
    <div className="fixed bottom-20 right-5 z-40">
      <a
        href="https://wa.me/18556009080" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
       <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default WhatsApp;
