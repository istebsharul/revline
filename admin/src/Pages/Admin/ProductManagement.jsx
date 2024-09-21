// src/pages/ProductManagement.js

import React, { useState, useEffect } from 'react';
import ProductList from '../../Components/ProductManagement/ProductList';
import AddProductForm from '../../Components/ProductManagement/AddProduct';

const ProductManagement = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

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
      <main className="w-full p-4 flex flex-col">
        <div className='w-full flex gap-4'>
          <div className="bg-white shadow-md rounded-lg p-2 flex-1">
            <ProductList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
