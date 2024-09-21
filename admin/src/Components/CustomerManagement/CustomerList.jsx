import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterInput from './FilterInput';
import ExportButton from './ExportButton';
import CustomerItem from './CustomerItem';

const CustomerList = ({ customers, setCustomers,setShowForm, showForm }) => {
    const [filter, setFilter] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(customers);

    useEffect(() => {
        if (filter) {
            const lowercasedFilter = filter.toLowerCase();
            const filtered = customers.filter(customer => {
                const id = (customer._id ?? '').toString();
                const name = (customer.name ?? '').toString();
                const email = (customer.email ?? '').toString();
                const phone = (customer.phone ?? '').toString();

                return name.toLowerCase().includes(lowercasedFilter) ||
                    email.toLowerCase().includes(lowercasedFilter) ||
                    phone.toLowerCase().includes(lowercasedFilter) ||
                    id.toLowerCase().includes(lowercasedFilter);
            });

            setFilteredCustomers(filtered);
        } else {
            setFilteredCustomers(customers);
        }
    }, [filter, customers]);

    const handleDelete = async (customerId) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this customer? This action cannot be undone.");

        // If the user does not confirm, exit the function
        if (!isConfirmed) return;

        try {
            // Perform the delete request
            await axios.delete(`/api/v1/customer/${customerId}`);

            // Update the customers and filteredCustomers state
            setCustomers(customers.filter(customer => customer._id !== customerId));
            setFilteredCustomers(filteredCustomers.filter(customer => customer._id !== customerId));
        } catch (error) {
            console.error(error);
            alert('Failed to delete customer. Please try again.');
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg">
            <div className="w-full flex items-center justify-between mb-6">
                <h2 className="w-full text-2xl flex flex-col font-semibold text-left">
                    <span>Customer List</span>
                    <span className='text-xs text-gray-500'>Total Customers - {filteredCustomers.length}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="w-1/2 bg-blue-500 text-white p-2 rounded"
                    >
                        {showForm ? 'Cancel' : '+ New Customer'}
                    </button>
                    <FilterInput filter={filter} setFilter={setFilter} />
                    <ExportButton filteredCustomers={filteredCustomers} />
                </div>
            </div>
            <div className='grid grid-cols-5 bg-gray-200 p-2 rounded-t-lg'>
                <div>No.</div>
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Action</div>
            </div>
            <ul className="divide-y divide-gray-200">
                {filteredCustomers.map((customer, index) => (
                    <CustomerItem
                        key={customer._id}
                        customer={customer}
                        index={index}
                        handleDelete={() => handleDelete(customer._id)} // Pass handleDelete as a prop
                    />
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
