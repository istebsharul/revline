import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Banner from '../../Components/User/Banner';
import OrderDetails from '../../Components/Order/OrderDetails';

const OrderPage = () => {
  const [orders, setOrders] = useState([]); // State for orders list
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customerId = useSelector((state) => state?.auth?.user?.customer); // Fetching customer ID from state

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        // Fetch all orders for the customer
        const response = await axios.get(`/api/v1/orders/${customerId}`); // Adjust API endpoint as needed
        setOrders(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 md:pt-10 pt-16'>
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
          {selectedOrder ? (
            <OrderDetails order={selectedOrder} onBack={handleBackToList} /> // New component for showing order details
          ) : (
            <div className="p-4 bg-white shadow-md rounded-md w-11/12 max-w-4xl mt-8">
              <h2 className="text-2xl font-bold mb-4">Orders List</h2>
              {orders.length > 0 ? (
                <ul>
                  {orders.slice().reverse().map((order) => (
                    <li key={order._id} className="mb-4 p-4 bg-gray-50 border rounded-md cursor-pointer" onClick={() => handleOrderClick(order)}>
                      <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                      <p><strong>Order Status:</strong> {order.order_disposition_details?.order_status}</p>
                      <p><strong>Request Date:</strong> {new Date(order.request_date).toLocaleDateString()}</p>
                      <p><strong>Part Name:</strong> {order.order_summary?.part_name}</p>
                      <p><strong>Make/Model/Year:</strong> {`${order.order_summary?.make} / ${order.order_summary?.model} / ${order.order_summary?.year}`}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderPage;