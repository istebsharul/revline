import React, { useState, useEffect } from 'react';
import { FaFilter, FaFileExport, FaTrashAlt, FaInfoCircle } from 'react-icons/fa'; // Import icons

const OrderList = ({ orders, onSelectOrder }) => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        setFilteredOrders(
            filter ? orders.filter(order => {
                const lowercasedFilter = filter.toLowerCase();
                const customerName = (order.customer?.name ?? '').toLowerCase();
                const status = (order.status ?? '').toLowerCase();
                return customerName.includes(lowercasedFilter) || status.includes(lowercasedFilter);
            }) : orders
        );
    }, [filter, orders]);

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`/api/v1/orders/${orderId}`);
            setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete order. Please try again.');
        }
    };

    const handleExport = () => {
        const csvContent = [
            ['ID', 'Customer', 'Total Amount', 'Status'],
            ...filteredOrders.map(order => [
                order._id,
                order.customer.name || 'N/A',
                order.totalAmount || 'N/A',
                order.status || 'N/A',
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

    const handleSelectOrder = (order) => {
        setSelectedOrder(order === selectedOrder ? null : order);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="w-full text-2xl flex flex-col font-semibold text-left">
                    <span>Order List</span>
                    <span className='text-xs text-gray-500'>Total Orders - {filteredOrders.length}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Filter by Customer Name or Status"
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
                <div className="grid grid-cols-5 text-gray-600 font-semibold">
                    <div>No.</div>
                    <div>Customer</div>
                    <div>Total Amount</div>
                    <div>Status</div>
                    <div>Actions</div> {/* New column for actions */}
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
                        <li key={order._id} className="grid grid-cols-5 p-4 items-center hover:bg-gray-100 text-md">
                            <div>{order._id}</div>
                            <div>{order.customer?.name}</div>
                            <div>${order.totalAmount}</div>
                            <div>{order.status}</div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleSelectOrder(order)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="View Details"
                                >
                                    <FaInfoCircle />
                                </button>
                                <button
                                    onClick={() => handleDelete(order._id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete Order"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {selectedOrder && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold">Order Details</h3>
                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                    <p><strong>Customer:</strong> {selectedOrder.customer.name}</p>
                    <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <h4 className="text-lg font-semibold mt-2">Items</h4>
                    <ul>
                        {selectedOrder.items.map((item, index) => (
                            <li key={index}>{item.name} (x{item.quantity})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderList;
