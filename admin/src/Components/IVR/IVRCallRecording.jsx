import React from 'react';

const IVRCallRecordings = ({ recordings }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Call Recordings</h2>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Caller</th>
              <th className="p-4">Date</th>
              <th className="p-4">Recording</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((recording, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{recording.caller}</td>
                <td className="p-4">{new Date(recording.date).toLocaleString()}</td>
                <td className="p-4">
                  <audio controls>
                    <source src={recording.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IVRCallRecordings;
