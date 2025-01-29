import React from 'react';

const OrderDispositionDetails = ({ trackingLink, orderDispositionDetails = {}, isEditing, setOrderDetails }) => {
  // Define the admin status options
  const adminStatusOptions = [
    'Awaiting Supplier Confirmation',
    'Supplier Confirmed',
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
      'Refund Completed'
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

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Order Disposition Details</h3>
      <div className="w-full flex justify-between gap-4">
        <div className='w-1/3' >
          <p>Specific Request for Warehouse Team:</p>
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
        <div className='w-1/3 flex gap-2'>
          <div className='w-1/2 space-y-1'>
            <p><span className='bg-green-600 p-1 text-white rounded-md'>Admin</span> Order Status: </p>
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
          <p><span className='bg-red-600 p-1 text-white rounded-md'>Customer</span> Order Status: </p>
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
    </div>
  );
};

export default OrderDispositionDetails;
