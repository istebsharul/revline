import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import CustomerList from '../../Components/CustomerManagement/CustomerList';
import AddCustomerForm from '../../Components/CustomerManagement/AddCustomerForm';
import toast from 'react-hot-toast';

const fetchCustomers = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey;
    const { data } = await axios.get('https://server.revlineautoparts.com/api/v1/customer/list', { params: { page, limit } });
    return data;
};

function CustomerManagement() {
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;
    const queryClient = useQueryClient();

    // React Query to fetch customers with stale time of 1 week (7 days)
    const { data, error, isLoading } = useQuery({
        queryKey: ['customers', { page, limit }],
        queryFn: fetchCustomers,
        staleTime: 24 * 60 * 60 * 1000, // 1 week in milliseconds
        keepPreviousData: true, // Keeps previous data while fetching new data
    });

    const customers = data?.customers || [];
    const totalPages = data?.pagination?.totalPages || 1;

    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Handle adding a customer
    const handleAddCustomer = async (newCustomer) => {
        try {
            // Add the new customer to the server
            const res = await axios.post('https://server.revlineautoparts.com/api/v1/customer/add', newCustomer);
            // Optionally, you can update the local cache with the new customer
            queryClient.setQueryData(['customers', { page, limit }], (oldData) => ({
                ...oldData,
                customers: [...oldData.customers, res.data],
            }));
            setShowForm(false); // Hide the form after adding
            toast.success('Customer added successfully!');
        } catch (error) {
            console.error('Error adding customer:', error);
            toast.error('Failed to add customer.');
        }
    };

    return ( 
        <div>
            <main className="w-full mx-auto flex flex-col">
                {isLoading && <div className="p-4 bg-gray-100 text-gray-800">Loading...</div>}
                {error && <div className="p-4 bg-red-100 text-red-800">{error.message}</div>}
                {showForm && (
                    <AddCustomerForm onSubmit={handleAddCustomer} />
                )}
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-full bg-white shadow-md rounded-lg p-4">
                        <CustomerList 
                            setShowForm={setShowForm} 
                            showForm={showForm} 
                            customers={customers} 
                        />
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col justify-center items-center gap-4 mt-4">
                    <span className="text-gray-700">
                        Page {page} of {totalPages}
                    </span>
                    <div className='w-full flex justify-center items-center gap-2'>
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="w-1/6 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                        >
                            Previous
                        </button>
                        
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className="w-1/6 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CustomerManagement;
