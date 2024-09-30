import React, { useState } from 'react';
import TicketForm from './TicketForm';
import TicketDetails from './TicketDetails';

const CustomerSupport = ({orderId}) => {
  const [showForm, setShowForm] = useState(false);

  const handleRaiseComplaint = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex flex-col items-start p-4 mt-4 bg-gray-50 border-t">
      <h3 className="text-sm font-medium mb-2">Need Help? Contact Customer Support</h3>
      <p className="text-xs text-gray-500">If you have any issues or need assistance with your order, feel free to reach out to our customer support team:</p>
      <p className="text-xs text-gray-500"><strong>Email:</strong> support@revlineautoparts.com</p>
      <p className="text-xs text-gray-500"><strong>Phone:</strong> 1-800-123-4567</p>
      <p className="text-xs text-gray-600 mt-2">Our team is available 24/7 to assist you with any questions or concerns.</p>

      {/* Raise a Complaint Button */}
      <button 
        className="mt-4 px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleRaiseComplaint}
      >
        {showForm? 'Cancel':'Raise a Complaint'}
      </button>
      <TicketDetails orderId={orderId}/>
      {/* Show TicketForm when the button is clicked */}
      {showForm && <TicketForm order_id={orderId} />}
    </div>
  );
};

export default CustomerSupport;
