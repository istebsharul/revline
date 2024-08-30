// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaFileExport } from 'react-icons/fa'; // Import icons from react-icons
import ProductListItem from './ProductListItem'; // Import the new component

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('/api/v1/inventory/list'); // Update API endpoint
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch products from inventory. Please try again later.');
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    useEffect(() => {
        // Filter products based on the filter input
        if (filter) {
            const lowercasedFilter = filter.toLowerCase();
            const filtered = products.filter(product => {
                const year = (product.productId?.year ?? '').toString();
                const make = (product.productId?.make ?? '').toString();
                const model = (product.productId?.model ?? '').toString();
                const carPart = (product.productId?.carPart ?? '').toString();
                const status =(product?.status ?? '').toString();

                return year.toLowerCase().includes(lowercasedFilter) ||
                       make.toLowerCase().includes(lowercasedFilter) ||
                       model.toLowerCase().includes(lowercasedFilter) ||
                       carPart.toLowerCase().includes(lowercasedFilter)||
                       status.toLowerCase().includes(lowercasedFilter);
            });

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [filter, products]);

    const handleSave = async (updatedProduct) => {
        try {
            console.log("Hello from save actions");
            console.log(updatedProduct);
            await axios.put(`/api/v1/inventory/${updatedProduct._id}`, updatedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
        } catch (error) {
            console.error(error);
            setError('Failed to save product details.');
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`/api/v1/inventory/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete product. Please try again.');
        }
    };

    const handleExport = () => {
        const csvContent = [
            ['ID', 'Year', 'Make', 'Model', 'Part', 'Variant', 'Specification', 'Quantity', 'Status'],
            ...filteredProducts.map(product => [
                product._id,
                product.productId?.year || 'N/A',
                product.productId?.make || 'N/A',
                product.productId?.model || 'N/A',
                product.productId?.carPart || 'N/A',
                product.productId?.variant || 'N/A',
                product.productId?.specification || 'N/A',
                product.quantity || 'N/A',
                product.status || 'Unknown'
            ])
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'product_list.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="w-full text-2xl flex flex-col font-semibold text-left">
                    <span>Product List</span>
                    <span className='text-xs text-gray-500'>Total Products Available - {filteredProducts.length}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Filter by Make, Model, or Part"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <FaFilter className="absolute right-2 top-2 text-gray-500" />
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center p-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
                        title="Export to CSV"
                    >
                        <FaFileExport className="mr-2 h-5 w-5" />
                        Export
                    </button>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-t-lg">
                <div className="grid grid-cols-10 text-gray-600 font-semibold">
                    <div>No.</div>
                    <div>Year</div>
                    <div>Make</div>
                    <div>Model</div>
                    <div>Part</div>
                    <div>Variant</div>
                    <div>Specification</div>
                    <div>Quantity</div>
                    <div>Status</div>
                    <div>Actions</div> {/* New column for actions */}
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    </svg>
                    <p className="text-indigo-500 mt-2">Loading products...</p>
                </div>
            ) : error ? (
                <div className="text-red-600 text-center">{error}</div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {filteredProducts.map((product, index) => (
                        <ProductListItem
                            key={product._id}
                            product={product}
                            index={index}
                            onSave={handleSave}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
