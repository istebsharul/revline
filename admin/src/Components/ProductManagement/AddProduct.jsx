import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [part, setPart] = useState('');
    const [variant, setVariant] = useState('');
    const [transmission, setTransmission] = useState('');
    const [description, setDescription] = useState('');
    const [grade, setGrade] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [contact, setContact] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/inventory/add`, { 
                year, make, model, part, variant, transmission, description, grade, sku, price, contact, quantity 
            });
            setYear('');
            setMake('');
            setModel('');
            setPart('');
            setVariant('');
            setTransmission('');
            setDescription('');
            setGrade('');
            setSku('');
            setPrice('');
            setContact('');
            setQuantity('');
            setSuccess('Product added successfully!');
        } catch (error) {
            setError('Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-11/12 mx-auto p-6 bg-white rounded-lg shadow-md m-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>
            <div className="w-full flex gap-2">
                <div className="flex flex-col mb-4">
                    <label htmlFor="year" className="w-full text-sm font-medium text-gray-700">Year</label>
                    <input
                        type="number"
                        id="year"
                        placeholder="Enter year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="make" className="w-full text-sm font-medium text-gray-700">Make</label>
                    <input
                        type="text"
                        id="make"
                        placeholder="Enter make"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="model" className="w-full text-sm font-medium text-gray-700">Model</label>
                    <input
                        type="text"
                        id="model"
                        placeholder="Enter model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="part" className="w-full text-sm font-medium text-gray-700">Part</label>
                    <input
                        type="text"
                        id="part"
                        placeholder="Enter part"
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="variant" className="w-full text-sm font-medium text-gray-700">Variant</label>
                    <input
                        type="text"
                        id="variant"
                        placeholder="Enter variant"
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="transmission" className="w-full text-sm font-medium text-gray-700">Transmission</label>
                    <input
                        type="text"
                        id="transmission"
                        placeholder="Enter transmission"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="description" className="w-full text-sm font-medium text-gray-700">Description</label>
                    <input
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="3"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="grade" className="w-full text-sm font-medium text-gray-700">Grade</label>
                    <input
                        type="text"
                        id="grade"
                        placeholder="Enter grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="sku" className="w-full text-sm font-medium text-gray-700">SKU</label>
                    <input
                        type="text"
                        id="sku"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="price" className="w-full text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="text"
                        id="price"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="contact" className="w-full text-sm font-medium text-gray-700">Contact</label>
                    <input
                        type="text"
                        id="contact"
                        placeholder="Enter contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="quantity" className="w-full text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Adding...' : 'Add Product'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>
    );
};

export default AddProduct;
