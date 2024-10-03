import React, { useState } from 'react';


const TicketForm = ({handleSubmit}) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('');
  const [orderId, setOrderId] = useState('');

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2 my-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Order ID</label>
          <input 
            type="text" 
            value={orderId} 
            onChange={(e) => setOrderId(e.target.value)} 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Create Ticket
        </button>
      </form>
    </>
  );
};

export default TicketForm;
