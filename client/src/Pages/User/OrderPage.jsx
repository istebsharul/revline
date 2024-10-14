import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Banner from '../../Components/User/Banner';
import { IoMdRefresh } from "react-icons/io";

const OrderPage = () => {
  const [orders, setOrders] = useState([]); // State for orders list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customerId = useSelector((state) => state?.auth?.user?.customer); // Fetching customer ID from state
  const navigate = useNavigate();

  // Function to fetch orders from the API
  const fetchOrders = async (ignoreCache = false) => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Fetch orders for the customer
      const response = await axios.get(`/api/v1/orders/customer/${customerId}`);
      setOrders(response.data);

      // Update local storage after fetching
      localStorage.setItem('orders', JSON.stringify(response.data));
    } catch (err) {
      setError(err.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to initially load the orders from localStorage or API
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');

    if (storedOrders && !error) {
      setOrders(JSON.parse(storedOrders)); // Load orders from local storage
      setLoading(false);
    } else {
      fetchOrders(); // Fetch from API if no local storage
    }
  }, [customerId]);

  // Handle order selection to show details
  const handleOrderClick = (id) => {
    navigate(`details/${id}`);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 md:pt-10 pt-16 py-10'>
      <div className="relative">
        <Banner />
        <p className="absolute text-4xl inset-0 flex justify-center items-center text-white">
          Your Orders
        </p>
      </div>

      {loading ? (
        <p className='h-screen'>Loading...</p>
      ) : error ? (
        <p className='pt-14 h-80'>Error: {error}</p>
      ) : (
        <>
          <div className="p-4 bg-white shadow-md rounded-md w-11/12 max-w-4xl mt-8">
            {/* Manual Refresh Button */}
            <div className="w-full border-b flex justify-start items-center mb-4">
              <h2 className="text-2xl font-bold p-2">Orders List</h2>
              <IoMdRefresh
                className='text-gray-500 hover:text-red-500 cursor-pointer mx-2'
                onClick={() => fetchOrders(true)}
                size={20}
              />
            </div>

            {orders.length > 0 ? (
              <ul>
                {orders.slice().reverse().map((order) => (
                  <li
                  key={order._id}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
                  onClick={() => handleOrderClick(order._id)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left section: Order Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id.slice(-6)}</h3>
                      <p className="text-gray-600 mt-1"><strong>Part Name:</strong> {order.order_summary?.part_name}</p>
                      <p className="text-gray-600 mt-1"><strong>Make/Model/Year:</strong> {`${order.order_summary?.make} / ${order.order_summary?.model} / ${order.order_summary?.year}`}</p>
                    </div>
                
                    {/* Right section: Status and Date */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-gray-600 mt-1"><strong>Order Date:</strong> {new Date(order.request_date).toLocaleDateString()}</p>
                      <p className={`mt-2 font-medium ${order.order_disposition_details?.order_status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                        <strong>Order Status:</strong> {order.order_disposition_details?.order_status}
                      </p>
                    </div>
                  </div>
                  
                  {/* Horizontal line for separation */}
                  <div className="border-t mt-4 pt-4">
                    <p className="text-sm text-gray-500">Click to view details</p>
                  </div>
                </li>
                
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;