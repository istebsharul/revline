import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaTrashAlt } from 'react-icons/fa'; // Import necessary icons

const OrderListItem = ({ order, index, handleDelete }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    console.log(order);
    const handleViewDetails = () => {
        // Navigate to the route and include order._id as a URL parameter
        navigate(`/sales-management/overview/${order._id}`);
    }; 
    return (
        <li className="flex p-2 justify-between items-center hover:bg-gray-100 text-md">
            <div className="w-2 pl-5">{index + 1}</div>
            <div className="w-20">{order._id.slice(-6)}</div> {/* Display index */}
            <div className='w-20'>{order.quotations?.quote_number || 'N/A'}</div>
            <div className="w-40">{order.customer?.name}</div> {/* Display customer name */}
            <div className="w-40">{new Date(order?.request_date).toLocaleDateString() || 'N/A'}</div> {/* Display created date */}
            <div className="w-60">{order.customer?.email || 'N/A'}</div> {/* Display email with truncation */}
            <div className="w-20">{order.customer?.phone || 'N/A'}</div> {/* Display phone */}
            <div className="w-20 flex space-x-2">
                <button
                    onClick={handleViewDetails}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                >
                    View
                </button>
                <button
                    onClick={() => handleDelete(order._id)}
                    className="text-[#f6251a] hover:text-red-800"
                    title="Delete Order"
                >
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
};

export default OrderListItem;
