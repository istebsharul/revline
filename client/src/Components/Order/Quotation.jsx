import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';
import axios from 'axios';
import toast from 'react-hot-toast';

const Quotation = ({ orderId, paymentDetails, orderStatus, quotationsStatus, pdfBinary, onAccept, onPayment }) => {
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

  const getBase64String = (binaryData) => {
    const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
    return window.btoa(binaryString);
  };

  return (
    <>
        <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
        <h1 className="max-w-5xl mx-auto border-b text-xl md:text-xl font-semibold text-left px-6 py-2">Quotation</h1>
        {/* Quotation PDF Download */}
        {pdfBinary && (
          <div className="flex flex-col p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center">
              <a
                href={`data:application/pdf;base64,${getBase64String(pdfBinary)}`}
                download="quotation.pdf"
                className="flex items-center justify-center text-black font-semibold rounded-lg p-3 bg-gray-200 hover:bg-gray-300 w-full md:w-auto"
              >
                Download PDF
                <FaDownload className="ml-2" />
              </a>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 p-3 text-center md:text-left">
                Click to Download and View the Quotation.
              </h2>
            </div>
            <p className="p-2 mt-4 font-medium text-center md:text-left">Click Confirm to Pay and Place Order.</p>
          </div>
        )}

        {/* Approve and Reject Buttons */}
        <div className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="w-full">
            <button
              onClick={onAccept}
              className={`w-full px-4 py-2 font-semibold rounded ${paymentDetails?.payment_status === 'Completed'
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              disabled={paymentDetails?.payment_status === 'Completed'}
            >
              {orderStatus === 'Payment Received' ? 'Paid' : 'Pay'}
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className={`w-full px-4 py-2 font-semibold rounded border ${quotationsStatus === 'Rejected' ? 'cursor-not-allowed bg-blue-500 text-white' : 'text-black bg-white hover:bg-red-600 hover:text-white'}`}
              disabled={quotationsStatus === 'Rejected'}
            >
              {quotationsStatus === 'Rejected' ? 'Thanks for Feedback' : 'Cancel'}
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

export default Quotation;
