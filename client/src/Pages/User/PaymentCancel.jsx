import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa'; // Cancel icon
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function PaymentCancel() {
  const [message, setMessage] = useState('Processing cancellation...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    // If there's no session ID, this means it was just a cancel redirection
    if (!sessionId) {
      setMessage('Your payment has been cancelled.');
    }
  }, [location.search]);

  const handleBack = () => {
    navigate('/orders'); // Navigate back to orders or another appropriate page
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
      <div className="flex flex-col justify-center items-center text-center">
        <FaTimesCircle className="text-red-500 text-6xl mb-4" /> {/* Cancel Icon */}
        <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>
        <p className="mt-2 text-lg text-gray-600">{message}</p>
        <p className="mt-1 text-gray-500">If you have any questions, please contact our support team.</p>

        <div
          className="flex justify-center items-center m-4 cursor-pointer hover:underline"
          onClick={handleBack}
        >
          <IoMdArrowBack className="mr-2" />
          <p>Go Back</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancel;
