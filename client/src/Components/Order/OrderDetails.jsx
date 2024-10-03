import React, { useState } from 'react';
import Quotation from './PaymentSection';
import toast from 'react-hot-toast';
import axios from 'axios';
import CustomerSupport from '../CustomerSupport/CustomerSupport';
import { IoArrowBack } from "react-icons/io5";
import QuotationPdf from './QuotationPdf';
import InvoicePdf from './InvoicePdf';
import PaymentSection from './PaymentSection';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const OrderDetails = ({ order, onBack }) => {
  const [loading, setLoading] = useState(false); // State for managing the loading spinner
  const paymentDetails = order?.payment_details;

  const handleAccept = async () => {
    setLoading(true); // Start loading spinner
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
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
      });
  };

  return (
    <div className=" bg-white shadow-md rounded-md w-full sm:w-11/12 max-w-4xl mt-8">
      <div className='p-4'>
        <button className="w-full flex items-center mb-4 py-2 text-gray-600 hover:underline border-b" onClick={onBack}>
          <IoArrowBack className='mr-2' /> Back to Orders List
        </button>
        <div className='w-full flex md:flex-row flex-col justify-between md:py-1 md:px-4 md:m-2'>
          <h2 className="md:w-full w-3/5 text-2xl font-bold">Order Details</h2>
          <div className='w-full flex md:flex-row flex-col md:justify-end justify-center items-center gap-2'>
            {order?.quotations?.quotationPdf?.data?.data && <QuotationPdf className='md:w-1/2 w-full' pdfBinary={order?.quotations?.quotationPdf?.data?.data} />}
            {order?.invoices?.invoicePdf?.data?.data && <InvoicePdf className='md:w-1/2 w-full' pdfBinary={order?.invoices?.invoicePdf?.data?.data} />}
          </div>
        </div>

        {/* Show loading spinner when loading */}
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <ClipLoader size={50} color="#4A90E2" loading={loading} />
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl px-2 py-1 m-2">
            <PaymentSection
              orderId={order._id}
              paymentDetails={paymentDetails}
              orderStatus={order?.order_disposition_details?.order_status}
              quotationsStatus={order?.quotations?.status}
              onAccept={handleAccept}
            />
          </div>
        )}

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
          <div className="w-full sm:w-1/2 sm:mb-0">
            <h3 className="text-lg font-semibold">Shipping Details</h3>
            <p><strong>Name:</strong> {order?.shipping_details?.customer?.name}</p>
            <p><strong>Email:</strong> {order?.shipping_details?.customer?.email}</p>
            <p><strong>Address:</strong> {`${order?.shipping_details?.address_line_1}, ${order?.shipping_details?.city}, ${order?.shipping_details?.state_or_region}, ${order?.shipping_details?.country_or_region}`}</p>
          </div>
        </div>
      </div>

      {/* Customer Support Section */}
      <CustomerSupport orderId={order._id} />
    </div>
  );
};

export default OrderDetails;