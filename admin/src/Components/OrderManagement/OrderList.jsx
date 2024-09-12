import React, { useState, useEffect } from 'react';
import { FaFilter, FaFileExport } from 'react-icons/fa'; // Import necessary icons
import axios from 'axios'; // Import axios for API calls
import OrderListItem from './OrderListItem'; // Import the new OrderListItem component

const OrderList = ({ orders }) => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Filter orders based on orderId, customer name, phone, email, or status
        let filtered = filter
            ? orders.filter(order => {
                const lowercasedFilter = filter.toLowerCase();
                const customerName = (order.customer?.name ?? '').toLowerCase();
                const status = (order.status ?? '').toLowerCase();
                const email = (order.customer?.email ?? '').toLowerCase();
                const phone = (order.customer?.phone ?? '').toLowerCase();
                const orderId = (order._id ?? '').toLowerCase();
    
                return customerName.includes(lowercasedFilter) ||
                    status.includes(lowercasedFilter) ||
                    email.includes(lowercasedFilter) ||
                    phone.includes(lowercasedFilter) ||
                    orderId.includes(lowercasedFilter);
            })
            : orders;
    
        // Reverse the order list
        filtered = filtered.slice().reverse();
    
        setFilteredOrders(filtered);
    }, [filter, orders]);
    

    // Function to handle deletion of an order
    const handleDelete = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to delete this order? You won’t be able to get it back.');
        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(`/api/v1/orders/${orderId}`);
            setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete order. Please try again.');
        }
    };

    // Function to handle exporting the order list to CSV
    const handleExport = () => {
        const csvContent = [
            ['Index', 'Order ID', 'Name', 'Date', 'Email', 'Phone', 'Quote Number'],
            ...filteredOrders.map((order, index) => [
                index + 1,
                order._id || 'N/A',
                order.customer.name || 'N/A',
                order.customer.createdAt || 'N/A',
                order.customer.email || 'N/A',
                order.customer.phone || 'N/A',
                order.quoteNumber || 'N/A',
            ])
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'order_list.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="w-full mx-auto p-4 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h2 className="w-full text-2xl flex flex-col font-semibold text-left">
                    <span>Order List</span>
                    <span className='text-xs text-gray-500'>Total Orders - {filteredOrders.length}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Filter by Order ID, Customer Name, Phone, Email, or Status"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <FaFilter className="absolute right-2 top-2 text-gray-500" />
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center p-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
                        title="Export to CSV"
                    >
                        <FaFileExport className="mr-2 h-5 w-5" />
                        Export
                    </button>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-t-lg">
                <div className="flex justify-between text-gray-600 font-semibold">
                    <div className="w-2">Index</div>
                    <div className='w-48'>Order ID</div>
                    <div className="w-40">Name</div>
                    <div className="w-20">Date</div>
                    <div className="w-60">Email</div>
                    <div className="w-20">Phone</div>
                    <div className="w-20">Actions</div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    </svg>
                    <p className="text-indigo-500 mt-2">Loading orders...</p>
                </div>
            ) : error ? (
                <div className="text-red-600 text-center">{error}</div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {filteredOrders.map((order, index) => (
                        <OrderListItem key={order._id} order={order} index={index} handleDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList;
