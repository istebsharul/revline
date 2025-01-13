import React from 'react';
import { FaDownload } from 'react-icons/fa';

function InvoicePdf({ pdfBinary }) {
    const getBase64String = (binaryData) => {
        const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
        return window.btoa(binaryString);
    };

    return (
        <div>
            <div className="w-full flex flex-col">
                <div className="w-full flex flex-col md:flex-row items-center">
                    <button
                        onClick={() => {
                            if (pdfBinary) {
                                const link = document.createElement('a');
                                link.href = `data:application/pdf;base64,${getBase64String(pdfBinary)}`;
                                link.download = 'Invoice.pdf';
                                link.click();
                            }
                        }}
                        disabled={!pdfBinary}
                        className={`w-full flex items-center justify-center text-nowrap font-medium rounded-lg py-2 px-8 w-full md:w-auto ${
                            pdfBinary
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Invoice
                        <FaDownload className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InvoicePdf;
