import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaFileExport, FaTrashAlt, FaInfoCircle } from 'react-icons/fa'; // Import icons from react-icons

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [expandedCustomerId, setExpandedCustomerId] = useState(null); // State to track which customer is expanded

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/v1/customer/list'); // Update API endpoint
                setCustomers(response.data);
                setFilteredCustomers(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch customers. Please try again later.');
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const renderAddress = (address) => {
        if (!address) return null; // Guard clause to avoid errors if address is null
        return (
            <div className='flex gap-4'>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
            </div>
        );
    };

    useEffect(() => {
        // Filter customers based on the filter input
        if (filter) {
            const lowercasedFilter = filter.toLowerCase();
            const filtered = customers.filter(customer => {
                const name = (customer.name ?? '').toString();
                const email = (customer.email ?? '').toString();
                const phone = (customer.phone ?? '').toString();

                return name.toLowerCase().includes(lowercasedFilter) ||
                    email.toLowerCase().includes(lowercasedFilter) ||
                    phone.toLowerCase().includes(lowercasedFilter);
            });

            setFilteredCustomers(filtered);
        } else {
            setFilteredCustomers(customers);
        }
    }, [filter, customers]);

    const handleDelete = async (customerId) => {
        try {
            await axios.delete(`/api/v1/customer/${customerId}`);
            setCustomers(customers.filter(customer => customer._id !== customerId));
            setFilteredCustomers(filteredCustomers.filter(customer => customer._id !== customerId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete customer. Please try again.');
        }
    };

    const handleExport = () => {
        const csvContent = [
            ['ID', 'Name', 'Email', 'Phone', 'Address'],
            ...filteredCustomers.map(customer => [
                customer._id,
                customer.name || 'N/A',
                customer.email || 'N/A',
                customer.phone || 'N/A',
                customer.address ? `${customer.address.street}, ${customer.address.city}` : 'N/A',
            ])
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'customer_list.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleToggleDetails = (customerId) => {
        setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId);
    };

    return (
        <div className="w-full mx-auto p-4 bg-white rounded-lg">
            <div className="w-full flex items-center justify-between mb-6">
                <h2 className="w-full text-2xl flex flex-col font-semibold text-left">
                    <span>Customer List</span>
                    <span className='text-xs text-gray-500'>Total Customers - {filteredCustomers.length}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Filter by Name, Email, or Phone"
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
                    <div>Name</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Actions</div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    </svg>
                    <p className="text-indigo-500 mt-2">Loading customers...</p>
                </div>
            ) : error ? (
                <div className="text-red-600 text-center">{error}</div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {filteredCustomers.map((customer, index) => (
                        <li key={customer._id} className="grid grid-cols-5 p-2 items-center hover:bg-gray-100">
                            <div>{index + 1}</div>
                            <div>{customer.name}</div>
                            <div>{customer.email}</div>
                            <div>{customer.phone}</div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleToggleDetails(customer._id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                    title="Toggle Details"
                                >
                                    {expandedCustomerId === customer._id ? 'Hide Details' : 'Show Details'}
                                </button>
                                <button
                                    onClick={() => handleDelete(customer._id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete Customer"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                            {expandedCustomerId === customer._id && (
                                <div className="col-span-7 mt-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold">Customer Details</h3>
                                    <p><strong>Address:</strong></p>
                                    {renderAddress(customer.address)}
                                    <p><strong>Orders:</strong></p>
                                    <ul>
                                        {customer.orders.length > 0 ? (
                                            customer.orders.map(orderId => (
                                                <li key={orderId}>Order ID: {orderId}</li>
                                            ))
                                        ) : (
                                            <li>No orders</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerList;
