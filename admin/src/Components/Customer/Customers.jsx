import React from 'react';
import { useEffect,useState } from 'react';
import CustomerList from '../CustomerManagement/CustomerList';
import AddCustomerForm from '../CustomerManagement/AddCustomerForm';
import axios from 'axios';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/v1/customer/list');
                const data = response.data;  // Axios provides the data directly in response.data
                console.log(data);
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
    

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setFilteredCustomers([...customers, newCustomer]);
        setShowForm(false); // Hide the form after adding
    };
    return (
        <div>
            <main className="w-full mx-auto flex flex-col">
                {loading && <div className="p-4 bg-gray-100 text-gray-800">Loading...</div>}
                {error && <div className="p-4 bg-red-100 text-red-800">{error}</div>}
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-full bg-white shadow-md rounded-lg p-4">
                        <CustomerList customers={filteredCustomers} setCustomers={setCustomers} />
                    </div>
                </div>

                {showForm && (
                    <AddCustomerForm onSubmit={handleAddCustomer} />
                )}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="w-1/6 bg-blue-500 text-white p-2 rounded m-4"
                >
                    {showForm ? 'Cancel' : 'Add New Customer'}
                </button>
            </main>
        </div>
    )
}

export default Customers