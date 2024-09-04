import React, { useState } from 'react';
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import CustomerDetails from './CustomerDetails';

const CustomerItem = ({ customer, index, handleDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleDetails = () => {
        setExpanded(!expanded);
    };

    return (
        <li className="grid grid-cols-5 p-2 items-center hover:bg-gray-100">
            <div className='pl-2'>{index + 1}</div>
            <div>{customer.name}</div>
            <div>{customer.email}</div>
            <div>{customer.phone}</div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleToggleDetails}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    title="Toggle Details"
                >
                    {expanded ? 'Close' : (<FaInfoCircle />)}
                </button>
                <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Customer"
                >
                    <FaTrashAlt />
                </button>
            </div>
            {expanded && <CustomerDetails customer={customer} />}
        </li>
    );
};

export default CustomerItem;
