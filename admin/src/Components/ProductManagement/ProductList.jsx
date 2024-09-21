import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaFileExport, FaFileImport } from 'react-icons/fa';
import ProductListItem from './ProductListItem';
import ImportProducts from './importProduct';

const ProductList = ({ setShowForm, showForm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState('');
    const [currentPage, setCurrentPage ] = useState('');
    const pageSize = 30;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [totalPages, setTotalPages] = useState(1);

    const productsOnCurrentPage = currentPage < totalPages ? pageSize : totalProducts % pageSize || pageSize;


    useEffect(() => {
        console.log(products);
    })

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('/api/v1/inventory/list', { params: { page, limit } });
                console.log(response);
                setProducts(response.data.inventories);
                setFilteredProducts(response.data.inventories);
                setTotalPages(response.data.pagination.totalPages);
                setTotalProducts(response.data.pagination.totalProducts);
                setCurrentPage(response.data.pagination.currentPage);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch products from inventory. Please try again later.');
                console.log('Failed to fetch Products');
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [page, limit]);

    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        if (filter) {
            const lowercasedFilter = filter.toLowerCase();
            const filtered = products.filter(product => {
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
            });

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [filter, products]);

    const handleSave = async (updatedProduct) => {
        try {
            await axios.put(`/api/v1/inventory/${updatedProduct._id}`, updatedProduct);
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
        } catch (error) {
            console.error(error);
            setError('Failed to save product details.');
        }
    };

    const handleDelete = async (productId) => {
        const confirmed = confirm("Are you sure you want to delete?");

        if (confirmed) {
            try {
                await axios.delete(`/api/v1/inventory/${productId}`);
                setProducts(products.filter(product => product._id !== productId));
            } catch (error) {
                console.error(error);
                setError('Failed to delete product. Please try again.');
            }
        } else {
            console.log('Delete action canceled');
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
                    <span className='text-xs text-gray-500'>Total Products Available -  {productsOnCurrentPage} of {totalProducts}</span>
                </h2>
                <div className="w-full flex justify-evenly items-center space-x-4">
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
            <div className="bg-gray-100 p-2 rounded-t-lg">
                <div className="grid grid-cols-15 text-gray-600 font-semibold">
                    <div>No.</div>
                    <div>Year</div>
                    <div>Make</div>
                    <div>Model</div>
                    <div>Part</div>
                    <div>Variant</div>
                    <div>Transmission</div>
                    <div>Description</div>
                    <div>Grade</div>
                    <div>SKU</div>
                    <div>Price</div>
                    <div>Quanity</div>
                    <div>Status</div>
                    <div>Contact</div>
                    <div>Actions</div>
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
                    </button></div>
            </div>
        </div>
    );
};

export default ProductList;
