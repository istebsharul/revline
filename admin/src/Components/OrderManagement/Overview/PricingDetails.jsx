import React, { useEffect, useState } from 'react';

const PricingDetails = ({ pricingDetails = {}, isEditing, setOrderDetails }) => {
  const [localPricingDetails, setLocalPricingDetails] = useState(pricingDetails);

  // Function to calculate gross profit
  const calculateGrossProfit = () => {
    const costPrice = (localPricingDetails.cost_price) || 0;
    const quotedPrice = (localPricingDetails.quoted_price) || 0;
    const shippingCost = (localPricingDetails.shipping_cost) || 0;
    console.log(costPrice,quotedPrice,shippingCost);
    return (quotedPrice - costPrice - shippingCost).toFixed(2); // Calculate and format to two decimal places
  };

  useEffect(() => {
    if (isEditing) {
      setOrderDetails((prev) => ({
        ...prev,
        pricing_details: {
          ...prev.pricing_details,
          gross_profit: calculateGrossProfit(),
        },
      }));
    }
  }, [localPricingDetails, isEditing, setOrderDetails]); // Now depends on localPricingDetails for real-time updates

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPricingDetails((prev) => {
      const updatedPricingDetails = {
        ...prev,
        [name]: value,
      };
      // Calculate gross profit after updating localPricingDetails
      if (name !== 'gross_profit') {
        const grossProfit = calculateGrossProfit(); // Calculate gross profit
        updatedPricingDetails.gross_profit = grossProfit; // Update gross profit

        // Update order details as well
        setOrderDetails((prev) => ({
          ...prev,
          pricing_details: {
            ...prev.pricing_details,
            [name]: value,
            gross_profit: grossProfit,
          },
        }));
      }

      return updatedPricingDetails; // Return updated state
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded-md mt-2">
      <h3 className="text-lg font-semibold mb-4">Pricing Details</h3>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p>Shipping Size:</p>
          {isEditing ? (
            <select
              name="shipping_size"
              value={localPricingDetails.shipping_size || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
            >
              <option value="">Select Shipping Size</option>
              <option value="Small, Light Parts">Small, Light Parts</option>
              <option value="Medium Parts">Medium Parts</option>
              <option value="Large, Heavy Parts">Large, Heavy Parts</option>
              <option value="Very Large Parts">Very Large Parts</option>
            </select>
          ) : (
            <p className="text-gray-600">{localPricingDetails.shipping_size || '--'}</p>
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
          <p className={`text-gray-600 ${localPricingDetails.gross_profit > 0 ? 'text-green-600': 'text-[#f6251a]'}`}>{localPricingDetails.gross_profit || '--'}</p>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;