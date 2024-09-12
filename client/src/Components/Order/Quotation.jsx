import React from 'react';
import { FaDownload } from 'react-icons/fa';

const Quotation = ({ quotationStatus, pdfBinary, onAccept, onReject,onPayment }) => {
  console.log(quotationStatus);

  // Function to convert binary data to a base64 string
  const getBase64String = (binaryData) => {
    const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
    return window.btoa(binaryString);
  };

  return (
    <div className="w-full p-8 bg-gray-100">
      <h1 className="max-w-5xl mx-auto text-xl md:text-2xl font-semibold mb-3">Quotation</h1>
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
          <button
            onClick={onAccept}
            className={`w-full px-4 py-2 font-semibold rounded ${quotationStatus === 'Accepted'
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            disabled={quotationStatus === 'Accepted'}
          >
            {quotationStatus === 'Accepted' ? 'Confirmed' : 'Confirm'}
          </button>
          <div className='w-full'>
          {quotationStatus === 'Accepted' ? (
            <div>
              <button
                onClick={onPayment}
                className="w-full px-4 py-2 text-white border bg-green-500 hover:bg-green-600 font-semibold rounded"
              >
                Click to Pay
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={onReject}
                className="w-full px-4 py-2 bg-white text-black border border-red-500 font-semibold rounded hover:text-white hover:bg-red-600"
              >
                Not Interested
              </button>
            </div>)
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
