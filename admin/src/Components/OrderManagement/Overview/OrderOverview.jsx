import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactSidebar from './ContactSidebar';
import OverviewContainer from './OverviewContainer';

const OrderOverview = () => {
    const location = useLocation();
    const initialOrderDetails = location.state?.order;

    // State to manage order details
    const [orderDetails, setOrderDetails] = useState(initialOrderDetails);

    useEffect(() => {
        if (!initialOrderDetails) {
            // You can handle fetching or updating the order details here if needed
            console.log('No initial order details found');
        }
    }, [initialOrderDetails]);

    if (!orderDetails) {
        return <div>No order details available.</div>;
    }

    return (
        <div className="flex h-screen-minus-14">
            <ContactSidebar customer={orderDetails.customer} orderId={orderDetails._id}/>
            {/* Pass setOrderDetails to update order details */}
            <OverviewContainer orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
        </div>
    );
};

export default OrderOverview;
