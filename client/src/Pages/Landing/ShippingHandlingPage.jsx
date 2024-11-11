import React from 'react';
import Banner from '../../Components/User/Banner';
import TrustBanner from '../../Components/User/TrustBanner';

function ShippingHandlingPage() {
  return (
    <div className='flex flex-col justify-center items-center md:pt-10 pt-16'>
      {/* Banner Section */}
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
          Shipping & Handling
        </p>
      </div>

      {/* Content Section */}
      <div className='max-w-4xl p-6'>
        <h1 className="text-[#f6251a] text-left text-2xl font-bold mb-4">Shipping and Handling</h1>
        <p className="text-left mb-8">
        At Revline Auto Parts, we are dedicated to delivering your orders promptly and efficiently across the United States and Canada. Please review our shipping policies below:
        </p>
        <h2 className="text-[#f6251a] text-xl font-semibold">Shipping & Handling Policies</h2>
        <div className='py-4'>
          <h2 className='text-lg font-medium'>Order Processing</h2>
          <p className=''>
            • Processing Time: We process orders within 1-2 business days (Monday through Friday, excluding federal holidays).<br />
            • Notifications: Once your order is prepared for shipment, we will notify you via email and SMS.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Shipping Schedule</h2>
          <p className=''>
            • Dispatch Days: Shipments are dispatched Monday through Friday.<br />
            • Non-Shipping Days: We do not ship orders on Saturdays, Sundays, or public holidays.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Shipping Costs</h2>
          <p className=''>
            • Standard Shipping: Calculated at checkout based on the weight, dimensions, and destination of your order.<br />
            • Competitive Rates: We offer competitive shipping rates to keep your experience affordable.<br />
            • Expedited Shipping: Available at an additional cost for faster delivery.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Delivery Timeframes</h2>
          <p className=''>
            • Non-Freight Items (less than 70 lbs): Estimated delivery in 5-7 business days.<br />
            • Freight Items (more than 70 lbs): Estimated delivery in 7-10 business days.<br />
            • Coordination: We’ll coordinate to ensure smooth delivery for freight items.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Order Tracking</h2>
          <p className=''>
            • Log in to your account to track your order, view tracking numbers, and manage returns.<br />
            • Notifications: We’ll notify you via email/SMS about your order’s status and delivery.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Delivery Confirmation</h2>
          <p className=''>
            • Signature Requirement: Certain high-value items may require a signature upon delivery.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Shipping Address Options</h2>
          <p className=''>
            • Flexible Delivery: We can ship to your home, workplace, or mechanic.<br />
            • P.O. Box Addresses: Not accepted for shipping, only for billing purposes.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Delivery Inspection</h2>
          <p className=''>
            • Immediate Inspection: Inspect your order upon delivery.<br />
            • Reporting Issues: Notify us within 4 days for any discrepancies.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Lost or Damaged Shipments</h2>
          <p className=''>
            • Immediate Assistance: Contact us if your shipment is lost or damaged.<br />
            • Resolution: We will work with the carrier and arrange for a replacement or refund.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Unforeseen Delays</h2>
          <p className=''>
            • Delays: Natural disasters or other circumstances may cause delays.<br />
            • Communication: We will notify you of any delays and work to resolve them.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Order Changes and Cancellations</h2>
          <p className=''>
            • Before Shipping: Contact us to modify or cancel your order.<br />
            • After Shipping: Changes may not be possible once the order is dispatched.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Customer Responsibility</h2>
          <p className=''>
            • Receiving the Order: Ensure someone is available to receive your order.<br />
            • Verification: Verify that the items are correct and undamaged upon delivery.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>No In-Store Pickup</h2>
          <p className=''>
            • We do not offer in-store pickup; all orders are shipped directly to your address.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Shipping Restrictions</h2>
          <p className=''>
            • Special Items: Oversized or hazardous items may have specific shipping requirements.<br />
            • Notification: We will notify you if your order includes such items.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Holiday Shipping</h2>
          <p className=''>
            • Peak Seasons: Allow extra time for delivery during peak seasons.<br />
            • Recommendation: Place orders early to ensure timely arrival.
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-lg font-medium'>Contact Us</h2>
          <p className=''>
            • Phone: xxx-xxx-xxxx<br />
            • Email: Support@revlineautoparts.com<br />
            • Website: www.revlineautoparts.com
          </p>
        </div>
      </div>

      <TrustBanner/>
    </div>
  );
}

export default ShippingHandlingPage;
