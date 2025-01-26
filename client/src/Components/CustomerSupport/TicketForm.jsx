import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const categories = [
  'Part Inquiry',
  'Availability Check',
  'Compatibility Verification',
  'Pricing Information',
  'Warranty Details',
  'Order Issues',
  'Delayed Delivery',
  'Wrong Part Received',
  'Missing Parts',
  'Damaged Parts on Arrival',
  'Return and Exchange',
  'Incorrect Fitment',
  'Product Defect',
  'Exchange Request',
  'Return Eligibility',
  'Payment and Billing',
  'Invoice Request',
  'Payment Failure',
  'Refund Request',
  'Overcharged or Duplicate Billing',
  'Technical Support',
  'Fitment Guidance',
  'Installation Support',
  'Compatibility Questions',
  'Technical Specifications',
  'Shipping and Tracking',
  'Shipping Cost Inquiry',
  'Delivery Timeframes',
  'Tracking Updates',
  'Lost Shipment',
  'Account Management',
  'Profile Update Issues',
  'Account Login Problems',
  'Data Privacy Requests',
  'Feedback and Complaints',
  'Service Feedback',
  'Product Feedback',
  'General Complaints',
  'Custom Requests',
  'Rare or Hard-to-Find Parts',
  'Bulk Orders',
  'Special Discounts or Offers',
  'Cancellation Requests',
  'Cancel Order Before Dispatch',
  'Refund for Cancelled Order',
  'others'
];

const TicketForm = ({ order_id, setShowForm }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('');
  const [orderId, setOrderId] = useState(order_id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      subject,
      description,
      priority,
      category,
      orderId: order_id,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/tickets/ticket`, ticketData);
      console.log('Ticket created:', response.data);

      // Reset form fields
      setSubject('');
      setDescription('');
      setPriority('');
      setCategory('');
      setOrderId('');
      toast.success('We appreciate your patience! Your complaint has been submitted. Our support team will contact you shortly!');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Error occurred while submitting your complaint! Please try to contact us via email or give us a missed call.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4 p-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
