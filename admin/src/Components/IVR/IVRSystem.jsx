import React, { useState } from 'react';
import axios from 'axios';
import { MdCall, MdCallEnd, MdSend } from 'react-icons/md';

const IVRSystem = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callSid, setCallSid] = useState(null);

  const makeCall = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }

    try {
      setIsCalling(true);
      const response = await axios.post('/api/call', { to: phoneNumber });
      setCallSid(response.data.sid);
      alert('Call initiated.');
    } catch (error) {
      console.error('Error making call:', error);
      alert('Failed to make call.');
      setIsCalling(false);
    }
  };

  const endCall = async () => {
    if (!callSid) {
      alert('No active call to end.');
      return;
    }

    try {
      await axios.post('/api/end-call', { callSid });
      setIsCalling(false);
      setCallSid(null);
      alert('Call ended.');
    } catch (error) {
      console.error('Error ending call:', error);
      alert('Failed to end call.');
    }
  };

  const sendSMS = async () => {
    if (!phoneNumber || !message) {
      alert('Please enter both phone number and message.');
      return;
    }

    try {
      await axios.post('/api/sms', { to: phoneNumber, message });
      alert('SMS sent.');
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">IVR System</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          onClick={makeCall}
          className={`flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
            isCalling ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isCalling}
        >
          <MdCall className="mr-2 text-xl" />
          Call
        </button>
        <button
          onClick={endCall}
          className={`flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
            !isCalling ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isCalling}
        >
          <MdCallEnd className="mr-2 text-xl" />
          End Call
        </button>
        <button
          onClick={sendSMS}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <MdSend className="mr-2 text-xl" />
          Send SMS
        </button>
      </div>
    </div>
  );
};

export default IVRSystem;
