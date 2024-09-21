import React, { useState, useEffect } from 'react';
import OrderList from '../../Components/OrderManagement/OrderList';
import axios from 'axios';

const SalesManagement = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get('/api/v1/orders/all', {
                    params: {
                        page,
                        limit
                    }
                });
                setOrders(response.data.orders); // Update to use the response structure
                console.log(response.data);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                setError('Failed to fetch orders');
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        getOrders();
    }, [page, limit]);

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
        <div className="w-full flex flex-col justify-start items-center bg-gray-100">
            <main className="w-full">
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
                    <>
                        <OrderList orders={orders} onSelectOrder={setSelectedOrder} />
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
                            </button></div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default SalesManagement;