import React, { useState } from 'react';
import { FaPhone, FaBackspace } from 'react-icons/fa';
import {MdCallEnd} from 'react-icons/md';

const IVRDialPad = () => {
  const [number, setNumber] = useState('');

  const handleNumberClick = (digit) => {
    setNumber((prev) => prev + digit);
  };

  const handleCall = () => {
    console.log('Calling:', number);
    // Here you would integrate with the Twilio API to make a call
  };

  const handleEndCall = () => {
    console.log('Call Ended');
    // Integrate with Twilio to end the call
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
        <input
          type="text"
          value={number}
          readOnly
          className="w-full text-center border-b-2 text-xl p-2 mb-4"
        />
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleNumberClick(digit)}
              className="bg-gray-200 text-2xl p-4 rounded-full shadow-md hover:bg-gray-300"
            >
              {digit}
            </button>
          ))}
        </div>
        <div className="flex justify-around">
          <button onClick={handleCall} className="bg-green-500 p-4 rounded-full text-white">
            <FaPhone />
          </button>
          <button onClick={handleEndCall} className="bg-red-500 p-4 rounded-full text-white">
            <MdCallEnd/>
          </button>
          <button
            onClick={() => setNumber('')}
            className="bg-gray-300 p-4 rounded-full text-gray-700"
          >
            <FaBackspace />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IVRDialPad;
