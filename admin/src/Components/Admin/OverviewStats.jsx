import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const TaskProgressBar = ({ label, completed, total }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="w-full flex flex-col items-center">
        <div className='w-full flex justify-between'><div><span className="text-gray-700 mr-2 text-sm text-nowrap">{label}</span></div>
          <div className="flex items-center text-teal-500 text-sm">
            <FaCheckCircle className="mr-1" />
            <span>{`${completed} of ${total} completed`}</span>
          </div></div>
        <div className="w-full relative w-48 h-2 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"
            style={{ width: `${(completed / total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const OrdersStatus = () => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Orders</span>
      <div className="flex items-center text-teal-500">
        Monthly <FiChevronDown className="ml-1" />
      </div>
    </div>
  );
};

const OrdersCount = ({ label, count }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-500 text-xs">{label}</span>
      <span className="text-lg font-bold text-gray-800">{count}</span>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-teal-500">Today</h2>
        <FiChevronDown className="text-gray-500" />
      </div>

      <div className="mb-6">
        <span className="text-gray-700 font-semibold">Task Progress</span>
        <TaskProgressBar label="To-dos" completed={3} total={5} />
        <TaskProgressBar label="Emails" completed={0} total={0} />
        <TaskProgressBar label="Calls" completed={0} total={0} />
      </div>

      <OrdersStatus />

      <div className="flex justify-between mt-4">
        <OrdersCount label="IN-PROGRESS" count={0} />
        <OrdersCount label="COMPLETED" count={0} />
        <OrdersCount label="CANCELLED/RETURNED" count={0} />
      </div>
    </div>
  );
};

export default DashboardOverview;
