import React, { useState } from 'react';
import axios from 'axios';

const TwilioForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

    const handleSendSMS = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ivr/send-sms`, {
                to: phoneNumber,
                message: message,
            });
            setResponse(res.data.message);
        } catch (error) {
            setResponse(error.response.data.error);
        }
    };

    const handleMakeCall = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ivr/make-call`, {
                to: phoneNumber,
            });
            setResponse(res.data.message);
        } catch (error) {
            setResponse(error.response.data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Twilio SMS and Call Test</h1>
            <form onSubmit={handleSendSMS} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message:</label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message here"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Send SMS
                </button>
            </form>

            <button
                onClick={handleMakeCall}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Make Call
            </button>

            {response && <p className="mt-4 text-center text-sm text-gray-600">{response}</p>}
        </div>
    );
};

export default TwilioForm;
