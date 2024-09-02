import React, { useState } from 'react';
import axios from 'axios';

const QuotationForm = () => {
    const [formData, setFormData] = useState({
        customer: '',
        items: [],
        totalAmount: '',
        paymentLink: '',
    });
    const [item, setItem] = useState({ name: '', price: '', quantity: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleAddItem = () => {
        if (item.name && item.price && item.quantity) {
            setFormData({
                ...formData,
                items: [...formData.items, item],
            });
            setItem({ name: '', price: '', quantity: '' });
        }
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/quotations/create', formData);
            alert('Quotation created and sent successfully');
            // Clear form
            setFormData({
                customer: '',
                items: [],
                totalAmount: '',
                paymentLink: '',
            });
        } catch (error) {
            console.error('Error creating quotation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow-md">
            <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                    type="text"
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                    type="text"
                    id="item-name"
                    name="name"
                    value={item.name}
                    onChange={handleItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="item-price" className="block text-sm font-medium text-gray-700">Item Price</label>
                <input
                    type="number"
                    id="item-price"
                    name="price"
                    value={item.price}
                    onChange={handleItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="item-quantity" className="block text-sm font-medium text-gray-700">Item Quantity</label>
                <input
                    type="number"
                    id="item-quantity"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleItemChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Add Item
            </button>

            {formData.items.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Items</h3>
                    <ul className="divide-y divide-gray-200">
                        {formData.items.map((item, index) => (
                            <li key={index} className="py-2 flex items-center justify-between">
                                <span>{item.name} - ${item.price} x {item.quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount</label>
                <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="paymentLink" className="block text-sm font-medium text-gray-700">Payment Link</label>
                <input
                    type="text"
                    id="paymentLink"
                    name="paymentLink"
                    value={formData.paymentLink}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Create Quotation
            </button>
        </form>
    );
};

export default QuotationForm;
