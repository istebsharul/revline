import React from 'react';
import Quotation from '../../Components/Order/Quotation';
import toast from 'react-hot-toast';
import axios from 'axios';
import CustomerSupport from '../CustomerSupport/CustomerSupport';
import { IoArrowBack } from "react-icons/io5";

const OrderDetails = ({ order, onBack }) => {
  const paymentDetails = order?.payment_details;

  const handleAccept = async () => {
    toast.promise(
      axios.post('/api/v1/paypal/create-payment', {
        orderId: order._id,
      }),
      {
        loading: 'Creating PayPal payment...',
        success: <b>Redirecting to PayPal...</b>,
        error: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            'An error occurred while creating PayPal payment.';
          return <b>{errorMessage}</b>;
        },
      }
    )
      .then((response) => {
        if (response.data.approvalUrl) {
          window.location.href = response.data.approvalUrl;
        }
      })
      .catch((err) => {
        console.error('Error while creating PayPal payment:', err);
      });
  };

  const handlePayment = async () => {
    console.log('Payment initiated.');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-full sm:w-11/12 max-w-4xl mt-8">
      <button className="w-full flex items-center mb-4 py-2 text-gray-600 hover:underline border-b" onClick={onBack}>
        <IoArrowBack className='mr-2' /> Back to Orders List
      </button>
      <h2 className="text-2xl font-bold ml-5">Order Details</h2>

      <div className="p-1">
        {order.quotations && (
          <Quotation
            orderId={order._id}
            paymentDetails={paymentDetails}
            pdfBinary={order?.quotations?.quotationPdf?.data?.data}
            orderStatus={order?.order_disposition_details?.order_status}
            quotationsStatus={order?.quotations?.status}
            onAccept={handleAccept}
            onPay={handlePayment}
          />
        )}
      </div>

      <div className="bg-gray-100 rounded-xl p-4 m-2">
        <p><strong>Order ID:</strong> {order._id.slice(-6)}</p>
        <p><strong>Order Status:</strong> {order.order_disposition_details?.order_status}</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 m-2">
        <h1 className="text-lg font-semibold">Order Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p><strong>Year: </strong>{order?.order_summary?.year}</p>
          <p><strong>Make: </strong>{order?.order_summary?.make}</p>
          <p><strong>Model: </strong>{order?.order_summary?.model}</p>
          <p><strong>Part Name: </strong>{order?.order_summary?.part_name}</p>
          <p><strong>Variant: </strong>{order?.order_summary?.variant}</p>
          <p><strong>Transmission: </strong>{order?.order_summary?.transmission}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 m-2 bg-gray-100 rounded-xl">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold">Shipping Details</h3>
          <p><strong>Name:</strong> {order?.shipping_details?.customer?.name}</p>
          <p><strong>Email:</strong> {order?.shipping_details?.customer?.email}</p>
          <p><strong>Address:</strong> {`${order?.shipping_details?.address_line_1}, ${order?.shipping_details?.city}, ${order?.shipping_details?.state_or_region}, ${order?.shipping_details?.country_or_region}`}</p>
        </div>

        <div className="w-full sm:w-1/2">
          <h3 className="text-lg font-semibold">Billing Details</h3>
          <p><strong>Card Holder:</strong> {order?.billing_details?.card_holder_name}</p>
          <p><strong>Billing Address:</strong> {`${order?.billing_details?.billing_address_line_1 || ''} ${order?.billing_details?.billing_city || ''} ${order?.billing_details?.billing_state_or_region || ''} ${order?.billing_details?.billing_country_or_region}`}</p>
        </div>
      </div>

      {/* Customer Support Section */}
      <CustomerSupport orderId={order._id} />
    </div>
  );
};

export default OrderDetails;
