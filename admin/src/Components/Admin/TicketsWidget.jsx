import React from 'react';

const TicketsWidget = ({ tickets }) => {
  return (
    <div className="bg-white p-6 shadow rounded-lg mt-2">
      <h3 className="text-lg font-semibold">Tickets</h3>
      <div className="flex items-center justify-center h-40">
        {/* Add the ticket status */}
        <div className='w-full flex flex-col justify-center items-center'>
          <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724698037/revline/xc5wem6cvlzbg0hvr2gk.png" alt="All caught up" className="w-20 h-20 mx-auto overflow-hidden contrast-50" />
          <p className='text-sm text-gray-600'>Nothing to see here.</p>
        </div>
      </div>
    </div>
  );
};

export default TicketsWidget;
