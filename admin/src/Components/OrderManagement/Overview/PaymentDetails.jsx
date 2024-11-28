import React from 'react';

const PaymentDetails = ({ paymentDetails = {} }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p>Payment ID:</p>
          <p className="text-gray-600 break-words">{paymentDetails?.payment_id || '--'}</p>
        </div>
        <div>
          <p>Payer ID:</p>
          <p className="text-gray-600">{paymentDetails?.payer_id || '--'}</p>
        </div>
        <div>
          <p>Transaction ID:</p>
          <p className="text-gray-600">{paymentDetails?.transaction_id || '--'}</p>
        </div>
        <div>
          <p>Order ID:</p>
          <p className="text-gray-600">{paymentDetails?.order_id || '--'}</p>
        </div>
        <div>
          <p>Status:</p>
          <p className="text-gray-600">{paymentDetails?.payment_status || '--'}</p>
        </div>
        <div>
          <p>Amount:</p>
          <p className="text-gray-600">{paymentDetails?.amount ? `$${paymentDetails.amount}` : '--'}</p>
        </div>
        <div>
          <p>Currency:</p>
          <p className="text-gray-600">{paymentDetails?.currency || '--'}</p>
        </div>
        <div>
          <p>Payment Method:</p>
          <p className="text-gray-600">{paymentDetails?.payment_method || '--'}</p>
        </div>
        <div>
          <p>Description:</p>
          <p className="text-gray-600">{paymentDetails?.description || '--'}</p>
        </div>
        <div>
          <p>Payment Date:</p>
          <p className="text-gray-600">{paymentDetails?.payment_date ? new Date(paymentDetails.payment_date).toLocaleDateString() : '--'}</p>
        </div>
        <div>
          <p>Invoice Number:</p>
          <p className="text-gray-600">{paymentDetails?.invoice_number || '--'}</p>
        </div>
        <div>
          <p>Token:</p>
          <p className="text-gray-600 break-words">{paymentDetails?.token || '--'}</p>
        </div>
        <div>
          <p>Refund ID:</p>
          <p className="text-gray-600">{paymentDetails?.refund?.refund_id || '--'}</p>
        </div>
        <div>
          <p>Refund Amount:</p>
          <p className="text-gray-600">{paymentDetails?.refund?.refund_amount ? `$${paymentDetails.refund.refund_amount}` : '--'}</p>
        </div>
        <div>
          <p>Refund Date:</p>
          <p className="text-gray-600">{paymentDetails?.refund?.refund_date ? new Date(paymentDetails.refund.refund_date).toLocaleDateString() : '--'}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
