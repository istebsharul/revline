import React, { useEffect, useState } from 'react';

const ShippingDetails = ({ shippingDetails = {}, isEditing, setOrderDetails }) => {
  // Initialize local state from shippingDetails
  const [customerName, setCustomerName] = useState(shippingDetails.customer_name || shippingDetails.customer?.name || '');
  const [customerEmail, setCustomerEmail] = useState(shippingDetails.customer_email || shippingDetails.customer?.email || '');
  const [customerPhone, setCustomerPhone] = useState(shippingDetails.customer_phone || shippingDetails.customer?.phone || '');
  const [zipcode, setZipcode] = useState(shippingDetails.zipcode || shippingDetails.customer?.zipcode || '');
  const [city, setCity] = useState(shippingDetails.city || '');
  const [state, setState] = useState(shippingDetails.state_or_region || '');

  const fetchCityAndState = async (zipcode) => {
    if (!zipcode) return { city: '', state: '' };
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
      const data = await response.json();
      if (data && data.places && data.places.length > 0) {
        return {
          city: data.places[0]['place name'],
          state: data.places[0]['state abbreviation']
        };
      }
    } catch (error) {
      console.error('Error fetching city and state:', error);
    }
    return { city: '', state: '' };
  };

  useEffect(() => {
    if (zipcode.length === 5) {
      const updateLocation = async () => {
        const { city, state } = await fetchCityAndState(zipcode);
        setCity(city);
        setState(state);
        // Update global state
        setOrderDetails(prev => ({
          ...prev,
          shipping_details: {
            ...prev.shipping_details,
            city,
            state_or_region: state,
            zipcode
          }
        }));
      };
      updateLocation();
    }
  }, [zipcode, setOrderDetails]);

  useEffect(() => {
    // Initialize local state when shippingDetails changes
    setCustomerName(shippingDetails.customer_name || shippingDetails.customer?.name || '');
    setCustomerEmail(shippingDetails.customer_email || shippingDetails.customer?.email || '');
    setCustomerPhone(shippingDetails.customer_phone || shippingDetails.customer?.phone || '');
    setZipcode(shippingDetails.zipcode || shippingDetails.customer?.zipcode || '');
    setCity(shippingDetails.city || '');
    setState(shippingDetails.state_or_region || '');
  }, [shippingDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update local state based on input field name
    switch (name) {
      case 'customer_name':
        setCustomerName(value);
        break;
      case 'customer_email':
        setCustomerEmail(value);
        break;
      case 'customer_phone':
        setCustomerPhone(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      default:
        break;
    }

    // Update parent state via setOrderDetails
    setOrderDetails(prev => ({
      ...prev,
      shipping_details: {
        ...prev.shipping_details,
        [name]: value,
        ...(name === 'zipcode' ? { city: city, state_or_region: state } : {})
      }
    }));
  };

  const renderInputOrText = (label, name, value, type = 'text', placeholder = '') => (
    <div>
      <p>{label}:</p>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="text-gray-600 border border-gray-300 rounded p-1"
          placeholder={placeholder}
        />
      ) : (
        <p className="text-gray-600">{value || '--'}</p>
      )}
    </div>
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Customer Details */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {renderInputOrText('Name', 'customer_name', customerName, 'text', 'Enter customer name')}
            {renderInputOrText('Email', 'customer_email', customerEmail, 'email', 'Enter customer email')}
            {renderInputOrText('Phone', 'customer_phone', customerPhone, 'text', 'Enter customer phone')}
            {renderInputOrText('Zipcode', 'zipcode', zipcode, 'text', 'Enter customer zipcode')}
          </div>
        </div>

        {/* Address Details */}
        {renderInputOrText('Address Line 1', 'address_line_1', shippingDetails.address_line_1, 'text', 'Enter address line 1')}
        {renderInputOrText('Address Line 2', 'address_line_2', shippingDetails.address_line_2, 'text', 'Enter address line 2')}
        {renderInputOrText('City', 'city', city, 'text', 'Enter city')}
        {renderInputOrText('State/Region', 'state_or_region', state, 'text', 'Enter state/region')}
        {renderInputOrText('Country/Region', 'country_or_region', shippingDetails.country_or_region || 'USA', 'text', 'Enter country/region')}
        {renderInputOrText('Secondary Phone Number', 'secondary_phone_number', shippingDetails.secondary_phone_number, 'text', 'Enter secondary phone number')}
      </div>
    </div>
  );
};

