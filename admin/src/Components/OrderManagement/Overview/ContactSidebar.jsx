import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaTasks, FaVideo, FaRegCalendarAlt, FaCopy } from 'react-icons/fa'; // Import FaCopy
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ContactSidebar = ({ customer, order_id}) => {
  const [orders, setOrders] = useState(customer?.orderInfo);
  const [loading, setLoading] = useState(false);  // Assuming orders are already passed in customer
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Format the date if it's valid
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  };

  // Format the createdAt date if it exists
  const formattedDate = customer?.createdAt
    ? formatDate(customer.createdAt)
    : 'No Date Available';

  // Function to copy order ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Order ID copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };


  return (
    <div className="w-1/4 h-screen-minus-14 p-2 rounded-md bg-white shadow-md flex flex-col">
      {/* Contact Header */}
      <div
        className='flex items-center m-1 hover:underline cursor-pointer'
        onClick={() => navigate('/sales-management')}
      >
        <MdArrowBack />
        <h1>Back</h1>
      </div>
      <div className='bg-gray-100 p-2 rounded-lg'>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="text-2xl font-semibold ">{customer?.name || 'No Name'}</div>
          <div>
            <p>Email: {customer?.email || 'No Email'}</p>
            <p>Phone number: {customer?.phone || 'No Phone Number'}</p>
            <div className="flex mt-4 space-x-2">
              <FaEnvelope className="text-gray-500" />
              <FaPhone className="text-gray-500" />
              <FaTasks className="text-gray-500" />
              <FaVideo className="text-gray-500" />
              <FaRegCalendarAlt className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mt-4 h-min max-h-80 overflow-y-auto">
          <h1 className="font-semibold text-md py-2 px-1">Orders</h1>
          {loading ? (
            <p className="text-sm text-gray-500">Loading orders...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error fetching orders: {error}</p>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-2 my-2">
              {orders.slice().reverse().map((order) => (  // Reverse the orders array here
                <div key={order.orderId} 
                  onClick={()=>{navigate(`/sales-management/overview/${order.orderId}`)}}
                  className={`border-b ${order_id === order.orderId ? 'bg-white' : 'shadow-none cursor-pointer'} hover:bg-white hover:shadow-md rounded-md shadow-lg last:border-b-0 p-3 space-y-1`}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">Order ID: {order.orderId.slice(-6)}</p>
                    <FaCopy
                      className="text-gray-500 cursor-pointer"
                      onClick={() => copyToClipboard(order.orderId.slice(-6))}
                    />
                  </div>
                  <p className="text-sm">Date: {formatDate(order.requestDate)}</p>
                  <p className="text-sm">Parts: {order.part}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No orders found.</p>
          )}

        </div>

        {/* Conversion Date Section */}
        <div className="mt-4">
          <h1 className="font-semibold text-md p-1">First Conversion Date</h1>
          <p className="text-sm bg-white shadow-lg rounded-lg p-2">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;
