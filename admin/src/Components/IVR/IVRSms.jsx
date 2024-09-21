import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IVRSms = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [response, setResponse] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendSms = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/twilio/sms-send', {
        to: recipient,
        message: message,
      });
      setResponse(res.data.message);
      // Fetch updated SMS logs after sending a message
      fetchSmsLogs();
    } catch (error) {
      setResponse(error.response?.data?.error || 'Failed to send SMS');
    }
  };

  const fetchSmsLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/twilio/sms-logs');
      setLogs(res.data);
    } catch (error) {
      setError('Failed to fetch SMS logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch SMS logs when the component mounts
    fetchSmsLogs();
  }, []);

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

      <div className="w-full bg-white shadow-md rounded-md p-4 mt-8">
        <h2 className="text-xl font-bold mb-4">SMS Logs</h2>
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
      </div>
    </div>
  );
};

export default IVRSms;
