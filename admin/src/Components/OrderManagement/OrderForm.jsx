import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ onSubmit, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [error, setError] = useState(null);

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const orderData = { customerName, items };
      const response = await axios.post('/api/v1/order/create', orderData);
      // Assuming the response contains the order ID
      const orderId = response.data.orderId;
      // Proceed to create a quotation and invoice
      onSubmit(orderId);
    } catch (error) {
      setError('Failed to create order');
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            {items.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={item.name}
                  placeholder="Item Name"
                  onChange={(e) =>
                    setItems(items.map((i, idx) => (idx === index ? { ...i, name: e.target.value } : i)))
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                  required
                />
                <input
                  type="number"
                  value={item.quantity}
                  placeholder="Quantity"
                  onChange={(e) =>
                    setItems(items.map((i, idx) => (idx === index ? { ...i, quantity: parseInt(e.target.value, 10) } : i)))
                  }
                  className="w-24 border border-gray-300 rounded-lg p-2"
                  required
                />
                <input
                  type="number"
                  value={item.price}
                  placeholder="Price"
                  onChange={(e) =>
                    setItems(items.map((i, idx) => (idx === index ? { ...i, price: parseFloat(e.target.value) } : i)))
                  }
                  className="w-24 border border-gray-300 rounded-lg p-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Create Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
