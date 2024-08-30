import React from 'react';

// Function to convert data to CSV format
const convertToCSV = (data) => {
    const header = ['ID', 'Name', 'Email', 'Phone', 'Location', 'Total Spent', 'Order IDs', 'Order Products'];
  
    const rows = data.map(customer => {
      // Convert orders to a comma-separated list of order IDs and products
      const orderIds = customer.orders.map(order => order.id).join(';');
      const orderProducts = customer.orders.map(order => order.product.name).join(';');
      
      return [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.location,
        customer.totalSpent,
        orderIds,
        orderProducts
      ];
    });
  
    return [header, ...rows].map(row => row.join(',')).join('\n');
  };
  

// Function to download CSV file
const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const CustomerList = ({ customers, onSelectCustomer }) => {
  const handleExport = () => {
    const csvContent = convertToCSV(customers);
    downloadCSV(csvContent, 'customers.csv');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer List</h2>
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Export List
        </button>
      </div>
      <ul className="space-y-1">
        {customers.map((customer, index) => (
          <li
            key={customer.id}
            className="px-2 cursor-pointer hover:rounded-lg hover:bg-gray-100"
            onClick={() => onSelectCustomer(customer)}
          >
            <h3 className="text-md font-light">{index + 1}. {customer.name}</h3>
            {/* Removed location display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
