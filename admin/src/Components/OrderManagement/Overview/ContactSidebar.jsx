import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaTasks, FaVideo, FaRegCalendarAlt, FaCopy } from 'react-icons/fa'; // Import FaCopy
import axios from 'axios';
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ContactSidebar = ({ customer, orderId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchOrders = async () => {
      if (customer?._id) {
        try {
          const response = await axios.get(`/api/v1/orders/${customer._id}`);
          console.log(response.data);
          setOrders(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [customer]);

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
        <div className="mt-4">
          <h1 className="font-semibold text-md py-2 px-1">Orders</h1>
          {loading ? (
            <p className="text-sm text-gray-500">Loading orders...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error fetching orders: {error}</p>
          ) : orders.length > 0 ? (
            <div className="space-y-2">
              {orders.map((order) => (
                <div key={order._id} className={`border-b ${orderId === order._id ? 'shadow-none' : 'bg-white'} rounded-md shadow-lg last:border-b-0 p-3 space-y-1`}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">Order ID: {order._id}</p>
                    <FaCopy 
                      className="text-gray-500 cursor-pointer"
                      onClick={() => copyToClipboard(order._id)} 
                    />
                  </div>
                  <p className="text-sm">Date: {formatDate(order.request_date)}</p>
                  <p className="text-sm">Parts: {order.order_summary.part_name}</p>
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
