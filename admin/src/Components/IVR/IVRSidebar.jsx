import React from 'react';
import { FaPhone, FaSms, FaCog, FaHistory, FaHeadphones } from 'react-icons/fa';

const Sidebar = ({ setView }) => {
  return (
    <div className="w-full h-fit bg-gray-700 p-2 text-white sticky">
      <div className="w-min h-fit flex">
        <button onClick={() => setView('calllogs')} className="w-full rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800">
          <FaPhone />
          <span>Call</span>
        </button>
        <button onClick={() => setView('sms')} className="w-full rounded-lg p-2 flex items-center space-x-2 hover:bg-gray-800">
          <FaSms />
          <span>SMS</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
