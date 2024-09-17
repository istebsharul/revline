import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';
import axios from 'axios';
import toast from 'react-hot-toast';

const Quotation = ({ orderId, orderStatus, quotationsStatus, pdfBinary, onAccept, onPayment }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  console.log(quotationsStatus);

  const handleReject = async (message) => {
    try {
      // Send update request to server with dynamic values
      await axios.put(`api/v1/service/quotation/reject/${orderId}`, {
        quotationsStatus: 'Rejected',  // Dynamic status value
        message: message                // Dynamic message value
      });
      setShowFeedback(false); // Hide the feedback form
      toast.success("Order rejected.");
    } catch (err) {
      toast.error("Failed to reject order.");
    }
  };

  // Function to convert binary data to a base64 string
  const getBase64String = (binaryData) => {
    const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
    return window.btoa(binaryString);
  };

  return (
    <>
      <h1 className="max-w-5xl mx-auto text-xl md:text-xl font-semibold mb-3">Quotation</h1>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Quotation PDF Download */}
        {pdfBinary && (
          <div className="flex flex-col p-6 border-b border-gray-200">
            <div className="flex items-center">
              <a
                href={`data:application/pdf;base64,${getBase64String(pdfBinary)}`}
                download="quotation.pdf"
                className="flex text-black font-semibold rounded-lg p-3 bg-gray-200 hover:bg-gray-300"
              >
                Download PDF
                <FaDownload className="m-1" />
              </a>
              <h2 className="text-xl font-semibold text-gray-800 p-3">
                Click to Download and View the Quotation.
              </h2>
            </div>
            <p className="p-2 mt-4 font-medium">Click Confirm to Pay and Place Order.</p>
          </div>
        )}

        {/* Approve and Reject Buttons */}
        <div className="w-full p-6 flex gap-2 justify-between items-center">
          <div className='w-full'>
            <button
              onClick={onAccept}
              className={`w-full px-4 py-2 font-semibold rounded ${orderStatus === 'Payment Received'
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              disabled={orderStatus === 'Payment Received'}
            >
              {orderStatus === 'Payment Received' ? 'Paid' : 'Pay'}
            </button>
          </div>
          <div className='w-full'>
            <button
              onClick={() => setShowFeedback(true)}
              className={`w-full px-4 py-2 font-semibold rounded ${quotationsStatus === 'Pending'? 'bg-white text-black hover:bg-red-600 hover:text-white border border-red-500' : 'bg-gray-400 text-white cursor-not-allowed '}`}
              disabled={quotationsStatus === 'Approved'}
            >
             {quotationsStatus === 'Rejected'? 'Thanks for Feedback' : 'Not Interested'} 
            </button>
          </div>
        </div>

        {/* Conditionally render the FeedbackForm */}
        {showFeedback && (
          <FeedbackForm onSubmit={(message) => {
            setFeedbackMessage(message);
            handleReject(message);
          }} />
        )}
      </div>
    </>
  );
};

export default Quotation;
