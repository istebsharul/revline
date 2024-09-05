import React, { useState } from 'react';
import axios from 'axios';

const SendQuotation = ({ customer }) => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendQuotation = async () => {
        // console.log(customer);
        if (!customer) {
            setError('Customer details are missing.');
            return;
        }

        setIsSending(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/v1/quotation/send', {customerId:customer._id});
            setSuccess(response.data.message || 'Quotation sent successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to send quotation. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-1/4">
            <button
                onClick={handleSendQuotation}
                disabled={isSending}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isSending ? 'Sending...' : 'Send Quotation'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
};

export default SendQuotation;
