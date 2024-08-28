import React from 'react';

const IVRCallLogs = ({ logs }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Call Logs</h2>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Caller</th>
              <th className="p-4">Time</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{log.caller}</td>
                <td className="p-4">{new Date(log.time).toLocaleString()}</td>
                <td className="p-4">{log.duration} min</td>
                <td className={`p-4 ${log.status === 'missed' ? 'text-red-500' : 'text-green-500'}`}>
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IVRCallLogs;
