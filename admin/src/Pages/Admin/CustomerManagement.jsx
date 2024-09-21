import React, { useEffect, useState } from 'react';
import CustomerList from '../../Components/CustomerManagement/CustomerList';
import AddCustomerForm from '../../Components/CustomerManagement/AddCustomerForm';
import axios from 'axios';

function CustomerManagement() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/v1/customer/list', {
                    params: {
                        page,
                        limit
                    }
                });
                const data = response.data.customers;  // Extract customers from response
                setCustomers(data);
                setFilteredCustomers(data);
                setTotalPages(response.data.pagination.totalPages); // Set total pages for pagination
            } catch (error) {
                setError('Failed to fetch customers');
                console.error('Failed to fetch customers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [page, limit]); // Fetch data on page or limit change

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setFilteredCustomers([...customers, newCustomer]);
        setShowForm(false); // Hide the form after adding
    };

    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return ( 
        <div>
            <main className="w-full mx-auto flex flex-col">
                {loading && <div className="p-4 bg-gray-100 text-gray-800">Loading...</div>}
                {error && <div className="p-4 bg-red-100 text-red-800">{error}</div>}
                {showForm && (
                    <AddCustomerForm onSubmit={handleAddCustomer} />
                )}
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-full bg-white shadow-md rounded-lg p-4">
                        <CustomerList setShowForm={setShowForm}
              showForm={showForm} customers={filteredCustomers} setCustomers={setCustomers} />
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
    )
}

export default CustomerManagement;
