import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaTrashAlt } from 'react-icons/fa'; // Import necessary icons

const OrderListItem = ({ order, index, handleDelete }) => {
    return (
        <li className="flex p-2 justify-between items-center hover:bg-gray-100 text-md">
            <div className="w-2 pl-5">{index+1}</div>
            <div className="w-48">{order._id}</div> {/* Display index */}
            <div className="w-40">{order.customer?.name}</div> {/* Display customer name */}
            <div className="w-20">{new Date(order?.request_date).toLocaleDateString() || 'N/A'}</div> {/* Display created date */}
            <div className="w-60">{order.customer?.email || 'N/A'}</div> {/* Display email with truncation */}
            <div className="w-20">{order.customer?.phone || 'N/A'}</div> {/* Display phone */}
            <div className="w-20 flex space-x-2">
                <Link
                    to={`/sales-management/overview`}
                    state={{ order }} // Pass the order details in the state
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                >
                    View
                </Link>
                <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Order"
                >
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
};

export default OrderListItem;
