import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderDetails from '../../Components/Order/OrderDetails';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Banner from '../../Components/User/Banner';

// Fetch order details with support for optional parameters like `id`
const fetchOrderDetails = async ({ queryKey }) => {
    const [_key, { id }] = queryKey; // Extract 'id' from queryKey object
    const { data } = await axios.get(`/api/v1/orders/user/${id}`);
    return data;
};

function OrderDetailsPage() {
    const { id } = useParams(); // Extract 'id' from the URL parameters
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // Pagination (if needed)

    // React Query to fetch order details
    const { data: order, error, isLoading } = useQuery({
        queryKey: ['orderDetails', { id, page }], // Pass id and optional parameters
        queryFn: fetchOrderDetails,
        staleTime: 7 * 24 * 60 * 60 * 1000, // 1 week
        keepPreviousData: true, // Keep previous data while fetching
        enabled: !!id, // Only fetch if `id` exists
    });

    // Handle going back to the orders list
    const handleBack = () => {
        console.log("Back Pressed");
        navigate('/orders');
    };

    // Display loading or error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching order details: {error.message}</div>;

    return (
        <div className='w-full flex flex-col justify-center items-center bg-gray-100 md:pt-10 pt-16'>
            <div className="relative">
                <Banner />
                <p className="absolute text-4xl inset-0 flex justify-center items-center text-white">
                    Your Orders
                </p>
            </div>
            {/* Pass fetched order data to the OrderDetails component */}
            {order && <OrderDetails order={order} onBack={handleBack} />}
        </div>
    );
}

export default OrderDetailsPage;
