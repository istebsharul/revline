import React from 'react'
import { FaDownload } from 'react-icons/fa';

function InvoicePdf({ pdfBinary }) {
    // console.log(pdfBinary);

    const getBase64String = (binaryData) => {
        const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
        return window.btoa(binaryString);
    };

    return (
        <div>
            {pdfBinary ? (
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-col md:flex-row items-center">
                        <a
                            href={`data:application/pdf;base64,${getBase64String(pdfBinary)}`}
                            download="Invoice.pdf"
                            className="w-full flex items-center justify-center text-nowrap text-black font-medium rounded-lg py-2 px-8 bg-gray-200 hover:bg-gray-300 w-full md:w-auto"
                        >
                            Invoice
                            <FaDownload className="ml-2" />
                        </a>
                    </div>
                </div>
            ) : (
                <div>No Data</div>
            )}
        </div>
    )
}

export default InvoicePdf