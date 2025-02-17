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
        <li className="flex p-2 justify-between items-center hover:bg-gray-100 text-sm text-nowrap">
            <div className="w-full flex justify-between text-gray-600 text-sm">
                <div className="flex-[10] pl-4 overflow-hidden text-ellipsis whitespace-nowrap">{index + 1}</div>
                <div className="flex-[20] overflow-hidden text-ellipsis whitespace-nowrap">
                    {new Date(order?.request_date).toLocaleDateString() || 'N/A'}
                </div>
                <div className="flex-[20] overflow-hidden text-ellipsis whitespace-nowrap">{order._id.slice(-6)}</div>
                <div className="flex-[20] overflow-hidden text-ellipsis whitespace-nowrap">{order.quotations?.quote_number || 'N/A'}</div>
                <div className="flex-[30] overflow-hidden text-ellipsis whitespace-nowrap">{order.customer?.name}</div>
                <div className="flex-[50] overflow-hidden text-ellipsis whitespace-nowrap">{order.customer?.email || 'N/A'}</div>
                <div className="flex-[25] overflow-hidden text-ellipsis whitespace-nowrap">{order.customer?.phone || 'N/A'}</div>
                <div className="flex-[60] overflow-hidden text-ellipsis whitespace-nowrap">
                    {[
                        order.order_summary?.part_name,
                        order.order_summary?.year,
                        order.order_summary?.make,
                        order.order_summary?.model,
                    ]
                        .filter(Boolean) // Removes empty or undefined values
                        .join(", ")}
                </div>

                <div className="flex-[30] overflow-hidden text-ellipsis whitespace-nowrap">{order.order_disposition_details?.order_status}</div>
                <div className="flex-[12] flex space-x-2">
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
            </div>

        </li>
    );
};

export default OrderListItem;

