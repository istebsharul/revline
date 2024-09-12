import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quotation from '../../Components/Order/Quotation';
import Banner from '../../Components/User/Banner';
import Order from '../../Components/Order/Order';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const [quotationData, setQuotationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customerId = useSelector((state) => state?.auth?.user?.customer);

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchQuotationData = async () => {
      try {
        const response = await axios.get(`/api/v1/customer/${customerId}`);
        setQuotationData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch quotation data."); // Store error message
      } finally {
        setLoading(false);
      }
    };

    fetchQuotationData();
  }, [customerId]);

  const handleAccept = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/v1/customer/${customerId}`, {
        quotationStatus: 'Accepted',
      });

      setQuotationData((prevData) => ({
        ...prevData,
        quotations: {
          ...prevData.quotations,
          status: 'Accepted',
        },
      }));
      toast.success("Updated! You will receive a payment link. Make payment to confirm your order.");
    } catch (err) {
      setError(err.message || "Failed to accept quotation."); // Store error message
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    const confirm = window.confirm("Are you sure you don't want to move forward?\nContact us for any doubt.");

    if (!confirm) {
      return;
    }

    try {
      setLoading(true);
      await axios.put(`/api/v1/customer/${customerId}`, {
        quotationStatus: 'Rejected',
      });

      setQuotationData((prevData) => ({
        ...prevData,
        quotations: {
          ...prevData.quotations,
          status: 'Rejected',
        },
      }));
      toast.success("Quotation rejected successfully.");
    } catch (err) {
      setError(err.message || "Failed to reject quotation."); // Store error message
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () =>{
    console.log('Payment')
  }

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 md:pt-10 pt-16'>
      <div className="relative">
        <Banner />
        <p className="absolute text-4xl inset-0 flex justify-center items-center text-white">
          Your Orders
        </p>
      </div>

      {loading ? (
        <p className='h-screen'>Loading...</p>
      ) : error ? (
        <p className='pt-14 h-80'>Error: {error}</p>
      ) : (
        <>
          {/* Render Quotation and Order only if there is no error */}
          {quotationData?.quotations && (
            <>
              <Quotation
                pdfBinary={quotationData.quotations.quotationPdf ? quotationData.quotations.quotationPdf.data.data : null}
                quotationStatus={quotationData.quotations.status}
                onAccept={handleAccept}
                onReject={handleReject}
                onPay={handlePayment}
              />
              <Order />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderPage;
