import React, { useState } from 'react';
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';

const CustomerItem = ({ customer, index, handleDelete }) => {

    return (
        <li className="grid grid-cols-5 p-2 items-center hover:bg-gray-100">
            <div className='pl-2'>{index + 1}</div>
            <div>{customer.name}</div>
            <div>{customer.email}</div>
            <div>{customer.phone}</div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-[#f6251a] hover:text-red-800"
                    title="Delete Customer"
                >
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
};

export default CustomerItem;