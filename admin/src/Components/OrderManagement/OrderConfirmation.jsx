import React, { useState } from 'react';
import axios from 'axios';

const OrderConfirmation = () => {
    const [orderData, setOrderData] = useState({
        customer: '',
        quotation: '',
        items: [],
        totalAmount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/orders/create', orderData);
            alert('Order created and invoice sent successfully');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields for customer, quotation, items, totalAmount */}
            <button type="submit">Confirm Order</button>
        </form>
    );
};

export default OrderConfirmation;
