// src/pages/CustomerManagement.js

import React, { useState, useEffect } from 'react';
import CustomerList from '../../Components/CustomerManagement/CustomerList';
import CustomerDetails from '../../Components/CustomerManagement/CustomerDetails';
import SearchBar from '../../Components/CustomerManagement/SearchBar';
import FilterPanel from '../../Components/CustomerManagement/FilterPanel';
import AddCustomerForm from '../../Components/CustomerManagement/AddCustomerForm';
import CustomerDetailForm from '../../Components/CustomerManagement/AddCustomerForm';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/customerdata.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        setError('Failed to fetch customers');
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleFilter = (filters) => {
    const filtered = customers.filter(customer => {
      return (
        (filters.name ? customer.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
        (filters.location ? customer.location === filters.location : true)
      );
    });
    setFilteredCustomers(filtered);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
    setFilteredCustomers([...customers, newCustomer]);
    setShowForm(false); // Hide the form after adding
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomer);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-md mb-4">
        <div className="w-full container mx-auto py-4 px-6 flex flex-col items-center">
          <h1 className="w-full text-3xl font-semibold text-left text-gray-800">Customer Management</h1>
        </div>
      </header>
      <main className="container mx-auto flex flex-col gap-6 px-6">
        {loading && <div className="p-4 bg-gray-100 text-gray-800">Loading...</div>}
        {error && <div className="p-4 bg-red-100 text-red-800">{error}</div>}
        <div className="flex flex-col md:flex-row md:justify-between w-full mt-4">
          <SearchBar onSearch={(name) => handleFilter({ name })} />
          <FilterPanel onFilter={handleFilter} />
        </div>
        <div className='flex gap-4'>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1">
            <CustomerList customers={filteredCustomers} onSelectCustomer={handleCustomerSelect} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex-1">
            <CustomerDetailForm
              onSubmit={handleUpdateCustomer}
              customer={selectedCustomer}
            />
            <CustomerDetails customer={selectedCustomer} />
          </div>
        </div>
        
        {showForm && (
          <AddCustomerForm onAddCustomer={handleAddCustomer} />
        )}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-1/6 bg-blue-500 text-white p-2 rounded mb-4"
        >
          {showForm ? 'Cancel' : 'Add New Customer'}
        </button>
      </main>
    </div>
  );
};

export default CustomerManagement;