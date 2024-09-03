// src/pages/ProductManagement.js

import React, { useState, useEffect } from 'react';
import ProductList from '../../Components/ProductManagement/ProductList';
import AddProductForm from '../../Components/ProductManagement/AddProduct';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/v1/products/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setFilteredProducts([...products, newProduct]);
    setShowForm(false); // Hide the form after adding
  };

  return (
    <div className="w-full flex flex-col justify-start items-center min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-md mb-4">
        <div className="w-full container mx-auto py-4 px-6 flex flex-col items-center">
          <h1 className="w-full text-3xl font-semibold text-left text-gray-800">Inventory Management</h1>
        </div>
      </header>
      {showForm && (
          <AddProductForm onAddProduct={handleAddProduct} />
        )}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-1/6 bg-blue-500 text-white p-2 rounded mb-4"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      <main className="container mx-auto flex flex-col gap-6 px-6">
        {loading && <div className="p-4 bg-gray-100 text-gray-800">Loading...</div>}
        {error && <div className="p-4 bg-red-100 text-red-800">{error}</div>}
        <div className='flex gap-4'>
          <div className="bg-white shadow-md rounded-lg p-2 flex-1">
            <ProductList products={filteredProducts} onSelectProduct={handleProductSelect} />
          </div>
        </div>
        
        
      </main>
    </div>
  );
};

export default ProductManagement;
