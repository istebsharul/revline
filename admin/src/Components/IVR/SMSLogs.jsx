// components/SmsLogs.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const SmsLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hasFetched, setHasFetched] = useState(false); // Track if data has been fetched

    const fetchSmsLogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://server.revlineautoparts.com/api/v1/twilio/sms-logs');
            setLogs(res.data);
            setError('');
            setHasFetched(true); // Mark as fetched
        } catch (error) {
            setError('Failed to fetch SMS logs');
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!hasFetched && !isOpen) {
            fetchSmsLogs(); // Fetch logs only when the dropdown is opened for the first time
        }
    };

    return (
        <div className="w-full bg-white shadow-md rounded-md p-4 mt-8">
            <div className='w-full flex justify-between items-center'>
                <h2 className="text-xl font-bold p-2">SMS Logs</h2>
                <button
                    onClick={toggleDropdown}
                    className="w-min h-10 bg-blue-500 text-white px-4  rounded"
                >
                    {isOpen ? <FaChevronUp /> : <FaChevronDown/>}
                </button>
            </div>

            {isOpen && (
                <>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <table className="w-full border-collapse mt-4">
                            <thead>
                                <tr>
                                    <th className="border p-2">From</th>
                                    <th className="border p-2">To</th>
                                    <th className="border p-2">Body</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Date Sent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.sid}>
                                        <td className="border p-2">{log.from}</td>
                                        <td className="border p-2">{log.to}</td>
                                        <td className="border p-2">{log.body}</td>
                                        <td className="border p-2">{log.status}</td>
                                        <td className="border p-2">{new Date(log.dateCreated).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default SmsLogs;
