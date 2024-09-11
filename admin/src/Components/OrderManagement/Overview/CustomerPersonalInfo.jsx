import React from 'react';

const CustomerPersonalInfo = ({ customer = {}, isEditing, setOrderDetails }) => {
  const handleChange = (e) => {
    setOrderDetails((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // Format the createdAt date if it exists
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Customer Personal Info</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p>Customer Name</p>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={customer.name || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter name"
            />
          ) : (
            <p className="text-gray-600">{customer.name || '--'}</p>
          )}
        </div>
        <div>
          <p>Customer Email</p>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={customer.email || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter email"
            />
          ) : (
            <p className="text-gray-600">{customer.email || '--'}</p>
          )}
        </div>
        <div>
          <p>Customer Phone</p>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={customer.phone || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter phone"
            />
          ) : (
            <p className="text-gray-600">{customer.phone || '--'}</p>
          )}
        </div>
        <div>
          <p>Zip Code</p>
          {isEditing ? (
            <input
              type="text"
              name="zipcode"
              value={customer.zipcode || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter zip code"
            />
          ) : (
            <p className="text-gray-600">{customer.zipcode || '--'}</p>
          )}
        </div>
        <div>
          <p>Requested Date</p>
          {isEditing ? (
            <input
              type="text"
              name="createdAt"
              value={customer.createdAt ? formatDate(customer.createdAt) : ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter creation date"
            />
          ) : (
            <p className="text-gray-600">{customer.createdAt ? formatDate(customer.createdAt) : '--'}</p>
          )}
        </div>
        <div>
          <p>Quote Number</p>
          {isEditing ? (
            <input
              type="text"
              name="__v"
              value={customer.__v || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter Quote"
            />
          ) : (
            <p className="text-gray-600">{customer.__v || '--'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPersonalInfo;
