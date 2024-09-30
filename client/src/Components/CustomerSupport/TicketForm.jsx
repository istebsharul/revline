import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TicketForm = ({ order_id }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('');
  const [orderId, setOrderId] = useState(order_id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      subject,
      description,
      category,
      orderId,
    };

    try {
      const response = await axios.post('/api/v1/tickets/ticket', ticketData);
      console.log('Ticket created:', response.data);

      // Reset form fields
      setSubject('');
      setDescription('');
      setPriority('Low');
      setCategory('');
      setOrderId('');
      toast.success('Congratulations! Your complaint has been submitted. Our support team will contact you shortly!');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Error occurred while submitting your complaint! Please try to contact us via email or give us a missed call.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4 p-4">
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
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
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
      >
        Create Ticket
      </button>
    </form>
  );
};

export default TicketForm;
