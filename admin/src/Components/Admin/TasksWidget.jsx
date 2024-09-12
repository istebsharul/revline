import React from 'react';

const TasksWidget = ({ tasks }) => {
  return (
    <div className="bg-white p-6 shadow rounded-lg mt-2">
      <div className="flex items-center justify-center h-40">
        <div className='w-full text-gray-600'>
          <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724697280/revline/btcpqumkulvfyxvb9mb5.png" alt="All caught up" className="w-20 h-20 mx-auto overflow-hidden" />
          <p className="text-center mt-4">You're all caught up!</p>
          <p className='text-center text-xs'>Great job completing all your tasks today.</p>
        </div>
      </div>
    </div>
  );
};

export default TasksWidget;
