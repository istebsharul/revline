import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';
import axios from 'axios';
import toast from 'react-hot-toast';

const PaymentSection = ({ orderId, paymentDetails, orderStatus, quotationsStatus, onAccept }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleReject = async (message) => {
    try {
      await axios.put(`api/v1/service/quotation/reject/${orderId}`, {
        quotationsStatus: 'Rejected',
        message: message
      });
      setShowFeedback(false);
      toast.success("Order rejected.");
    } catch (err) {
      toast.error("Failed to reject order.");
    }
  };


  return (
    <>
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
        {/* <h1>Click on t</h1> */}
        {/* Approve and Reject Buttons */}
        <div className="w-full p-2 md:p-2 flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="w-full">
            <button
              onClick={onAccept}
              className={`w-full px-4 py-2 font-semibold rounded ${paymentDetails?.payment_status === 'Completed'
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              disabled={paymentDetails?.payment_status === 'Completed'}
            >
              {paymentDetails.payment_status === 'Completed' ? 'Paid' : 'Pay'}
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className={`w-full px-4 py-2 font-semibold rounded border ${quotationsStatus === 'Rejected' ? 'cursor-not-allowed bg-blue-500 text-white' : 'text-black bg-white hover:bg-red-600 hover:text-white'}`}
              disabled={quotationsStatus === 'Rejected'}
            >
              {quotationsStatus === 'Rejected' ? 'Thanks for Feedback' : `${showFeedback? "Don't Cancel":"Cancel"}`}
            </button>
          </div>
        </div>

        {/* Conditionally render the FeedbackForm */}
        {showFeedback && (
          <div className="p-4">
            <FeedbackForm
              onSubmit={(message) => {
                setFeedbackMessage(message);
                handleReject(message);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentSection;
