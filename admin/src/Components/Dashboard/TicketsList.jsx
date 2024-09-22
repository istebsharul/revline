import React, { useState } from 'react';
import TicketItem from './TicketItem';
import TicketForm from './TicketForm';
import { FaPlus } from 'react-icons/fa';

const TicketsList = ({ tickets, loading }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditSuccess = (updatedTicket) => {
    setTickets(prevTickets =>
      prevTickets.map(t => (t._id === updatedTicket._id ? updatedTicket : t))
    );
  };

  const handleDeleteSuccess = (ticketId) => {
    setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== ticketId));
  };

  const statusOrder = {
    'Open': 1,
    'Pending': 2,
    'Closed': 3
  };

  const filteredTickets = tickets
    .filter(ticket => {
      return (
        ticket.ticketNumber.includes(searchQuery) ||
        (ticket.orderId && ticket.orderId.toString().includes(searchQuery))
      );
    })
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]); // Sorting by status

  return (
    <div className="bg-white p-6 shadow rounded-lg mt-2">
      <div className='w-full flex justify-between items-center mb-4'>
        <input
          type="text"
          placeholder="Search by Ticket No or Order No"
          value={searchQuery}
          onChange={handleSearch}
          className="w-3/5 border p-2 rounded-md"
        />
        <button
          onClick={toggleForm}
          className="border text-black font-semibold py-2 px-4 rounded-md"
        >
          {showForm ? 'Cancel' : <div className='flex justify-center items-center'><FaPlus className="text-green-600 mr-2" size={20} /> New Ticket</div>}
        </button>
      </div>

      {showForm && <TicketForm onClose={() => setShowForm(false)} />}

      <div className="flex items-start justify-center h-60 overflow-y-auto">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : filteredTickets.length > 0 ? (
          <div className="w-full flex flex-col bg-gray-50">
            {filteredTickets.map(ticket => (
              <TicketItem 
                key={ticket._id} 
                ticket={ticket} 
                onEditSuccess={handleEditSuccess} 
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}
          </div>
        ) : (
          <div className='w-full flex flex-col justify-center items-center'>
            <img
              src="https://res.cloudinary.com/drszvaldf/image/upload/v1724698037/revline/xc5wem6cvlzbg0hvr2gk.png"
              alt="All caught up"
              className="w-20 h-20 mx-auto overflow-hidden contrast-50"
            />
            <p className='text-sm text-gray-600'>Nothing to see here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsList;
