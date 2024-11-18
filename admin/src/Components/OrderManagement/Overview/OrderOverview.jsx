import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import { useQuery } from '@tanstack/react-query'; // Import useQuery for data fetching
import axios from 'axios'; // Using axios for making API requests
import ContactSidebar from './ContactSidebar';
import OverviewContainer from './OverviewContainer';

// Function to fetch order details
const fetchOrderDetails = async (orderId) => {
    const response = await axios.get(`https://server.revlineautoparts.com/api/v1/orders/${orderId}`);
    // console.log("Fetched order data directly:", response.data); // Log fetched data directly
    return response.data; // Return order data
};

const OrderOverview = () => {
    const { orderId } = useParams(); // Get the orderId from the URL
    // console.log("Order ID from URL:", orderId); // Log the orderId

    // Use useQuery to fetch order details
    const { data, error, isLoading } = useQuery({
        queryKey: ['orderDetails', orderId],
        queryFn: () => fetchOrderDetails(orderId),
        enabled: !!orderId, // Ensure the query only runs when orderId is available
        staleTime: 60 * 60 * 1000, // Data will be considered fresh for 1 hour
        cacheTime: 60 * 60 * 1000, // Cache the data for 1 hour
        refetchOnWindowFocus: false, // Prevent refetching when window is focused
    });


    // Log the data received from the query
    // console.log("Data from useQuery:", data);

    // Handle loading state
    if (isLoading) {
        console.log("Loading..."); // Log when loading
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        console.log("Error fetching order details:", error.message); // Log error message
        return <div>Failed to load order details: {error.message}</div>;
    }

    // If no order found
    if (!data) {
        console.log("No order found for ID:", orderId); // Log if no data found
        return <div>No order found for ID: {orderId}</div>;
    }

    return (
        <div className="flex h-screen-minus-14">
            <ContactSidebar customer={data.customer} order_id={data._id} />
            <OverviewContainer order={data} />
        </div>
    );
};

export default OrderOverview;

