import React, { useEffect,useState } from 'react';
import Quotation from '../../Components/Order/Quotation';
import Order from '../../Components/Order/Order';
import toast from 'react-hot-toast';
import axios from 'axios';

const OrderDetails = ({ order, onBack }) => {
    const [paymentDetails,setPaymentDetails]=useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.post(`api/v1/paypal/payment-details`, {
                    orderId: order?._id
                });
                console.log(response.data);
                setPaymentDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchPaymentDetails();
    }, [order?._id]); // Add dependencies to prevent unnecessary re-renders
    

    const handleAccept = async () => {
        toast.promise(
            axios.post('/api/v1/paypal/create-payment', {
                orderId: order._id,
                // Add necessary order details or payload here if required by your API
            }),
            {
                loading: 'Creating PayPal payment...',
                success: <b>Redirecting to PayPal...</b>,
                error: (error) => {
                    // Extract the error message from the response if available
                    const errorMessage = error.response?.data?.message || 'An error occurred while creating PayPal payment.';
                    return <b>{errorMessage}</b>;
                },
            }
        ).then(response => {
            if (response.data.approvalUrl) {
                // Redirect to the PayPal approval URL to complete the payment
                window.location.href = response.data.approvalUrl;
            }
        }).catch(err => {
            console.error('Error while creating PayPal payment:', err);
        });
    };

    const handlePayment = async () => {
        console.log('Payment initiated.');
        // Implement payment logic here
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md w-11/12 max-w-4xl mt-8">
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onBack}>Back to Orders List</button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {/* Display Quotation if available */}
            <div className='p-2'>
                {order.quotations && (
                    <Quotation
                        orderId={order._id}
                        pdfBinary={order?.quotations?.quotationPdf?.data?.data}
                        orderStatus={order?.order_disposition_details?.order_status}
                        quotationsStatus={order?.quotations?.status}
                        onAccept={handleAccept}
                        onPay={handlePayment}
                    />
                )}
            </div>
            <div className='bg-gray-100 rounded-xl p-4 m-2'>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Order Status:</strong> {order.order_disposition_details?.order_status}</p>
            </div>


            {/* Order Details */}
            <div className='bg-gray-100 rounded-xl p-4 m-2'>
                <h1 className='text-lg font-semibold'>Order Summary</h1>
                <div className='grid grid-cols-2'>
                    <p><strong>Year: </strong>{order?.order_summary?.year}</p>
                    <p><strong>Make: </strong>{order?.order_summary?.make}</p>
                    <p><strong>Model: </strong>{order?.order_summary?.model}</p>
                    <p><strong>Part Name: </strong>{order?.order_summary?.part_name}</p>
                    <p><strong>Variant: </strong>{order?.order_summary?.variant}</p>
                    <p><strong>Transmission: </strong>{order?.order_summary?.transmission}</p>
                </div>
            </div>

            {/* Render Order Summary */}
            {/* {order.order_summary && (
                <Order orderSummary={order.order_summary} />
            )} */}

            <div className='flex justify-between items-center p-4 m-2 bg-gray-100 rounded-xl'>
                {/* Shipping Details */}
                <div className='w-1/2'>
                    <h3 className="text-lg font-semibold">Shipping Details</h3>
                    <p><strong>Name:</strong> {order?.shipping_details?.customer?.name}</p>
                    <p><strong>Email:</strong> {order?.shipping_details?.customer?.email}</p>
                    <p><strong>Address:</strong> {`${order?.shipping_details?.address_line_1}, ${order?.shipping_details?.city}, ${order?.shipping_details?.state_or_region}, ${order?.shipping_details?.country_or_region}`}</p>
                </div>

                {/* Billing Details */}
                <div className='w-1/2'>
                    <h3 className="text-lg font-semibold">Billing Details</h3>
                    <p><strong>Card Holder:</strong> {order?.billing_details?.card_holder_name}</p>
                    <p><strong>Billing Address:</strong> {`${order?.billing_details?.billing_address_line_1 || ''} ${order?.billing_details?.billing_city || ''} ${order?.billing_details?.billing_state_or_region || ''} ${order?.billing_details?.billing_country_or_region}`}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
