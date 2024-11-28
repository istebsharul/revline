import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa'; // Green tick icon
import { ImSpinner2 } from 'react-icons/im'; // Spinner icon
import { IoMdArrowBack } from "react-icons/io"; // Back arrow icon
import { useNavigate } from 'react-router-dom';

function PaymentSuccessfulPage() {
  const [message, setMessage] = useState('Processing payment...');
  const [isProcessing, setIsProcessing] = useState(true); // Spinner visibility
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract session_id from query parameters
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    // Call backend to verify payment
    const verifyPayment = async () => {
      try {
        const response = await axios.get(`https://server.revlineautoparts.com/api/v1/stripe/verify-payment?session_id=${sessionId}`);
        if (response.data.success) {
          setMessage('Payment successful! Thank you for your purchase.');
        } else {
          setMessage('Payment failed. Please try again or contact support.');
        }
      } catch (error) {
        console.error('Error verifying the payment:', error);
        setMessage('Payment failed due to an error. Please try again.');
      } finally {
        setIsProcessing(false); // Stop spinner after request completion
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setMessage('Invalid payment details.');
      setIsProcessing(false);
    }
  }, [location.search]);

  const handleBack = () => {
    navigate('/orders');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
      {isProcessing ? (
        <div className="flex flex-col items-center">
          <ImSpinner2 className="text-4xl text-red-500 animate-spin" /> {/* Spinner */}
          <p className="mt-4 text-lg text-gray-600">{message}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          {message.includes('successful') ? (
            <>
              <FaCheckCircle className="text-green-500 text-6xl mb-4" /> {/* Green Tick Icon */}
              <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>
              <p className="mt-2 text-lg text-gray-600">Thank you for your purchase.</p>
              <p className="mt-1 text-gray-500">Your order has been placed and is being processed.</p>
            </>
          ) : (
            <p className="text-lg text-red-500">{message}</p>
          )}
          <div
            className="flex justify-center items-center m-4 hover:underline cursor-pointer"
            onClick={handleBack}
          >
            <IoMdArrowBack />
            <p className="ml-2">Go Back</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccessfulPage;
