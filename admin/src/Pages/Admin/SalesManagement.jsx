import React, { useState, useEffect } from 'react';
import OrderList from '../../Components/OrderManagement/OrderList';
import axios from 'axios';

const SalesManagement = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get('/api/v1/order/all');
                console.log(response);
                setOrders(response.data); // Ensure response.data is an array
            } catch (error) {
                setError('Failed to fetch orders');
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        getOrders();
    }, []);

    return (
        <div className="w-full flex flex-col justify-start items-center min-h-screen bg-gray-100">
            <header className="w-full bg-white shadow-md mb-4">
                <div className="w-full container mx-auto py-4 px-6 flex flex-col items-start">
                    <h1 className="text-2xl font-semibold">Sales Management</h1>
                </div>
            </header>
            <main className="w-full container mx-auto px-6 py-4">
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
                    <OrderList orders={orders} onSelectOrder={setSelectedOrder} />
                )}
            </main>
        </div>
    );
};

export default SalesManagement;