export default ShippingDetails;


// import React, { useEffect, useState } from 'react';

// const ShippingDetails = ({ shippingDetails = {}, isEditing, setOrderDetails }) => {
//   // Initialize local state from shippingDetails
//   const [customerName, setCustomerName] = useState(shippingDetails.customer_name || shippingDetails.customer.name);
//   const [customerEmail, setCustomerEmail] = useState(shippingDetails.customer_email || shippingDetails.customer.email);
//   const [customerPhone, setCustomerPhone] = useState(shippingDetails.customer_phone || shippingDetails.customer.phone);
//   const [zipcode, setZipcode] = useState(shippingDetails.zipcode || shippingDetails.customer.zipcode);
//   const [city, setCity] = useState(shippingDetails.city || '');
//   const [state, setState] = useState(shippingDetails.state_or_region || '');

//   const fetchCityAndState = async (zipcode) => {
//     if (!zipcode) return { city: '', state: '' }; // Early return for invalid zipcodes
//     try {
//       const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
//       const data = await response.json();
//       if (data && data.places && data.places.length > 0) {
//         return {
//           city: data.places[0]['place name'],
//           state: data.places[0]['state abbreviation']
//         };
//       }
//     } catch (error) {
//       console.error('Error fetching city and state:', error);
//     }
//     return { city: '', state: '' };
//   };

//   useEffect(() => {
//     if (zipcode) {
//       const updateLocation = async () => {
//         const { city, state } = await fetchCityAndState(zipcode);
//         setCity(city);
//         setState(state);
//         setOrderDetails(prev => ({
//           ...prev,
//           shipping_details: {
//             ...prev.shipping_details,
//             city,
//             state_or_region: state
//           }
//         }));
//       };
//       updateLocation();
//     }
//   }, [zipcode, setOrderDetails]);

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     // Update local state based on input field name
//     switch (name) {
//       case 'customer_name':
//         setCustomerName(value);
//         break;
//       case 'customer_email':
//         setCustomerEmail(value);
//         break;
//       case 'customer_phone':
//         setCustomerPhone(value);
//         break;
//       case 'zipcode':
//         setZipcode(value);
//         break;
//       default:
//         break;
//     }

//     // Update parent state via setOrderDetails
//     setOrderDetails(prev => ({
//       ...prev,
//       shipping_details: {
//         ...prev.shipping_details,
//         [name]: value,
//         ...(name === 'zipcode' ? { city: city, state_or_region: state } : {})
//       }
//     }));
//   };

//   const renderInputOrText = (label, name, value, type = 'text', placeholder = '') => (
//     <div>
//       <p>{label}:</p>
//       {isEditing ? (
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={handleChange}
//           className="text-gray-600 border border-gray-300 rounded p-1"
//           placeholder={placeholder}
//         />
//       ) : (
//         <p className="text-gray-600">{value || '--'}</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-4 bg-white shadow rounded-md">
//       <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
//       <div className="grid grid-cols-2 gap-4">
//         {/* Customer Details */}
//         <div className="col-span-2">
//           <div className="grid grid-cols-2 gap-4">
//             {renderInputOrText('Name', 'customer_name', customerName, 'text', 'Enter customer name')}
//             {renderInputOrText('Email', 'customer_email', customerEmail, 'email', 'Enter customer email')}
//             {renderInputOrText('Phone', 'customer_phone', customerPhone, 'text', 'Enter customer phone')}
//             {renderInputOrText('Zipcode', 'zipcode', zipcode, 'text', 'Enter customer zipcode')}
//           </div>
//         </div>

//         {/* Address Details */}
//         {renderInputOrText('Address Line 1', 'address_line_1', shippingDetails.address_line_1, 'text', 'Enter address line 1')}
//         {renderInputOrText('Address Line 2', 'address_line_2', shippingDetails.address_line_2, 'text', 'Enter address line 2')}
//         {renderInputOrText('City', 'city', city, 'text', 'Enter city')}
//         {renderInputOrText('State/Region', 'state_or_region', state, 'text', 'Enter state/region')}
//         {renderInputOrText('Country/Region', 'country_or_region', shippingDetails.country_or_region || 'USA', 'text', 'Enter country/region')}
//         {renderInputOrText('Secondary Phone Number', 'secondary_phone_number', shippingDetails.secondary_phone_number, 'text', 'Enter secondary phone number')}
//       </div>
//     </div>
//   );
// };

// export default ShippingDetails;
