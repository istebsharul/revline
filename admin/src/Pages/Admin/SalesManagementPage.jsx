// Pages/Admin/SalesManagementPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesManagementPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customer data', error));
  }, []);

  const handleSendQuotation = (customerId) => {
    // Implement send quotation logic
  };

  const handleSendInvoice = (customerId) => {
    // Implement PayPal integration here
  };

  return (
    <div className="sales-management">
      <h3>Customer Accounts</h3>
      <button>Add New Contact</button>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name}
            <button onClick={() => handleSendQuotation(customer.id)}>Send Quotation</button>
            <button onClick={() => handleSendInvoice(customer.id)}>Send Invoice</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesManagementPage;
