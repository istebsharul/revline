import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhone, FaBackspace } from 'react-icons/fa';
import { MdCallEnd } from 'react-icons/md';

const IVRCall = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callSid, setCallSid] = useState('');
    const [response, setResponse] = useState('');
    const [showCallPopup, setShowCallPopup] = useState(false);
    const [callLogs, setCallLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to handle keydown events
    const handleKeyDown = (e) => {
        const key = e.key;

        if (key >= '0' && key <= '9') {
            setPhoneNumber((prev) => prev + key);
        } else if (key === 'Backspace') {
            setPhoneNumber((prev) => prev.slice(0, -1));
        } else if (key === 'Enter') {
            handleMakeCall(e);
        }
    };

    useEffect(() => {
        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleNumberClick = (digit) => {
        setPhoneNumber((prev) => prev + digit);
    };

    const handleMakeCall = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/ivr/make-call', { to: phoneNumber });
            setCallSid(res.data.sid);  // Save call SID
            setResponse(res.data.message);
            setShowCallPopup(true);
            fetchCallLogs(); // Refresh call logs after making a call
        } catch (error) {
            setResponse(error.response?.data?.error || 'Failed to make call');
        }
    };

    const handleEndCall = async () => {
        try {
            await axios.post('/api/v1/ivr/end-call', { callSid });
            setResponse('Call ended successfully!');
            setShowCallPopup(false);
            fetchCallLogs(); // Refresh call logs after ending the call
        } catch (error) {
            setResponse(error.response?.data?.error || 'Failed to end call');
        }
    };

    const handleClearNumber = () => {
        setPhoneNumber('');
    };

    const fetchCallLogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/v1/ivr/call-logs');
            setCallLogs(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch call logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch call logs when the component mounts
        fetchCallLogs();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-8">
            {/* Dial Pad */}
            <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
                <input
                    type="text"
                    value={phoneNumber}
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
                {response && (
                    <div className="text-lg">
                        {response}
                    </div>
                )}
            </div>

            {/* Call Popup */}
            {showCallPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold">Calling {phoneNumber}...</h2>
                        <button
                            onClick={handleEndCall}
                            className="mt-4 bg-red-500 p-2 rounded-full text-white"
                        >
                            End Call
                        </button>
                    </div>
                </div>
            )}

            {/* Call Logs */}
            <div className="w-full bg-white shadow-md rounded-md p-4 mt-8">
                <h2 className="text-2xl font-bold mb-6 text-left">Call Logs</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr>
                                <th className="border p-2">From</th>
                                <th className="border p-2">To</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Start Time</th>
                                <th className="border p-2">Duration (seconds)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {callLogs.map((call) => (
                                <tr key={call.sid}>
                                    <td className="border p-2">{call.from}</td>
                                    <td className="border p-2">{call.to}</td>
                                    <td className="border p-2">{call.status}</td>
                                    <td className="border p-2">{new Date(call.startTime).toLocaleString()}</td>
                                    <td className="border p-2">{call.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};

export default IVRCall;
