import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const OrderSummary = ({ orderSummary = {}, pricingDetails = {}, isEditing, setOrderDetails }) => {
    const [parts, setParts] = useState([]);

    // Function to calculate gross profit
    const calculateGrossProfit = (costPrice, quotedPrice, shippingCost) => {
        // Ensure all inputs are valid numbers
        const cost = Number(costPrice) || 0;
        const quoted = Number(quotedPrice) || 0;
        const shipping = Number(shippingCost) || 0;
    
        // Calculate and format to two decimal places, ensuring the result is a number
        return parseFloat((quoted - cost - shipping).toFixed(2));
    };
    

    // Handle fetch only on focus
    const handlePartsFocus = async () => {
        if (parts.length === 0) { // Fetch only if parts haven't been fetched yet
            try {
                const response = await axios.get(`https://server.revlineautoparts.com/api/v1/form/parts`);
                setParts(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChange = (input, actionMeta) => {
        // Check if input is a selected option (for the Select component)
        if (actionMeta) {
            const part = parts.find(part => part.part_name === input.value);
            // Update order details for selected part, including shipping size and shipping cost
            setOrderDetails((prev) => ({
                ...prev,
                order_summary: {
                    ...prev.order_summary,
                    [actionMeta.name]: input.value,
                },
                pricing_details: {
                    ...prev.pricing_details,
                    shipping_size: part?.size,          // Automatically set shipping size based on selected part
                    shipping_cost: part?.shipping_cost, // Automatically set shipping cost based on selected part
                    // Recalculate gross profit on part selection
                    gross_profit: calculateGrossProfit(
                        pricingDetails.cost_price || 0,
                        pricingDetails.quoted_price || 0,
                        part?.shipping_cost
                    ),
                }
            }));
        } else {
            // Handle regular input changes
            const { name, value } = input.target;
            setOrderDetails((prev) => {
                const updatedPricingDetails = {
                    ...prev.pricing_details,
                    [name]: value,
                };

                // Calculate gross profit after updating pricing details
                if (name !== 'gross_profit') {
                    updatedPricingDetails.gross_profit = calculateGrossProfit(
                        updatedPricingDetails.cost_price || 0,
                        updatedPricingDetails.quoted_price || 0,
                        updatedPricingDetails.shipping_cost || 0
                    ); // Calculate gross profit
                }

                // const 
                return {
                    ...prev,
                    pricing_details: updatedPricingDetails,
                    order_summary: {
                        ...prev.order_summary,
                        [name]: value,
                    }
                };
            });
        }
    };

    return (
        <div>
            <div className="p-4 bg-white shadow rounded-md">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="font-medium text-gray-500">Tracking Link:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="part_code"
                                value={orderSummary?.part_code || ''}
                                onChange={handleChange}
                                className="w-full text-gray-800 border border-gray-300 rounded p-1"
                                placeholder="Enter Tracking Link"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.part_code || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Year:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="year"
                                value={orderSummary?.year || ''}
                                onChange={handleChange}
                                className="text-gray-800 border border-gray-300 rounded p-1"
                                placeholder="Enter year"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.year || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Make:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="make"
                                value={orderSummary?.make || ''}
                                onChange={handleChange}
                                className="text-gray-800 border border-gray-300 rounded p-1"
                                placeholder="Enter make"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.make || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Model:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="model"
                                value={orderSummary?.model || ''}
                                onChange={handleChange}
                                className="text-gray-800 border border-gray-300 rounded p-1"
                                placeholder="Enter model"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.model || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Part Name:</p>
                        {isEditing ? (
                            <Select
                                name="part_name"
                                value={parts.find(part => part?.part_name === orderSummary?.part_name) ?
                                    { value: orderSummary?.part_name, label: orderSummary?.part_name }
                                    : null}
                                onChange={handleChange}
                                onFocus={handlePartsFocus} // Trigger fetching parts on focus
                                options={parts.map(part => ({ value: part.part_name, label: part.part_name }))}
                                placeholder="Select part name"
                                className="text-gray-800"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.part_name || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Variant:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="variant"
                                value={orderSummary?.variant || ''}
                                onChange={handleChange}
                                className="text-gray-800 border border-gray-300 rounded p-1"
                                placeholder="Enter variant"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.variant || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Transmission:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="transmission"
                                value={orderSummary?.transmission || ''}
                                onChange={handleChange}
                                className="text-gray-800 border border-gray-300 rounded p-1"
                                placeholder="Enter transmission"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.transmission || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-500">Variant 2:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="variant2"
                                value={orderSummary?.variant2 || ''}
                                // onChange={(e) => handleChange({ value: e.target.value }, { name: 'variant2' })}
                                onChange={handleChange}
                                className="text-gray-800 border border-gray-300 rounded p-1 break-words"
                                placeholder="Enter variant 2"
                            />
                        ) : (
                            <p className="text-gray-800">{orderSummary?.variant2 || '--'}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white shadow rounded-md mt-2">
                <h3 className="text-lg font-semibold mb-4">Pricing Details</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p>Shipping Size:</p>
                        <p className="text-gray-600">{pricingDetails?.shipping_size || '--'}</p>
                    </div>
                    <div>
                        <p>Shipping Cost:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="shipping_cost"
                                value={pricingDetails?.shipping_cost || ''}
                                onChange={handleChange}
                                className="text-gray-600 border border-gray-300 rounded p-1"
                                placeholder="Enter shipping cost"
                            />
                        ) : (
                            <p className="text-gray-600">{pricingDetails?.shipping_cost || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p>Shipping Speed:</p>
                        {isEditing ? (
                            <select
                                name="shipping_speed"
                                value={pricingDetails?.shipping_speed || ''}
                                onChange={handleChange}
                                className="text-gray-600 border border-gray-300 rounded p-1"
                            >
                                <option value="Standard">Standard</option>
                                <option value="Express">Express</option>
                            </select>
                        ) : (
                            <p className="text-gray-600">{pricingDetails?.shipping_speed || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p>Gross Profit:</p>
                        <p className={`text-gray-600 ${pricingDetails.gross_profit > 0 ? 'text-green-600': 'text-[#f6251a]'}`}>{pricingDetails?.gross_profit || '--'}</p>
                    </div>
                    <div>
                        <p>Cost Price:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="cost_price"
                                value={pricingDetails?.cost_price || ''}
                                onChange={handleChange}
                                className="text-gray-600 border border-gray-300 rounded p-1"
                                placeholder="Enter cost price"
                            />
                        ) : (
                            <p className="text-gray-600">{pricingDetails?.cost_price || '--'}</p>
                        )}
                    </div>
                    <div>
                        <p>Quoted Price:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="quoted_price"
                                value={pricingDetails?.quoted_price || ''}
                                onChange={handleChange}
                                className="text-gray-600 border border-gray-300 rounded p-1"
                                placeholder="Enter quoted price"
                            />
                        ) : (
                            <p className="text-gray-600">{pricingDetails?.quoted_price || '--'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OrderSummary;