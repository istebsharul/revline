import React from 'react';
import {FaDownload} from 'react-icons/fa';

const QuotationDetails = ({ quotationDetails = {} }) => {
    console.log(quotationDetails);
    const pdfBinary = quotationDetails?.quotationPdf?.data?.data;
    
    const getBase64String = (binaryData) => {
        const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
        return window.btoa(binaryString);
      };

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold mb-4">Quotation Details</h3>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p>Quote Number:</p>
                    <p className="text-gray-600">{quotationDetails.quote_number || '--'}</p>
                </div>
                <div>
                    <p>Status:</p>
                    <p className="text-gray-600">{quotationDetails.status || '--'}</p>
                </div>
                <div>
                    <p>Message:</p>
                    <p className="text-gray-600">{quotationDetails.message || '--'}</p>
                </div>
                <div>
                    <p>Quotation PDF:</p>
                    {pdfBinary ? (
                        <a
                            href={`data:application/pdf;base64,${getBase64String(pdfBinary)}`}
                            download="quotation.pdf"
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
                    <p className="text-gray-600">{quotationDetails.created_at ? new Date(quotationDetails.created_at).toLocaleDateString() : '--'}</p>
                </div>
            </div>
        </div>
    );
};

export default QuotationDetails;
