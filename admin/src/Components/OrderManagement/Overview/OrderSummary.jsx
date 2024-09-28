import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const OrderSummary = ({ orderSummary = {}, isEditing, setOrderDetails }) => {
  const [parts, setParts] = useState([]);

  // Fetch parts from the API
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get(`/api/v1/form/parts`);
        setParts(response.data);
        console.log("Hello", response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchParts();
  }, []);

  const handleChange = (selectedOption, actionMeta) => {
    const part = parts.find(part => part.part_name === selectedOption.value);
    console.log(part);
    console.log(selectedOption);
    setOrderDetails((prev) => ({
      ...prev,
      order_summary: {
        ...prev.order_summary,
        [actionMeta.name]: selectedOption.value,
      },
      pricing_details:{
        ...prev.pricing_details,
        shipping_size:part.size,
        shipping_cost:part.shipping_cost,
      }
    }));
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="font-medium text-gray-500">Part Code:</p>
          <p className="text-gray-800">{orderSummary.part_code || '--'}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Year:</p>
          {isEditing ? (
            <input
              type="text"
              name="year"
              value={orderSummary.year || ''}
              onChange={(e) => handleChange({ value: e.target.value }, { name: 'year' })}
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
              onChange={(e) => handleChange({ value: e.target.value }, { name: 'make' })}
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
              onChange={(e) => handleChange({ value: e.target.value }, { name: 'model' })}
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
            <Select
              name="part_name"
              value={parts.find(part => part.part_name === orderSummary.part_name) ?
                { value: orderSummary.part_name, label: orderSummary.part_name }
                : null}  // Correctly assign the selected value
              onChange={handleChange}
              options={parts.map(part => ({ value: part.part_name, label: part.part_name }))}
              placeholder="Select part name"
              className="text-gray-800"
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
              onChange={(e) => handleChange({ value: e.target.value }, { name: 'variant' })}
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
              onChange={(e) => handleChange({ value: e.target.value }, { name: 'transmission' })}
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
