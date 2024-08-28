import React, { useState } from 'react';

const IVRSms = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSendSms = () => {
    console.log('Sending SMS to:', recipient);
    console.log('Message:', message);
    // Integrate with Twilio API to send SMS
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
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
        <button onClick={handleSendSms} className="w-full bg-blue-500 text-white p-4 rounded-md">
          Send SMS
        </button>
      </div>
    </div>
  );
};

export default IVRSms;
