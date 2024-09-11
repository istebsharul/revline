import React from 'react';

const OrderSummary = ({ orderSummary = {}, isEditing, setOrderDetails }) => {
  const handleChange = (e) => {
    setOrderDetails((prev) => ({
      ...prev,
      order_summary: {
        ...prev.order_summary,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="font-medium text-gray-500">Part Code:</p>
          {isEditing ? (
            <input
              type="text"
              name="part_code"
              value={orderSummary.part_code || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter part code"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.part_code || '--'}</p>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-500">Year:</p>
          {isEditing ? (
            <input
              type="text"
              name="year"
              value={orderSummary.year || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter year"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.year || '--'}</p>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-500">Make:</p>
          {isEditing ? (
            <input
              type="text"
              name="make"
              value={orderSummary.make || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter make"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.make || '--'}</p>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-500">Model:</p>
          {isEditing ? (
            <input
              type="text"
              name="model"
              value={orderSummary.model || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter model"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.model || '--'}</p>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-500">Part Name:</p>
          {isEditing ? (
            <input
              type="text"
              name="part_name"
              value={orderSummary.part_name || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter part name"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.part_name || '--'}</p>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-500">Variant:</p>
          {isEditing ? (
            <input
              type="text"
              name="variant"
              value={orderSummary.variant || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter variant"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.variant || '--'}</p>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-500">Transmission:</p>
          {isEditing ? (
            <input
              type="text"
              name="transmission"
              value={orderSummary.transmission || ''}
              onChange={handleChange}
              className="text-gray-800 border border-gray-300 rounded p-1"
              placeholder="Enter transmission"
            />
          ) : (
            <p className="text-gray-800">{orderSummary.transmission || '--'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
