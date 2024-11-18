import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderDetails from '../../Components/Order/OrderDetails';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Banner from '../../Components/User/Banner';
import { IoArrowBackOutline } from "react-icons/io5";

// Fetch order details with support for optional parameters like `id`
const fetchOrderDetails = async ({ queryKey }) => {
    const [_key, { id }] = queryKey; // Extract 'id' from queryKey object
    const { data } = await axios.get(`https://server.revlineautoparts.com/api/v1/orders/user/${id}`);
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
        <div className='w-full flex flex-col justify-center items-center bg-gray-100 md:pt-10 pt-10'>
            {/* Pass fetched order data to the OrderDetails component */}
            <div className='mt-10'>
                <div onClick={handleBack}  className='w-min flex justify-start items-center border border-gray-400 rounded-lg hover:shadow-lg hover:bg-gray-200 py-2 px-4 m-2 md:mx-4 gap-2 bg-gray-100 text-nowrap text-sm'><IoArrowBackOutline/>Go Back to Orders</div>
                {order && <OrderDetails order={order} />}
            </div>
        </div>
    );
}

export default OrderDetailsPage;
