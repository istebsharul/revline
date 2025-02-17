import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import OrderListItem from './OrderListItem'; // Import the new OrderListItem component

const OrderList = ({ filteredOrders,setFilteredOrders }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to handle deletion of an order
    const handleDelete = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to delete this order? You won’t be able to get it back.');
        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}`);
            setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete order. Please try again.');
        }
    };

    function formatDate(createdAt) {
        const date = new Date(createdAt);
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    return (
        <div className="w-full mx-auto p-2 shadow-inner ">
            <div className="w-full bg-gray-100 p-4 rounded-t-lg shadow-[inset_4px_4px_10px_rgba(0,0,0,0.2)] ">
                <div className="w-full flex justify-between text-gray-600 font-semibold text-md">
                    <div className="flex-[10]">Index</div>
                    <div className="flex-[20] pl-1">Date</div>
                    <div className="flex-[20]">Order Id</div>
                    <div className="flex-[20]">Quote No.</div>
                    <div className="flex-[30]">Name</div>
                    <div className="flex-[50]">Email</div>
                    <div className="flex-[25]">Phone</div>
                    <div className="flex-[60]">Order Summary</div>
                    <div className="flex-[30]">Status</div>
                    <div className="flex-[12]">Actions</div>
                </div>

            </div>
            {loading ? (
                <div className="w-full h-full p-10 text-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    </svg>
                    <p className="text-indigo-500 mt-2">Loading orders...</p>
                </div>
            ) : error ? (
                <div className="text-[#f6251a] text-center">{error}</div>
            ) : (
                <ul className="max-h-[70vh] overflow-auto divide-y divide-gray-200 border-x border-b border-gray-300">
                    {filteredOrders.length>0 && filteredOrders?.map((order, index) => (
                        <OrderListItem key={order._id} order={order} index={index} handleDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList;
