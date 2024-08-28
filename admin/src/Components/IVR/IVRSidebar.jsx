import React from 'react';
import { FaPhone, FaSms, FaCog, FaHistory, FaHeadphones } from 'react-icons/fa';

const Sidebar = ({ setView }) => {
  return (
    <div className="w-1/6 bg-gray-800 h-screen p-4 text-white">
      <div className="space-y-4">
        <button onClick={() => setView('dialpad')} className="flex items-center space-x-2">
          <FaPhone />
          <span>Dial Pad</span>
        </button>
        <button onClick={() => setView('sms')} className="flex items-center space-x-2">
          <FaSms />
          <span>SMS</span>
        </button>
        <button onClick={() => setView('calllogs')} className="flex items-center space-x-2">
          <FaHistory />
          <span>Call Logs</span>
        </button>
        <button onClick={() => setView('callrecordings')} className="flex items-center space-x-2">
          <FaHeadphones />
          <span>Call Recordings</span>
        </button>
        <button onClick={() => setView('settings')} className="flex items-center space-x-2">
          <FaCog />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
