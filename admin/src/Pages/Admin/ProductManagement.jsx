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
      {showForm && (
        <AddProductForm onAddProduct={handleAddProduct} />
      )}
      <main className="w-full flex flex-col">
        <div className='w-full flex gap-4'>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1">
          <ProductList 
              setShowForm={setShowForm}
              showForm={showForm}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
