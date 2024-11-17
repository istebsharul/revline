import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaTimesCircle } from 'react-icons/fa'; // Importing cancel icon
import { ImSpinner2 } from 'react-icons/im'; // Importing spinner icon
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function PaymentCancel() {
  const [message, setMessage] = useState('Processing cancellation...');
  const [isProcessing, setIsProcessing] = useState(true); // To handle spinner visibility
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from query parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    // Call backend to handle the cancellation
    const handleCancellation = async () => {
      try {
        const response = await axios.get(`https://server.revlineautoparts.com/api/v1/paypal/cancel?token=${token}`);
        if (response.data.status === 'cancelled') {
          setMessage('Your payment has been successfully cancelled.');
        } else {
          setMessage('Cancellation failed. Please try again or contact support.');
        }
      } catch (error) {
        console.error('Error handling cancellation:', error);
        setMessage('Cancellation failed due to an error. Please try again later.');
      } finally {
        setIsProcessing(false); // Stop showing spinner once request is completed
      }
    };

    if (token) {
      handleCancellation();
    } else {
      setMessage('Invalid cancellation details.');
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
          <ImSpinner2 className="text-4xl text-blue-500 animate-spin" /> {/* Spinner */}
          <p className="mt-4 text-lg text-gray-600">{message}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          {message.includes('cancelled') ? (
            <>
              <FaTimesCircle className="text-red-500 text-6xl mb-4" /> {/* Cancel Icon */}
              <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>
              <p className="mt-2 text-lg text-gray-600">{message}</p>
              <p className="mt-1 text-gray-500">If you have any questions, please contact our support team.</p>
            </>
          ) : (
            <p className="text-lg text-red-500">{message}</p>
          )}
          <div
            className="flex justify-center items-center m-4 cursor-pointer hover:underline"
            onClick={handleBack}
          >
            <IoMdArrowBack className="mr-2" />
            <p>Go Back</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentCancel;
