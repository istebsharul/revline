import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaSave, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { BiSelectMultiple } from "react-icons/bi";

const TasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      setIsAdding(false);
    }
  };

  const handleUpdateTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { text: newTask, completed: task.completed } : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setEditingIndex(null);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setNewTask(tasks[index].text);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTasks = () => {
    const updatedTasks = tasks.filter((_, index) => !selectedTasks[index]);
    setTasks(updatedTasks);
    setShowCheckboxes(false);
    setSelectedTasks({});
  };

  const handleToggleCheckbox = (index) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelectAll = () => {
    const allSelected = tasks.length === Object.keys(selectedTasks).length && Object.values(selectedTasks).every(v => v);
    const newSelectedTasks = {};
    tasks.forEach((_, index) => {
      newSelectedTasks[index] = !allSelected; // Select if all are selected, unselect otherwise
    });
    setSelectedTasks(newSelectedTasks);
  };

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-lg mt-2 mx-auto">
      {isAdding ? (
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="border px-4 py-2 rounded-lg w-full border-gray-300 focus:none transition duration-200"
          />
          <button
            onClick={handleAddTask}
            className="text-blue-600 cursor-pointer ml-2"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewTask('');
            }}
            className="text-red-400 cursor-pointer ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            setIsAdding(true);
            setEditingIndex(null);
            setNewTask('');
          }}
          className="w-full flex justify-center items-center mb-4 cursor-pointer border py-2 px-4 rounded-xl"
        >
          <FaPlus className="text-green-600" size={24} />
          <span className="ml-2">Add New Task</span>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <div className='w-full text-gray-600 text-center'>
            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724697280/revline/btcpqumkulvfyxvb9mb5.png" alt="All caught up" className="w-20 h-20 mx-auto" />
            <p className="mt-4 text-lg">You're all caught up!</p>
            <p className='text-xs'>Great job completing all your tasks today.</p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <div className='w-full flex justify-between items-center'>
              {showCheckboxes && (
                <div className='w-full flex justify-between'>
                  <BiSelectMultiple
                    onClick={handleSelectAll}
                    className="text-gray-600 cursor-pointer"
                    size={24}
                  />
                  <button
                    onClick={handleDeleteTasks}
                    className="text-red-600 cursor-pointer ml-2 border border-red-500 hover:bg-red-500 hover:text-white py-1 px-4 rounded-lg"
                  >Confirm Delete</button>
                </div>
              )}
              <div
                onClick={() => setShowCheckboxes(!showCheckboxes)}
                className={`${showCheckboxes ? 'w-min' : 'w-full'} flex justify-end cursor-pointer mx-2`}
              >
                {showCheckboxes ? 'Cancel' :
                  <FaTrashAlt
                    className="text-red-600 mr-2"
                    size={20}
                  />}
              </div>

            </div>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className={`flex justify-between items-center py-2 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {showCheckboxes && (
                  <input
                    type="checkbox"
                    checked={selectedTasks[index] || false}
                    onChange={() => handleToggleCheckbox(index)}
                    className="mr-2"
                  />
                )}
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onBlur={() => handleUpdateTask(index)} // Save on blur
                    className="border p-1 rounded w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  />
                ) : (
                  <span className="w-full text-lg flex justify-start">{task.text}</span>
                )}
                <div className="flex items-center">
                  {editingIndex === index ?
                    <FaSave
                      onClick={()=> handleUpdateTask(index)}
                      className="text-yellow-500 cursor-pointer mx-1"
                      size={24}
                    /> : <FaEdit
                      onClick={() => handleEditTask(index)}
                      className="text-blue-500 cursor-pointer mx-1"
                      size={24}
                    />}
                  <FaCheck
                    onClick={() => handleToggleComplete(index)}
                    className={`text-green-600 cursor-pointer mx-1 ${task.completed ? 'opacity-50' : ''}`}
                    size={24}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TasksWidget;
