// src/Components/CustomerManagement/CustomerDetailForm.js

import React, { useState } from 'react';

const AddCustomerForm = ({ onSubmit, customer }) => {
  const [name, setName] = useState(customer ? customer.name : '');
  const [email, setEmail] = useState(customer ? customer.email : '');
  const [phone, setPhone] = useState(customer ? customer.phone : '');
  const [location, setLocation] = useState(customer ? customer.location : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') { // Check if onSubmit is a function
      const updatedCustomer = {
        id: customer ? customer.id : Date.now(), // Ensure unique ID
        name,
        email,
        phone,
        location,
      };
      onSubmit(updatedCustomer);
    } else {
      console.error('onSubmit is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">{customer ? 'Edit Customer' : 'Add Customer'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {customer ? 'Update' : 'Add'} Customer
      </button>
    </form>
  );
};

export default AddCustomerForm;
