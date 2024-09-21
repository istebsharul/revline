import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendInvoice = ({ orderDetails }) => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.log(orderDetails);
    }, [orderDetails]);

    const handleSendInvoice = async () => {
        if (!orderDetails?.pricing_details?.quoted_price) {
            setError('Price is missing!');
            return;
        }

        if (!orderDetails.pricing_details?.shipping_cost) {
            setError('Shipping cost is missing!');
            return;
        }

        if (!orderDetails.order_summary || !orderDetails.order_summary.part_name) {
            setError('Order summary is missing required data.');
            return;
        }

        if (!orderDetails.shipping_details.address_line_1 || !orderDetails.shipping_details.address_line_2 || !orderDetails.shipping_details.city || !orderDetails.shipping_details.state_or_region || !orderDetails.shipping_details.country_or_region) {
            setError('Shipping details are missing required data.');
            return;
        }

        if(!orderDetails.payment_details.transaction_id){
            setError('Transaction Id is Missing!');
            return;
        }

        setIsSending(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/v1/service/invoice/send', { orderId: orderDetails._id, transactionId:orderDetails.payment_details.transaction_id, paymentMode: orderDetails.payment_details.payment_method });
            setSuccess(response.data.message || 'Invoice sent successfully!');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to send invoice.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full flex justify-between items-center">
            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-500">{success}</p>}
            <button
                onClick={handleSendInvoice}
                disabled={isSending}
                className={`w-full px-4 py-2 m-1 rounded-lg text-black ${
                    isSending ? 'bg-gray-400' : success ? 'bg-green-500 hover:bg-green-600 text-white' : error ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                {isSending ? 'Sending...' : 'Send Invoice'}
            </button>
        </div>
    );
};

export default SendInvoice;
