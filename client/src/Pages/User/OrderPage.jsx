import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Banner from '../../Components/User/Banner';
import toast from 'react-hot-toast';
import { IoMdRefresh } from "react-icons/io";
import { ImSpinner2 } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';

const OrderPage = () => {
  const customerId = useSelector((state) => state?.auth?.user?.customer);
  const navigate = useNavigate();

  // Define the query
  const { 
    data: orders = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['orders', customerId],
    queryFn: async () => {
      if (!customerId) return [];
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/customer/${customerId}`
      );
      return response.data;
    },
    // Only run query if we have a customerId
    enabled: !!customerId,
    // Stale time of 5 minutes - data won't refetch until after this time
    staleTime: 5 * 60 * 1000,
    // Retry 3 times if query fails
    retry: 3
  });

  // Handle order selection to show details
  const handleOrderClick = (id) => {
    const order = orders.find((order) => order._id === id);
    if (order?.order_disposition_details?.order_status === 'Pending Approval') {
      toast.error('Quotation is not ready, We will inform you via email once ready.');
      return;
    }
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

      {isLoading ? (
        <div className="p-4 bg-white shadow-md rounded-md w-11/12 max-w-4xl mt-8">
          <div className="w-full border-b flex justify-start items-center mb-4">
            <h2 className="text-2xl font-bold p-2">Orders List</h2>
            <IoMdRefresh
              className='text-gray-500 hover:text-red-500 cursor-pointer mx-2'
              onClick={() => refetch()}
              size={20}
            />
          </div>
          <ImSpinner2 className="text-4xl text-red-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 bg-white shadow-md rounded-md w-11/12 max-w-4xl mt-8">
          <div className="w-full border-b flex justify-start items-center mb-4">
            <h2 className="text-2xl font-bold p-2">Orders List</h2>
            <IoMdRefresh
              className='text-gray-500 hover:text-red-500 cursor-pointer mx-2'
              onClick={() => refetch()}
              size={20}
            />
          </div>
          <p className='pt-14 h-80'>Error: {error.message}</p>
        </div>
      ) : (
        <>
          <div className="p-4 bg-white shadow-md rounded-md w-11/12 max-w-4xl mt-8">
            <div className="w-full border-b flex justify-start items-center mb-4">
              <h2 className="text-2xl font-bold p-2">Orders List</h2>
              <IoMdRefresh
                className='text-gray-500 hover:text-red-500 cursor-pointer mx-2'
                onClick={() => refetch()}
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
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id.slice(-6)}</h3>
                        <p className="text-gray-600 mt-1"><strong>Part Name:</strong> {order.order_summary?.part_name}</p>
                        <p className="text-gray-600 mt-1"><strong>Make/Model/Year:</strong> {`${order.order_summary?.make} / ${order.order_summary?.model} / ${order.order_summary?.year}`}</p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <p className="text-gray-600 mt-1"><strong>Order Date:</strong> {new Date(order.request_date).toLocaleDateString()}</p>
                        <p className={`mt-2 font-medium ${order.order_disposition_details?.order_status === 'Completed' ? 'text-green-500' : 'text-[#f6251a]'}`}>
                          <strong>Order Status:</strong> {order.order_disposition_details?.order_status}
                        </p>
                      </div>
                    </div>

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