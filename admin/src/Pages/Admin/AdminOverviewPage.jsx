import React, { useState } from 'react';
import OverviewStats from '../../Components/Admin/OverviewStats';
import TasksWidget from '../../Components/Dashboard/TasksWidget';
import TicketsWidget from '../../Components/Dashboard/TicketsWidget';
import ContactsWidget from '../../Components/Admin/ContactsWidget';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useEffect } from 'react';

const AdminOverviewPage = () => {
  const [isTasksOpen, setIsTasksOpen] = useState(true);
  const [isContactsOpen, setIsContactsOpen] = useState(true);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    // Function to get the number of tasks from localStorage
    const getNumberOfTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      return tasks.length;
    };

    // Set the task count when the component mounts
    setTaskCount(getNumberOfTasks());
  }, []); // Empty dependency array means this useEffect runs only on mount

  useEffect(()=>{
    console.log("Hello from Overview Page");
  })

  const emailCount = 0;
  const smsCount = 0;
  const callCount = 0;

  return (
    <div className="w-full flex">
      <div className="w-full flex p-8 bg-gray-100 space-x-4">
        <div className="w-1/3 flex-shrink-1">
          <OverviewStats />
        </div>
        <div className="w-2/3 h-fit grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Tasks Widget */}
          <div className="w-full h-fit p-4 rounded-lg">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setIsTasksOpen(!isTasksOpen)}
            >
              <h2 className="flex text-lg font-semibold text-gray-700">Tasks<div>({taskCount})</div></h2>
              {isTasksOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {isTasksOpen && <TasksWidget />}
          </div>

          {/* Tickets Widget */}
          <TicketsWidget/>

          {/* Contacts Widget */}
          <div className="w-full h-fit p-4 rounded-lg">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setIsContactsOpen(!isContactsOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">Contacts</h2>
              {isContactsOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {isContactsOpen && (
              <ContactsWidget 
                emailCount={emailCount} 
                smsCount={smsCount} 
                callCount={callCount} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
