import React, { useEffect, useState } from 'react';
import CustomerPersonalInfo from './CustomerPersonalInfo';
import OrderSummary from './OrderSummary';
import PricingDetails from './PricingDetails';
import ShippingDetails from './ShippingDetails';
import BillingDetails from './BillingDetails';
import OrderDispositionDetails from './OrderDispositionDetails';
import DispositionHistory from '../Activities/DispositionHistory';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import SendQuotation from '../sendQuotation';
import SendInvoice from '../SendInvoice';
import QuotationDetails from './QuotationDetails';
import InvoiceDetails from './InvoiceDetails';
import PaymentDetails from './PaymentDetails';

const OverviewContainer = ({ orderDetails, setOrderDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab

  console.log(orderDetails);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab); // Switch between 'overview' and 'activities'
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/v1/orders/${orderDetails._id}`, orderDetails, {
        headers: {
          'Content-Type': 'application/json', // Ensures the payload is sent in JSON format
        },
      });
      setIsEditing(false);
      console.log(orderDetails);
      console.log('Updated Successfully!');
    } catch (err) {
      console.error('Failed to update order details:', err);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="sticky top-0">
        <div className="flex bg-white justify-end px-4 py-2">
          <button className="text-blue-500 hover:text-blue-600" onClick={handleEditToggle}>
            {isEditing ? <div className='hover:text-red-500'>Cancel</div> : <div className='flex justify-center items-center'><FaEdit className='mx-1' /><p>Customize Record</p></div>}
          </button>
          {isEditing && (
            <button className="text-blue-500 hover:text-green-600 ml-4" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="w-full bg-white flex justify-between items-end">
          <div className="flex">
            {/* Overview Tab */}
            <div
              className={`w-fit h-min text-lg font-semibold py-2 px-4 cursor-pointer ${activeTab === 'overview' ? 'bg-gray-100' : ''
                }`}
              onClick={() => handleTabSwitch('overview')}
            >
              Overview
            </div>

            {/* Activities Tab */}
            <div
              className={`w-fit h-min text-lg font-semibold py-2 px-4 cursor-pointer ${activeTab === 'activities' ? 'bg-gray-100' : ''
                }`}
              onClick={() => handleTabSwitch('activities')}
            >
              Activities
            </div>
          </div>
          <div className='w-1/2 space-x-2 flex justify-between items-center'>
            {!isEditing ? <div className='w-full'><SendQuotation orderDetails={orderDetails} /></div> : <div className='w-full p-2'>Save to Send Quotation</div>}
            {!isEditing ? <div className='w-full'><SendInvoice orderDetails={orderDetails} /></div> : <div className='w-full p-2'>Save to Send Quotation</div>}
          </div>
        </div>
      </div>

      {/* Tab Content Rendering */}
      <div className="bg-gray-100 space-y-3 p-2">
        {activeTab === 'overview' && (
          <>
            {/* Overview Content */}
            <CustomerPersonalInfo customer={orderDetails.customer} quote_number={orderDetails?.quotations?.quote_number} isEditing={isEditing} setOrderDetails={setOrderDetails} />
            <OrderSummary orderSummary={orderDetails.order_summary} isEditing={isEditing} setOrderDetails={setOrderDetails} />
            <PricingDetails pricingDetails={orderDetails.pricing_details} isEditing={isEditing} setOrderDetails={setOrderDetails} />
            <ShippingDetails shippingDetails={orderDetails.shipping_details} isEditing={isEditing} setOrderDetails={setOrderDetails} />
            <BillingDetails billingDetails={orderDetails.billing_details} isEditing={isEditing} setOrderDetails={setOrderDetails} />
            <QuotationDetails quotationDetails={orderDetails.quotations} />
            <InvoiceDetails invoiceDetails={orderDetails.invoices} />
            <PaymentDetails paymentDetails={orderDetails.payment_details} />
            <OrderDispositionDetails orderDispositionDetails={orderDetails.order_disposition_details} isEditing={isEditing} setOrderDetails={setOrderDetails} />
          </>
        )}

        {activeTab === 'activities' && (
          <>
            {/* Activities Content */}
            <DispositionHistory dispositionHistory={orderDetails.disposition_history || []} />
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewContainer;
