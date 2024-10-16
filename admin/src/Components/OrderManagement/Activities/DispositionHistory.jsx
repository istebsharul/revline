import React from 'react';

const DispositionHistory = ({ dispositionHistory }) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className='grid grid-cols-2 font-semibold mb-4'><h3 className="text-lg">Description</h3><p className='flex justify-end'>Date - Time</p></div>
      {dispositionHistory.length === 0 ? (
        <p>No disposition history available.</p>
      ) : (
        <ul className="space-y-4">
          {dispositionHistory.map((entry, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="text-gray-700">
                <p>{entry.agent_notes}</p>
              </div>
              <div className="text-gray-500 text-sm">
                {new Date(entry.updated_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DispositionHistory;
