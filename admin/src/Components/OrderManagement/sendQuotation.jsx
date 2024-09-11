import React, { useState,useEffect } from 'react';
import axios from 'axios';

const SendQuotation = ({ orderDetails }) => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.log(orderDetails);
    }, [orderDetails]);

    const handleSendQuotation = async () => {
        // console.log(customer);
        if (!orderDetails?.pricing_details) {
            setError('Price are missing.');
            return;
        }
        setIsSending(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/v1/quotation/send', { orderId: orderDetails._id });
            setSuccess(response.data.message || 'Quotation sent successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to send quotation. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={handleSendQuotation}
                disabled={isSending}
                className='w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 m-1 rounded-lg'
            >
                {isSending ? 'Sending...' : 'Send Quotation'}
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
};

export default SendQuotation;
