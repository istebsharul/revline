import React from 'react'
import Banner from '../../Components/Banner'
import TrustBanner from '../../Components/TrustBanner'

function WarrantyReturnsPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
          Warranty and Returns
        </p>
      </div>
      <div className="p-6 max-w-4xl mx-auto font-sans">
        <h1 className="text-red-600 text-left text-2xl font-bold mb-8">Warranty and Return Policy</h1>
        <p className="text-left mb-12">
          At Revline Auto Parts, we are committed to providing you with high-quality auto parts and exceptional customer service.
          Our Warranty and Return Policy is designed to ensure your complete satisfaction with every purchase.
        </p>

        <section className="mb-12">
          <h2 className="text-red-600 text-xl font-semibold mb-4">Warranty Policy</h2>

          <h3 className="text-lg font-medium mb-2">Warranty Coverage</h3>
          <p className="mb-4">
            All products sold by Revline Auto Parts are covered by a 12-month limited warranty from the date of purchase.
            This warranty covers defects in materials and workmanship under normal use and service.
            The warranty is applicable only to the original purchaser and is non-transferable.
          </p>

          <h3 className="text-lg font-medium mb-2">Warranty Exclusions</h3>
          <p className="mb-4">
            The warranty does not cover damages resulting from improper installation, misuse, neglect, accidents, or modifications.
            Wear and tear parts, such as brake pads, filters, and wiper blades, are not covered under this warranty.
            The warranty is void if the product is used for racing, off-road, or commercial purposes unless explicitly stated.
          </p>

          <h3 className="text-lg font-medium mb-2">Warranty Claim Process</h3>
          <p className="mb-4">
            To initiate a warranty claim, please contact our customer service team with your order number, product details,
            and a description of the issue. We may request photos or additional information to assess the claim.
            If the claim is approved, we will provide a replacement part or issue a store credit at our discretion.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-red-600 text-xl font-semibold mb-4">Return Policy</h2>

          <h3 className="text-lg font-medium mb-2">Return Eligibility</h3>
          <p className="mb-4">
            You may return unused and unopened products within 30 days of the delivery date for a full refund, excluding shipping costs.
            Returns must be in the original packaging and in resellable condition.
            Electrical and electronic parts are not eligible for return if the packaging has been opened.
          </p>

          <h3 className="text-lg font-medium mb-2">Return Process</h3>
          <p className="mb-4">
            To initiate a return, contact our customer service team with your order number and the reason for the return.
            We will provide you with a Return Merchandise Authorization (RMA) number and return instructions.
            Returns without an RMA number will not be accepted.
          </p>

          <h3 className="text-lg font-medium mb-2">Refunds</h3>
          <p className="mb-4">
            Once we receive and inspect the returned item, a refund will be processed to your original payment method within 7-10 business days.
            Shipping charges are non-refundable unless the return is due to an error on our part.
          </p>

          <h3 className="text-lg font-medium mb-2">Return Shipping</h3>
          <p className="mb-4">
            The customer is responsible for return shipping costs unless the return is due to a defective product or an error in the order.
            We recommend using a trackable shipping method and purchasing shipping insurance for high-value items.
          </p>

          <h3 className="text-lg font-medium mb-2">Restocking Fee</h3>
          <p className="mb-4">
            A 15% restocking fee may apply to returns that do not meet the above criteria or are returned after the 30-day window.
          </p>
        </section>
      </div>
      <TrustBanner/>
    </div>
  )
}

export default WarrantyReturnsPage