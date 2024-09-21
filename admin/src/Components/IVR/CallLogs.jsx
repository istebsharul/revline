// components/CallLogs.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CallLogs = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch call logs only when the component mounts
  useEffect(() => {
    const fetchCallLogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/twilio/call-logs');
        setCallLogs(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch call logs');
      } finally {
        setLoading(false);
      }
    };

    fetchCallLogs();
  }, []);

  return (
    <div className="w-full bg-white shadow-md rounded-md p-4 mt-8">
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
    </div>
  );
};

export default CallLogs;
