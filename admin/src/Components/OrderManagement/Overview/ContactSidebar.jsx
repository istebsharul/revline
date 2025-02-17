import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa'; // Import FaCopy
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from 'axios';


const ContactSidebar = ({ customer, order_id}) => {
  const [orders, setOrders] = useState(customer?.orderInfo);
  const [loading, setLoading] = useState(false);  // Assuming orders are already passed in customer
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(customer);

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

  const handleSubOrderClick = async () => {

    const alert = window.confirm(`Are you sure you want to create new Order for ${customer.name}`);

    if(!alert){
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/create-sub-order`,
        { customerId: customer._id }
      );
  
      console.log("Response:", response); // Log full response
      toast.success(`Sub-order created successfully! for ${response.data.customer}`);
      setOrders([...orders,response.data.orderInfo]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // Log error details
      toast.error(error.response?.data?.message || "Failed to create sub-order");
    }
  };  

  return (
    <div className="w-1/4 h-full p-2 rounded-md bg-white shadow-md flex flex-col">
      {/* Contact Header */}
      <div
        className='flex items-center m-1 hover:underline cursor-pointer'
        onClick={() => navigate('/sales-management')}
      >
        <MdArrowBack />
        <h1>Back</h1>
      </div>
      <div className='w-full h-full flex-1 bg-gray-100 p-2 rounded-lg'>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="text-2xl font-semibold ">{customer?.name || 'No Name'}</div>
          <div>
            <p>Email: {customer?.email || 'No Email'}</p>
            <p>Phone number: {customer?.phone || 'No Phone Number'}</p>
          </div>
        </div>

        {/* Conversion Date Section */}
        <div className="mt-2">
          <h1 className="font-semibold text-md p-1">First Conversion Date</h1>
          <p className="text-sm bg-white shadow-lg rounded-lg p-2">{formattedDate}</p>
        </div>

        {/* Orders Section */}
        <div className='w-full mt-2 flex justify-between items-center'><h1 className="font-semibold text-md py-2 px-1">Orders</h1><button onClick={handleSubOrderClick}><IoAddCircleOutline className='w-6 h-6'/></button></div>
        <div className=" h-min 2xl:max-h-[65vh] max-h-[48vh] overflow-y-auto">
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
      </div>
    </div>
  );
};

export default ContactSidebar;
