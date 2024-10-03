import React, { useState } from 'react';
import TicketItem from './TicketItem';
import { FaPlus } from 'react-icons/fa';
import TicketForm from './TicketForm';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast and Toaster

const TicketsList = ({ tickets, loading }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleForm = () => setShowForm(!showForm);

  const filteredTickets = tickets.filter(ticket => {
    return (
      ticket.ticketNumber.includes(searchQuery) ||
      (ticket.orderId && ticket.orderId.toString().includes(searchQuery))
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      subject,
      description,
      priority,
      category,
      orderId,
    };

    try {
      const response = await axios.post('/api/v1/tickets/ticket', ticketData);
      console.log('Ticket created:', response.data);

      // Show success toast
      toast.success('Ticket created successfully!');
      setShowForm(!showForm);
      // Reset form fields
      setSubject('');
      setDescription('');
      setPriority('Low');
      setCategory('');
      setOrderId('');

    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Error creating ticket. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg mt-2">
      <div className='w-full flex justify-between items-center mb-4'>
        <input
          type="text"
          placeholder="Search by Ticket No or Order No"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-3/5 border p-2 rounded-md"
        />
        <button
          onClick={toggleForm}
          className="border text-black font-semibold py-2 px-4 rounded-md"
        >
          {showForm ? 'Cancel' : <div className='flex items-center'><FaPlus className="text-green-600 mr-2" size={20} /> New Ticket</div>}
        </button>
      </div>

      {showForm && <TicketForm handleSubmit={handleSubmit} />}
      <div className="flex items-start justify-center h-40 max-h-xl overflow-y-auto">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : filteredTickets.length > 0 ? (
          <div className="w-full flex flex-col">
            {filteredTickets.map(ticket => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <img
              src="https://res.cloudinary.com/drszvaldf/image/upload/v1724698037/revline/xc5wem6cvlzbg0hvr2gk.png"
              alt="All caught up"
              className="w-20 h-20 mx-auto"
            />
            <p className='text-sm text-gray-600'>Nothing to see here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsList;
