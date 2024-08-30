import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [carPart, setCarPart] = useState('');
    const [variant, setVariant] = useState('');
    const [specification, setSpecification] = useState('');
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
            await axios.post('/api/v1/inventory/add', { year, make, model, carPart, variant, specification, quantity });
            setYear('');
            setMake('');
            setModel('');
            setCarPart('');
            setVariant('');
            setSpecification('');
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
            <div className="w-full flex justify-center items-center gap-2">
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
                    <label htmlFor="carPart" className="w-full text-sm font-medium text-gray-700">Car Part</label>
                    <input
                        type="text"
                        id="carPart"
                        placeholder="Enter car part"
                        value={carPart}
                        onChange={(e) => setCarPart(e.target.value)}
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
                <div className="flex flex-col mb-4">
                    <label htmlFor="specification" className="w-full text-sm font-medium text-gray-700">Specification</label>
                    <input
                        id="specification"
                        placeholder="Enter specifications"
                        value={specification}
                        onChange={(e) => setSpecification(e.target.value)}
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
            {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
            {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
        </form>
    );
};

export default AddProduct;
