import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendQuotation = ({ orderDetails }) => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSendQuotation = async () => {
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

        setIsSending(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/v1/service/quotation/send', { orderId: orderDetails._id });
            setSuccess(response.data.message || 'Quotation sent successfully!');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to send quotation.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full flex justify-between items-center">
            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-500">{success}</p>}
            <button
                onClick={handleSendQuotation}
                disabled={isSending}
                className={`w-full px-4 py-2 m-1 rounded-lg text-black ${
                    isSending ? 'bg-gray-400' : success ? 'bg-green-500 hover:bg-green-600 text-white' : error ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                {isSending ? 'Sending...' : 'Send Quotation'}
            </button>
        </div>
    );
};

export default SendQuotation;
