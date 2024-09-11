import React, { useEffect, useState } from 'react';

const PricingDetails = ({ pricingDetails = {}, isEditing, setOrderDetails }) => {
  const [localPricingDetails, setLocalPricingDetails] = useState(pricingDetails);

  useEffect(() => {
    // Recalculate Gross Profit whenever Cost Price or Quoted Price changes
    const calculateGrossProfit = () => {
      const costPrice = parseFloat(localPricingDetails.cost_price) || 0;
      const quotedPrice = parseFloat(localPricingDetails.quoted_price) || 0;
      return (quotedPrice - costPrice).toFixed(2); // Calculate and format to two decimal places
    };

    if (isEditing) {
      setOrderDetails((prev) => ({
        ...prev,
        pricing_details: {
          ...prev.pricing_details,
          gross_profit: calculateGrossProfit(),
        },
      }));
    }
  }, [localPricingDetails.cost_price, localPricingDetails.quoted_price, isEditing, setOrderDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPricingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name !== 'gross_profit' && isEditing) {
      setOrderDetails((prev) => ({
        ...prev,
        pricing_details: {
          ...prev.pricing_details,
          [name]: value,
        },
      }));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Pricing Details</h3>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p>Shipping Type:</p>
          {isEditing ? (
            <select
              name="shipping_type"
              value={localPricingDetails.shipping_type || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
            >
              <option value="">Select Shipping Type</option>
              <option value="Small, Light Parts">Small, Light Parts</option>
              <option value="Medium Parts">Medium Parts</option>
              <option value="Large, Heavy Parts">Large, Heavy Parts</option>
              <option value="Very Large Parts">Very Large Parts</option>
            </select>
          ) : (
            <p className="text-gray-600">{localPricingDetails.shipping_type || '--'}</p>
          )}
        </div>
        <div>
          <p>Shipping Cost:</p>
          {isEditing ? (
            <input
              type="text"
              name="shipping_cost"
              value={localPricingDetails.shipping_cost || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter shipping cost"
            />
          ) : (
            <p className="text-gray-600">{localPricingDetails.shipping_cost || '--'}</p>
          )}
        </div>
        <div>
          <p>Shipping Speed:</p>
          {isEditing ? (
            <select
              name="shipping_speed"
              value={localPricingDetails.shipping_speed || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
            >
              <option value="">Select Shipping Speed</option>
              <option value="Expedite">Expedite</option>
              <option value="Standard">Standard</option>
            </select>
          ) : (
            <p className="text-gray-600">{localPricingDetails.shipping_speed || '--'}</p>
          )}
        </div>
        <div>
          <p>Surcharge:</p>
          {isEditing ? (
            <input
              type="text"
              name="surcharge"
              value={localPricingDetails.surcharge || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter surcharge"
            />
          ) : (
            <p className="text-gray-600">{localPricingDetails.surcharge || '--'}</p>
          )}
        </div>
        <div>
          <p>Cost Price:</p>
          {isEditing ? (
            <input
              type="text"
              name="cost_price"
              value={localPricingDetails.cost_price || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter cost price"
            />
          ) : (
            <p className="text-gray-600">{localPricingDetails.cost_price || '--'}</p>
          )}
        </div>
        <div>
          <p>Quoted Price:</p>
          {isEditing ? (
            <input
              type="text"
              name="quoted_price"
              value={localPricingDetails.quoted_price || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter quoted price"
            />
          ) : (
            <p className="text-gray-600">{localPricingDetails.quoted_price || '--'}</p>
          )}
        </div>
        <div>
          <p>Gross Profit:</p>
          <p className="text-gray-600">{localPricingDetails.gross_profit || '--'}</p>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
