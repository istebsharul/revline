import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { MdContentCopy } from "react-icons/md";
import { toast } from 'react-hot-toast'; // Import toast

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
        toast.success('Ticket updated successfully!'); // Success notification
      } catch (error) {
        console.error('Error editing ticket:', error);
        toast.error('Failed to update ticket. Please try again.'); // Error notification
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
      toast.success('Ticket resolved successfully!'); // Success notification
    } catch (error) {
      console.error('Error resolving ticket:', error);
      toast.error('Failed to resolve ticket. Please try again.'); // Error notification
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
      toast.success('Ticket deleted successfully!'); // Success notification
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket. Please try again.'); // Error notification
    }
  };

  const handleCopyToClipboard = () => {
    const orderId = ticket.orderId.slice(-6); // Get the last 6 characters of the Order ID
    navigator.clipboard.writeText(orderId)
      .then(() => {
        toast.success('Order ID copied to clipboard!'); // Success notification
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        toast.error('Failed to copy Order ID. Please try again.'); // Error notification
      });
  };

  return (
    <div className="py-3 px-4 border rounded-lg shadow-md bg-white flex flex-col space-y-1 mb-1">
      {/* Ticket Info Section */}
      <div className="flex justify-between items-start gap-4">
        {/* Ticket Details */}
        <div className="w-3/5 flex">
          <h3 className="w-20 font-bold text-lg">#{ticket.ticketNumber}</h3>
          <p className='w-40 flex items-center'>
            <span className="text-sm font-semibold">Order ID:</span>
            <span className="ml-1">{ticket?.orderId}</span>
            <button onClick={handleCopyToClipboard} className="ml-2 text-gray-600 hover:text-gray-800">
              <MdContentCopy />
            </button>
          </p>
          <p className='w-80 text-nowrap'><span className="text-sm font-semibold">Subject:</span> {ticket.subject}</p>
        </div>

        {/* Status and Action Buttons */}
        <div className="w-2/5 flex justify-end items-center space-x-4">
          <div className="w-1/3 flex justify-start items-center">
            <span className="font-semibold">Status:</span>
            {isEditing ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-1 rounded-md ml-2"
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            ) : (
              <p className={`ml-2 font-semibold ${status === 'Closed' ? 'text-green-600' : 'text-yellow-600'}`}>
                {status}
              </p>
            )}
          </div>

          <div>
            {isEditing ? (
              <div className='w-full space-x-4'>
                <button
                  onClick={handleEdit}
                  className="text-blue-500 hover:text-blue-700 transition duration-150"
                  disabled={status === ticket.status}
                >
                  <FaCheck /> {/* Save icon */}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-red-500 transition duration-150"
                >
                  <FaTimes /> {/* Cancel icon */}
                </button>
              </div>
            ) : (
              <div className='w-full space-x-4'>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-yellow-500 hover:text-yellow-700 transition duration-150"
                >
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button
                  onClick={handleResolve}
                  className="text-green-500 hover:text-green-700 transition duration-150"
                >
                  Resolve
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition duration-150"
          >
            <FaTrash /> {/* Delete icon */}
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="text-sm">
        <p><span className="font-semibold">Description:</span> {ticket.description}</p>
      </div>
    </div>
  );
};

export default TicketItem;
