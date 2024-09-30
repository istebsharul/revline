import React from 'react';
import { FaDownload } from 'react-icons/fa';

const InvoiceDetails = ({ invoiceDetails = {} }) => {
  // console.log(invoiceDetails);
  const pdfBinary = invoiceDetails?.invoicePdf?.data?.data;

  const getBase64String = (binaryData) => {
    const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
    return window.btoa(binaryString);
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p>Invoice Number:</p>
          <p className="text-gray-600">{invoiceDetails.invoice_number || '--'}</p>
        </div>
        <div>
          <p>Status:</p>
          <p className="text-gray-600">{invoiceDetails.status || '--'}</p>
        </div>
        <div>
          <p>Payment Mode:</p>
          <p className="text-gray-600">{invoiceDetails.payment_mode || '--'}</p>
        </div>
        <div>
          <p>Total Amount:</p>
          <p className="text-gray-600">{invoiceDetails.total_amount ? `$${invoiceDetails.total_amount}` : '--'}</p>
        </div>
        <div>
          <p>Invoice PDF:</p>
          {pdfBinary ? (
            <a
              href={`data:application/pdf;base64,${getBase64String(pdfBinary)}`}
              download="invoice.pdf"
              className="w-min flex text-nowrap text-black font-semibold rounded-lg p-2 m-1 bg-gray-200 hover:bg-gray-300"
            >
              Download PDF
              <FaDownload className="m-1" />
            </a>
          ) : (
            <p className="text-gray-600">No PDF Available</p>
          )}
        </div>
        <div>
          <p>Sent Date:</p>
          <p className="text-gray-600">{invoiceDetails.created_at ? new Date(invoiceDetails.created_at).toLocaleDateString() : '--'}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
