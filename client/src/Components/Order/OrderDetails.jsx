import React, { useEffect, useState } from 'react';
import PaymentSection from './PaymentSection';
import CustomerSupport from '../CustomerSupport/CustomerSupport';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import InvoicePdf from './InvoicePdf';

const OrderDetails = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const paymentDetails = order?.payment_details;
  const date = order?.quotations?.created_at;

  const features = [
    {
      title: "Unmatched Expertise",
      description: "Our auto parts specialists ensure every component meets the highest standards, giving you confidence that you’re buying the very best.",
    },
    {
      title: "Hassle-Free Process",
      description: "We make buying simple. Confirm your order, and let us handle the rest—from secure payments to rapid delivery.",
    },
    {
      title: "Warranty Protection",
      description: "Enjoy peace of mind with our 30-day hassle-free warranty. If you experience any issues, we’ll make it right.",
    },
    {
      title: "Fast Delivery & Real-Time Tracking",
      description: "We ship swiftly and provide tracking information, so you’ll know exactly when to expect your part.",
    },
    {
      title: "Dedicated Customer Support",
      description: "Our team is here to answer your questions and provide support every step of the way, whether it’s about the part, delivery, or warranty.",
    },
  ];

  const terms = [
    {
      title: "Payment Terms",
      description: "Payment is due within 14 days from the date of issuance. Please contact us promptly if you have any queries regarding the quote or require flexible payment arrangements.",
    },
    {
      title: "Ownership",
      description: "All parts remain the property of Revline Auto Parts until full payment is received.",
    },
    {
      title: "Warranty",
      description: "Our parts come with a 30-day hassle-free warranty. All warranty claims must include proof of purchase.",
    },
    {
      title: "Returns",
      description: "Returns are accepted within 30 days and may be subject to restocking fees. Items must be returned in unused condition and include the original packaging.",
    },
    {
      title: "Limitation of Liability",
      description: "Revline Auto Parts is not liable for any indirect, incidental, or consequential damages resulting from the use of our parts. We recommend professional installation; improper installation may void the warranty.",
    },
    {
      title: "Shipping and Delivery",
      description: "Shipping costs are the responsibility of the buyer unless otherwise agreed upon. We are not responsible for delays caused by carriers or unforeseen events.",
    },
    {
      title: "Privacy Policy",
      description: "Any personal information collected will be used solely for order processing and will not be shared with third parties without consent.",
    },
  ];

  const handleAccept = async () => {
    setLoading(true);
    toast.promise(
      axios.post('https://server.revlineautoparts.com/api/v1/stripe/create-payment', { orderId: order._id }),
      {
        loading: 'Please wait...',
        success: <b>Redirecting to Payment Gateway...</b>,
        error: (error) => {
          const errorMessage = error.response?.data?.message || 'An error occurred while creating PayPal payment.';
          return <b>{errorMessage}</b>;
        },
      }
    )
      .then((response) => {
        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        }
      })
      .catch((err) => {
        console.error('Error while creating PayPal payment:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Format the date if it's valid
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  };

  return (
    <>
      {order.quotations &&
        <div className="flex flex-col items-center bg-gray-100 min-h-screen gap-2 p-2 sm:p-4">
          <div className="w-full bg-white rounded-lg flex justify-between items-center p-2">
            <p className="text-md md:p-2 p-1 flex flex-wrap">
              <strong>Order Status:</strong>{order?.order_disposition_details.order_status}
            </p>
            <div className='p-1'>{order.invoices && <InvoicePdf pdfBinary={order?.invoices?.invoicePdf?.data?.data} />}</div>
          </div>

          <div className="w-full max-w-4xl bg-white flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
            <div className="w-full md:w-1/3 bg-gray-100 text-gray-800 p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <h2 className="text-2xl text-[#f6251a] font-bold mb-4 md:mb-6 text-center md:text-left">REVLINE AUTO PARTS</h2>
              <div className="mb-4 md:mb-6">
                <h1 className='font-bold text-xl'>Quoted To:</h1>
                <p>{order?.shipping_details?.customer?.name}</p>
                <p>{order?.shipping_details?.customer?.zipcode}</p>
                <p>{order?.shipping_details?.customer?.email}</p>
                <p>{order?.shipping_details?.customer?.phone}</p>
              </div>
              <div className="mb-4 md:mb-6 text-xl">
                <strong>Payment</strong>
                <p className='text-sm'>Beneficiary Name: <span className='italic text-gray-600'>Revline Auto Parts, LLC</span></p>
                <p className='text-sm'>Account Number: <span className='italic text-gray-600'>202487384909</span></p>
                <p className='text-sm'>ABA Routing Number: <span className='italic text-gray-600'>091311229</span></p>
                <p className='text-sm'>Type of Account: <span className='italic text-gray-600'>Checking</span></p>
                <p className='text-sm'>Bank Name: <span className='italic text-gray-600'>Choice Financial Group</span></p>
              </div>
              <div className="bg-gray-100">
                <h2 className="text-xl font-bold mb-2 md:mb-4">Terms</h2>
                <ul className="space-y-2 md:space-y-4">
                  {terms.map((term, index) => (
                    <li key={index} className="text-gray-700 text-xs">
                      <strong>{term.title}:</strong> {term.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-4 md:p-8">
              <div className="flex justify-between items-center bg-[#f6251a] text-white md:p-4 p-4 rounded-md mb-4 md:mb-6 text-sm md:text-md">
                <div className="font-bold text-left">
                  Quote ID: {order?.quotations?.quote_number}<br />Date: {formatDate(date)}
                </div>
                <div className="text-left md:text-right md:mt-0 ">
                  Vehicle: {order?.order_summary?.year} {order?.order_summary?.make} {order?.order_summary?.model}<br />Part: {order?.order_summary?.part_name}
                </div>
              </div>

              <h2 className="text-red-500 text-center text-xl md:text-2xl font-bold mb-4">QUOTATION</h2>

              <p className="text-xs text-gray-700 mb-4 md:mb-6 text-center md:text-left">
                At Revline Auto Parts, we understand that keeping your vehicle performing at its best is your top priority. Our mission is to provide high-quality, reliable parts with a seamless purchasing experience. Below, you’ll find a personalized quote tailored specifically to your vehicle's needs, ensuring it continues to deliver peak performance without compromise.
              </p>

              <table className="w-full text-left border-collapse mb-4 md:mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 font-semibold text-xs md:text-sm">Description</th>
                    <th className="py-2 px-4 font-semibold text-xs md:text-sm">Price</th>
                    <th className="py-2 px-4 font-semibold text-xs md:text-sm">Qty</th>
                    <th className="py-2 px-4 font-semibold text-xs md:text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 text-xs md:text-sm">{order?.order_summary?.part_name}</td>
                    <td className="py-2 px-4 text-xs md:text-sm">${order?.pricing_details?.quoted_price || 'N/A'}</td>
                    <td className="py-2 px-4 text-xs md:text-sm">1</td>
                    <td className="py-2 px-4 text-xs md:text-sm">${order?.pricing_details?.quoted_price || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center bg-[#f6251a] text-white py-3 rounded-md font-bold text-md md:text-lg mb-4 md:mb-6">
                Total Cost: ${order?.pricing_details?.quoted_price || 'N/A'}
              </div>

              <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
                <h2 className="text-md font-bold mb-2 md:mb-4">Why Choose Revline Auto Parts?</h2>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="text-gray-700 text-xs">
                      <strong>{index + 1}. {feature.title}:</strong> {feature.description}
                    </li>
                  ))}
                </ul>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <ClipLoader size={40} color="#4A90E2" loading={loading} />
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

              <div className="bg-gray-100 p-4 md:p-6 rounded-md mb-4 md:mb-6 text-sm">
                <strong>What Our Customers Are Saying:</strong>
                <p className="italic text-gray-700 mt-2">"Revline Auto Parts made the entire process so easy..." - James R.</p>
                <p className="italic text-gray-700 mt-2">"Excellent service and great prices. I saved a lot..." - Maria L.</p>
              </div>

              <a href="tel:+13105550147" className="block w-full md:w-48 mx-auto py-3 text-center bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 mb-4 md:mb-6">
                Call Us
              </a>
              <p className="text-center md:text-left">Adam Reed<br />Senior Parts Specialist</p>
            </div>
          </div>

          <div className="w-full text-gray-800">
            <CustomerSupport orderId={order._id} />
          </div>
        </div>

      }
    </>
  );
};

export default OrderDetails;