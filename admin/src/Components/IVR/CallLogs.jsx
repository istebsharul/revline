import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";


const CallLogs = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state
  const [hasFetched, setHasFetched] = useState(false); // Track if data has been fetched

  // Fetch call logs only when the dropdown is opened for the first time
  const fetchCallLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/twilio/call-logs');
      setCallLogs(response.data);
      console.log(response.data);
      setError('');
      setHasFetched(true); // Mark as fetched
    } catch (error) {
      setError('Failed to fetch call logs');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // Fetch call logs only when opening the dropdown for the first time
    if (!hasFetched && !isDropdownOpen) {
      fetchCallLogs();
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md p-4 mt-8">
      <div className='w-full flex justify-between items-center'>
                <h2 className="text-xl font-bold p-2">Call Logs</h2>
                <button
                    onClick={handleToggleDropdown}
                    className="w-min h-10 bg-blue-500 text-white px-4  rounded"
                >
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown/>}
                </button>
            </div>

      {isDropdownOpen && (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="w-full border-collapse">
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
        </>
      )}
    </div>
  );
};

export default CallLogs;
