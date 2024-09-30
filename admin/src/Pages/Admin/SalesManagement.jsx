import React, { useState } from 'react';
import OrderList from '../../Components/OrderManagement/OrderList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const fetchOrders = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey; // Destructure queryKey to get page and limit
    const { data } = await axios.get('/api/v1/orders/all', { params: { page, limit } });
    return data;
};

const SalesManagement = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    
    const queryClient = useQueryClient();

    // Use React Query to fetch orders, keeping previous data while loading new ones
    const { data, error, isLoading } = useQuery({
        queryKey: ['orders', { page, limit }],
        queryFn: fetchOrders,
        staleTime: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        keepPreviousData: true,
    });

    const orders = data?.orders || [];
    const totalPages = data?.pagination?.totalPages || 1;
    // console.log(orders);
    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Handle deletion of an order
    const handleDelete = async (orderId) => {
        const confirmed = confirm("Are you sure you want to delete?");
        if (confirmed) {
            try {
                await axios.delete(`/api/v1/orders/${orderId}`);
                queryClient.invalidateQueries(['orders']); // Invalidate the 'orders' query to refetch
                toast.success("Order deleted successfully");
            } catch (error) {
                toast.error('Failed to delete order');
                console.error('Error deleting order:', error);
            }
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-center bg-gray-100">
            <main className="w-full">
                {isLoading ? (
                    <div className="text-center">
                        <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        </svg>
                        <p className="text-indigo-500 mt-2">Loading orders...</p>
                    </div>
                ) : error ? (
                    <div className="text-red-600 text-center">Failed to fetch orders. Please try again later.</div>
                ) : (
                    <>
                        <OrderList orders={orders} onSelectOrder={setSelectedOrder} onDelete={handleDelete} />
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
                    </>
                )}
            </main>
        </div>
    );
};

export default SalesManagement;
