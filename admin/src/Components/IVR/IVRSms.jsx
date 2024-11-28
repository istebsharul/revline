// components/IVRSms.tsx
import React, { useState } from 'react';
import axios from 'axios';
import SmsLogs from './SMSLogs';


const IVRSms = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [response, setResponse] = useState('');

  const handleSendSms = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://server.revlineautoparts.com/api/v1/twilio/sms-send', {
        to: recipient,
        message: message,
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse(error.response?.data?.error || 'Failed to send SMS');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Number"
          className="w-full border-b-2 text-lg p-2 mb-4"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="w-full border-b-2 text-lg p-2 mb-4"
          rows="4"
        />
        <button 
          onClick={handleSendSms} 
          className="w-full bg-blue-500 text-white p-4 rounded-md"
        >
          Send SMS
        </button>
        {response && (
          <div className="mt-4 text-lg">
            {response}
          </div>
        )}
      </div>

      {/* Import and show SMS Logs */}
      <SmsLogs />
    </div>
  );
};

export default IVRSms;
