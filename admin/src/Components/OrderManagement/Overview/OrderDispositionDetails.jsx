import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const OrderDispositionDetails = ({ trackingLink, orderDispositionDetails = {}, isEditing, setOrderDetails, partDetails, customerDetails }) => {
  const [supplierEmail, setSupplierEmail] = useState('');
  // Define the admin status options
  const adminStatusOptions = [
    'Awaiting Supplier Confirmation',
    'Supplier Confirmed',
    'We Do Not Sell',
    'Already Bought'
  ];

  // Define the customer status options
  const customerStatusOptions = [
    'Pending Approval',
    'Approved',
    'Quotation Sent',
    'Awaiting Payment',
    'Payment Received',
    'Order Placed',
    'Order Processing',
    'Ready for Dispatch',
    'Shipped',
    'In Transit',
    'Delivered',
    'Completed',
    'Cancelled',
    'Return Initiated',
    'Return Received',
    'Refund Processed',
    'Refund Completed',
    'Part Not Available'
  ];

  const handleChange = (e) => {

    if (e.target.value === 'Shipped' && trackingLink.trim() === '') {
      alert('Please add the tracking link before updating the status to Shipped');
      return;
    }

    setOrderDetails((prev) => ({
      ...prev,
      order_disposition_details: {
        ...prev.order_disposition_details,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleRequestOrder = async () => {
    try {
      if (!supplierEmail?.trim()) {
        toast.error("Please enter a supplier email!");
        return;
      }

      if (!partDetails) {
        toast.error("Part details are missing!");
        return;
      }

      if (!customerDetails) {
        toast.error("Customer details are missing!");
        return;
      }

      if (!partDetails.year || !partDetails.make || !partDetails.model || !partDetails.part_name) {
        toast.error("Incomplete part details! Please provide Year, Make, Model, and Part Name.");
        return;
      }

      if (!customerDetails.customer_name || !customerDetails.address_line_1 || !customerDetails.city || !customerDetails.state_or_region || !customerDetails.zipcode) {
        toast.error("Incomplete customer details! Name, Address, City, State, and Zipcode are required.");
        return;
      }

      // Prepare request data
      const orderData = {
        email: supplierEmail.trim(),
        year: partDetails.year,
        make: partDetails.make,
        model: partDetails.model,
        partName: partDetails.part_name,
        customerName: customerDetails.customer_name,
        customerAddress: `${customerDetails.address_line_1}, ${customerDetails.address_line_2 || ""}, ${customerDetails.city}, ${customerDetails.state_or_region}, ${customerDetails.zipcode}`.trim()
      };

      // API call with Axios inside toast.promise
      await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/api/v1/email`, orderData),
        {
          loading: "Sending purchase order...",
          success: () => {
            setSupplierEmail(''); // Clear supplier email on success
            return "Purchase order sent successfully!";
          },
          error: "Failed to send the purchase order. Please try again."
        }
      );

    } catch (error) {
      console.error("Error sending purchase order:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Order Disposition Details</h3>
      <div className="w-full flex justify-between gap-4">
        <div className='w-1/3' >
          <p>Customer Notes:</p>
          {isEditing ? (
            <textarea
              type="text"
              name="customer_notes"
              value={orderDispositionDetails.customer_notes || ''}
              onChange={handleChange}
              className="w-full text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter request for warehouse team"
            />
          ) : (
            <p className="text-gray-600">{orderDispositionDetails.customer_notes || '--'}</p>
          )}
        </div>
        <div className='w-1/3'>
          <p>Agent Notes:</p>
          {isEditing ? (
            <textarea
              type="text"
              name="agent_notes"
              value={orderDispositionDetails.agent_notes || ''}
              onChange={handleChange}
              className="w-full text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter agent notes"
            />
          ) : (
            <p className="text-gray-600">{orderDispositionDetails.agent_notes || '--'}</p>
          )}
        </div>
        <div className='w-1/2 flex gap-2'>
          <div className='w-1/2 space-y-1'>
            <p><span className='bg-green-600 p-1 text-xs text-white rounded-md'>Admin</span> Order Status: </p>
            {isEditing ? (
              <select
                name="admin_order_status"
                value={orderDispositionDetails.admin_order_status || ''}
                onChange={handleChange}
                className="w-full text-gray-600 border border-gray-300 rounded p-1"
              >
                <option value="">Select status</option>
                {adminStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-600">{orderDispositionDetails.admin_order_status || '--'}</p>
            )}
          </div>
          <div className='w-1/2 space-y-1'>
            <p><span className='bg-red-600 p-1 text-xs text-white rounded-md'>Customer</span> Order Status: </p>
            {isEditing ? (
              <select
                name="order_status"
                value={orderDispositionDetails.order_status || ''}
                onChange={handleChange}
                className="w-full text-gray-600 border border-gray-300 rounded p-1"
              >
                <option value="">Select status</option>
                {customerStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-600">{orderDispositionDetails.order_status || '--'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className='w-full flex justify-start items-end gap-2'>
          <div className="w-1/2 flex flex-col justify-center items-start ">
            <label htmlFor="supplierEmail" className="w-1/3 text-gray-700">
              Supplier Email:
            </label>
            <div className='w-full flex justify-center items-center gap-2'>
              <input
                type="email"
                id="supplierEmail"
                name="supplierEmail"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                className="w-full text-gray-600 border border-gray-300 rounded py-1.5 px-2"
                placeholder="Enter supplier's email"
              />
              <button
                onClick={handleRequestOrder}
                className="text-nowrap bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Request Purchase
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OrderDispositionDetails;
