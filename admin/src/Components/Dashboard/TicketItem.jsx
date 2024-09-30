import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const TicketItem = ({ ticket, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(ticket.status);

  const handleEdit = async () => {
    // Only proceed if the status has changed
    if (status !== ticket.status) {
      try {
        const updatedData = { ...ticket, status }; // Update status in the data being sent
        const response = await axios.patch(`/api/v1/tickets/ticket/${ticket._id}`, updatedData);
        onEditSuccess(response.data); // Notify the parent component of the update
        setIsEditing(false); // Exit editing mode
      } catch (error) {
        console.error('Error editing ticket:', error);
      }
    } else {
      // If no change, just exit editing mode
      setIsEditing(false);
    }
  };

  const handleResolve = async () => {
    try {
      await axios.patch(`/api/v1/tickets/ticket/${ticket._id}`, { status: 'Closed' });
      onEditSuccess({ ...ticket, status: 'Closed' }); // Update the ticket status in parent
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (!confirm) {
      return;
    }
    try {
      await axios.delete(`/api/v1/tickets/ticket/${ticket._id}`);
      onDeleteSuccess(ticket._id); // Notify the parent component of the deletion
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="border-b p-2 flex justify-between items-center">
      <div className='w-full h-fit flex flex-col justify-start text-sm'>
        <div className='grid grid-cols-3'>
          <h3 className="w-1/5 font-bold">#{ticket.ticketNumber}</h3>
          <p className="w-1/5 text-gray-800 text-nowrap"><span className='font-bold'>Order Id:</span> {ticket.orderId}</p>
          {isEditing ? (
            <div className='w-1/5'>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-1 rounded"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          ) : (
            <p className="w-1/5 text-gray-700 text-nowrap"><span className='font-bold'>Status:</span> {status}</p>
          )}
        </div>
        <div className='grid grid-cols-3'>
          <p className='w-15'><span className='font-bold'>Subject:</span> {ticket.subject}</p>
          <p className='w-15'><span className='font-bold'>Description:</span> {ticket.description}</p>
        </div>
      </div>
      <div className="w-1/5 flex space-x-2">
        {isEditing ? (
          <div className='flex gap-2'>
            <button className='text-gray-400 hover:text-red-500 hover:underline'>cancel</button>
            <button onClick={handleEdit} className="text-blue-500" disabled={status === ticket.status}>
              Save
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button onClick={handleResolve} className="text-green-500">
          Resolve
        </button>
        <button onClick={handleDelete} className="text-red-500">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
