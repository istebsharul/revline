import React from 'react';

const OrderDispositionDetails = ({ orderDispositionDetails = {}, isEditing, setOrderDetails }) => {
  // Define the status options
  const statusOptions = [
    'Order Placed',
    'Pending Approval',
    'Approved',
    'Quotation Sent',
    'Awaiting Payment',
    'Payment Received',
    'Order Processing',
    'Awaiting Supplier Confirmation',
    'Supplier Confirmed',
    'Ready for Dispatch',
    'Shipped',
    'In Transit',
    'Delivered',
    'Completed',
    'Cancelled',
    'Returned/Refund Initiated',
    'Refund Completed'
  ];

  const handleChange = (e) => {
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p>Specific Request for Warehouse Team:</p>
          {isEditing ? (
            <input
              type="text"
              name="specific_request_for_warehouse_team"
              value={orderDispositionDetails.specific_request_for_warehouse_team || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter request for warehouse team"
            />
          ) : (
            <p className="text-gray-600">{orderDispositionDetails.specific_request_for_warehouse_team || '--'}</p>
          )}
        </div>
        <div>
          <p>Agent Notes:</p>
          {isEditing ? (
            <input
              type="text"
              name="agent_notes"
              value={orderDispositionDetails.agent_notes || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
              placeholder="Enter agent notes"
            />
          ) : (
            <p className="text-gray-600">{orderDispositionDetails.agent_notes || '--'}</p>
          )}
        </div>
        <div>
          <p>Order Status:</p>
          {isEditing ? (
            <select
              name="order_status"
              value={orderDispositionDetails.order_status || ''}
              onChange={handleChange}
              className="text-gray-600 border border-gray-300 rounded p-1"
            >
              <option value="">Select status</option>
              {statusOptions.map((status) => (
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
  );
};

export default OrderDispositionDetails;
