import React, { useState } from 'react';

const BillingDetails = ({ billingDetails = {}, isEditing, setOrderDetails }) => {
  const [localDetails, setLocalDetails] = useState(billingDetails);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate credit card number to be exactly 16 digits
    if (name === 'credit_card_number') {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          credit_card_number: 'Credit card number must contain only digits',
        }));
      } else if (value.length !== 16) {
        setErrors((prev) => ({
          ...prev,
          credit_card_number: 'Credit card number must be exactly 16 digits long',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          credit_card_number: '',
        }));
      }
    }

    // Validate CVV to be either 3 or 4 digits
    if (name === 'cvv') {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          cvv: 'CVV must contain only digits',
        }));
      } else if (value.length !== 3 && value.length !== 4) {
        setErrors((prev) => ({
          ...prev,
          cvv: 'CVV must be either 3 or 4 digits long',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          cvv: '',
        }));
      }
    }

    setLocalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setOrderDetails((prev) => ({
      ...prev,
      billing_details: {
        ...prev.billing_details,
        [name]: value,
      },
    }));
  };

  // Generate month options
  const months = [
    "01 - January", "02 - February", "03 - March", "04 - April",
    "05 - May", "06 - June", "07 - July", "08 - August",
    "09 - September", "10 - October", "11 - November", "12 - December"
  ];

  // Generate year options from 2024 to 2050
  const years = Array.from({ length: 27 }, (_, i) => 2024 + i);

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Billing Details</h3>
      <div className="grid grid-cols-4 gap-4">
        {/* Credit Card Details */}
        <div>
          <p>Credit Card Type:</p>
          {isEditing ? (
            <input
              type="text"
              name="credit_card_type"
              value={localDetails.credit_card_type || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter credit card type"
            />
          ) : (
            <p className="text-gray-600">{localDetails.credit_card_type || '--'}</p>
          )}
        </div>
        <div>
          <p>Card Holder Name:</p>
          {isEditing ? (
            <input
              type="text"
              name="card_holder_name"
              value={localDetails.card_holder_name || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter card holder name"
            />
          ) : (
            <p className="text-gray-600">{localDetails.card_holder_name || '--'}</p>
          )}
        </div>
        <div>
          <p>Credit Card Number:</p>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="credit_card_number"
                value={localDetails.credit_card_number || ''}
                onChange={handleChange}
                className="text-gray-600 border border-gray-300 rounded p-1"
                placeholder="Enter credit card number"
                maxLength="16" // Ensure input does not exceed 16 characters
              />
              {errors.credit_card_number && (
                <p className="text-red-500 text-sm mt-1">{errors.credit_card_number}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">{localDetails.credit_card_number || '--'}</p>
          )}
        </div>
        <div>
          <p>Card Expiry Month:</p>
          {isEditing ? (
            <select
              name="card_expiry_month"
              value={localDetails.card_expiry_month || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
            >
              <option value="">Select month</option>
              {months.map((month) => (
                <option key={month} value={month.split(' - ')[0]}>
                  {month}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-600">
              {localDetails.card_expiry_month ? `${months.find(m => m.startsWith(localDetails.card_expiry_month))}` : '--'}
            </p>
          )}
        </div>
        <div>
          <p>Card Expiry Year:</p>
          {isEditing ? (
            <select
              name="card_expiry_year"
              value={localDetails.card_expiry_year || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-600">{localDetails.card_expiry_year || '--'}</p>
          )}
        </div>
        <div>
          <p>CVV:</p>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="cvv"
                value={localDetails.cvv || ''}
                onChange={handleChange}
                className="text-gray-600 border border-gray-300 rounded p-1"
                placeholder="Enter CVV"
                maxLength="4" // CVV is typically 3 or 4 digits
              />{errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">{localDetails.cvv || '--'}</p>
          )}
        </div>

        {/* Billing Address Details */}
        <div>
          <p>Billing Company Name:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_company_name"
              value={localDetails.billing_company_name || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing company name"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_company_name || '--'}</p>
          )}
        </div>
        <div>
          <p>Billing Address Line 1:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_address_line_1"
              value={localDetails.billing_address_line_1 || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing address line 1"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_address_line_1 || '--'}</p>
          )}
        </div>
        <div>
          <p>Billing Address Line 2:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_address_line_2"
              value={localDetails.billing_address_line_2 || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing address line 2"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_address_line_2 || '--'}</p>
          )}
        </div>
        <div>
          <p>Billing City:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_city"
              value={localDetails.billing_city || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing city"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_city || '--'}</p>
          )}
        </div>
        <div>
          <p>Billing State/Region:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_state_or_region"
              value={localDetails.billing_state_or_region || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing state/region"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_state_or_region || '--'}</p>
          )}
        </div>
        <div>
          <p>Billing Zip Code:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_zip_code"
              value={localDetails.billing_zip_code || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing zip code"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_zip_code || '--'}</p>
          )}
        </div>
        <div>
          <p>Billing Country:</p>
          {isEditing ? (
            <input
              type="text"
              name="billing_country"
              value={localDetails.billing_country || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter billing country"
            />
          ) : (
            <p className="text-gray-600">{localDetails.billing_country || '--'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
