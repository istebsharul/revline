import React from 'react';
import { FaPhone, FaBackspace } from 'react-icons/fa';
import { MdCallEnd } from 'react-icons/md';

const DialPad = ({ phoneNumber, handleNumberClick, handleMakeCall, handleEndCall, handleClearNumber, handleNumberChange }) => (
    <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
        <input
            type="tel" // Allows only numeric input but prevents the browser from showing arrows
            value={phoneNumber}
            onChange={(e) => handleNumberChange(e.target.value.replace(/\D/g, ''))} // Allow only numeric values
            pattern="[0-9]*" // Ensures only digits are allowed
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
        <div className="flex justify-around mb-4">
            <button
                onClick={handleMakeCall}
                className="bg-green-500 p-4 rounded-full text-white"
            >
                <FaPhone />
            </button>
            <button
                onClick={handleEndCall}
                className="bg-red-500 p-4 rounded-full text-white"
            >
                <MdCallEnd />
            </button>
            <button
                onClick={handleClearNumber}
                className="bg-gray-300 p-4 rounded-full text-gray-700"
            >
                <FaBackspace />
            </button>
        </div>
    </div>

);


export default DialPad;
