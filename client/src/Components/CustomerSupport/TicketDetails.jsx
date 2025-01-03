import React, { useState } from 'react';
import axios from 'axios';
import { IoMdRefresh } from "react-icons/io";


const TicketDetails = ({ orderId }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchTicketDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(orderId)
      const response = await axios.get(`https://server.revlineautoparts.com/api/v1/tickets/order/${orderId}`);
      setTickets(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error fetching tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = () => {
    setShowDetails(true);
    if (!tickets.length) {
      fetchTicketDetails();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='p-2 text-sm flex gap-2'>{error} <span onClick={fetchTicketDetails} className='flex justify-center items-center gap-2 border px-2 rounded shadow hover:shadow-lg bg-gray-100'>Retry<IoMdRefresh /></span></p>;

  return (
    <div className="w-full rounded-md">
      {!showDetails ? (
        <div className='text-gray-500 text-xs py-2'>
          If you have raised any complaint.
          <button
            className="mx-1 hover:underline text-sm text-gray-900"
            onClick={handleShowDetails}
          >
            click here
          </button>
          to see update
        </div>
      ) : tickets.length === 0 ? (
        <p className='text-xs text-red-400'>No tickets found for this order.</p> 
      ) : (
        tickets.map((ticket, index) => (
          <div key={index} className="w-full grid grid-cols-4 mt-4 border p-2 text-sm rounded-md">
            <p><strong>Ticket Number:</strong> {ticket.ticketNumber}</p>
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Created At:</strong> <span className="text-xs">{new Date(ticket.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span></p>
          </div>
        ))
      )}
    </div>
  );
};

export default TicketDetails;
