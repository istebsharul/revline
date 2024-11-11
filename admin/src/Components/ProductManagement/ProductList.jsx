import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaFilter, FaFileExport } from 'react-icons/fa';
import ProductListItem from './ProductListItem';
import ImportProducts from './importProduct';
import toast from 'react-hot-toast';
import ImportParts from './ImportParts';

const fetchInventory = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey; // Destructuring queryKey to get page and limit
    const { data } = await axios.get('/api/v1/inventory/list', { params: { page, limit } });
    return data;
};

const ProductList = ({ setShowForm, showForm }) => {
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const limit = 30;
    const queryClient = useQueryClient();
    // React Query to fetch products with stale time of 1 week (7 days)
    const { data, error, isLoading } = useQuery({
        queryKey: ['inventory', { page, limit }],
        queryFn: fetchInventory,
        staleTime: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        keepPreviousData: true, // Keeps previous data while fetching new data
    });

    const products = data?.inventories || [];
    const totalPages = data?.pagination?.totalPages || 1;
    const totalProducts = data?.pagination?.totalProducts || 0;
    const currentPage = data?.pagination?.currentPage || 1;

    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Filtering logic
    const filteredProducts = filter
        ? products.filter(product => {
            const lowercasedFilter = filter.toLowerCase();
            const year = (product.product?.year ?? '').toString();
            const make = (product.product?.make ?? '').toString();
            const model = (product.product?.model ?? '').toString();
            const carPart = (product.product?.carPart ?? '').toString();
            const status = (product?.status ?? '').toString();

            return year.toLowerCase().includes(lowercasedFilter) ||
                make.toLowerCase().includes(lowercasedFilter) ||
                model.toLowerCase().includes(lowercasedFilter) ||
                carPart.toLowerCase().includes(lowercasedFilter) ||
                status.toLowerCase().includes(lowercasedFilter);
        })
        : products;

    // Save and Delete handlers
    const handleSave = async (updatedProduct) => {
        try {
            const res = await axios.put(`/api/v1/inventory/${updatedProduct._id}`, updatedProduct);
            // Invalidate the 'inventory' query to trigger a refetch
            queryClient.invalidateQueries(['inventory']);
            toast.success('Successfully Updated');
            console.log("Successfully updated");
        } catch (error) {
            toast.error('Error updating! Please try again later');
            console.error('Failed to save product:', error);
        }
    };

    const handleDelete = async (productId) => {
        const confirmed = confirm("Are you sure you want to delete?");
        if (confirmed) {
            try {
                await axios.delete(`/api/v1/inventory/${productId}`);
                queryClient.invalidateQueries(['inventory']);
                toast.success("Deleted Successfully");
                // Refetch or update the product list using react-query methods
            } catch (error) {
                toast.error('Deletion Failed');
                console.error('Failed to delete product:', error);
            }
        }
    };

    const handleExport = () => {
        const csvContent = [
            ['ID', 'Year', 'Make', 'Model', 'Part', 'Variant', 'Transmission', 'Description', 'Grade', 'SKU', 'Price', 'Quantity', 'Status', 'Contact'],
            ...filteredProducts.map(product => [
                product._id,
                product.product.make || 'N/A',
                product.product.year || 'N/A',
                product.product.model || 'N/A',
                product.product.part || 'N/A',
                product.product.variant || 'N/A',
                product.product.transmission || 'N/A',
                product.product.description || 'N/A',
                product.product.sku || 'N/A',
                product.product.grade || 'N/A',
                product.product.price || 'N/A',
                product.quantity || 'N/A',
                product.status || 'N/A',
                product.product.contact || 'N/A'
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
        <div className="w-full mx-auto bg-white rounded-lg">
            <div className="w-full flex items-center justify-between mb-6">
                <h2 className="w-full text-2xl flex flex-col font-semibold text-left">
                    <span>Product List</span>
                    <span className='text-xs text-gray-500'>Total Products Available - {products.length} of {totalProducts}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
                    <ImportParts/>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="w-1/2 bg-blue-500 text-white p-2 rounded"
                    >
                        {showForm ? 'Cancel' : '+ New Product'}
                    </button>
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Filter by any field"
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
                    <ImportProducts />
                </div>
            </div>
            {isLoading ? (
                <div className="text-center">
                    <p className="text-indigo-500 mt-2">Loading products...</p>
                </div>
            ) : error ? (
                <div className="text-[#f6251a] text-center">Failed to fetch products. Please try again later.</div>
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
            <div className="flex flex-col justify-center items-center gap-4 mt-4">
                <span className="text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <div className='w-full flex justify-center items-center gap-2'>
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="w-1/6 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className="w-1/6 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;