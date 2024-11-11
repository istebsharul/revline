import React from 'react';
import Banner from '../../Components/User/Banner';
import TrustBanner from '../../Components/User/TrustBanner';

function WarrantyReturnsPage() {
  return (
    <div className='flex flex-col justify-center items-center md:pt-10 pt-16'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
          Warranty and Returns
        </p>
      </div>
      <div className="p-6 max-w-4xl mx-auto font-sans">
        <h1 className="text-[#f6251a] text-left text-2xl font-bold mb-4">Warranty and Return Policy</h1>
        <p className="text-left mb-8">
          At Revline Auto Parts, we are committed to providing you with high-quality auto parts and exceptional customer service.
          Our Warranty and Return Policy is designed to ensure your complete satisfaction with every purchase.
        </p>

        <section className="mb-12">
          <h2 className="text-[#f6251a] text-xl font-semibold mb-4">Standard Warranty</h2>
          <p className="mb-4">
            We offer a 30-day warranty on all automotive parts, effective from the date of delivery. This warranty ensures that the part you receive is free from material defects and workmanship issues.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>If you receive a defective, damaged, or incorrect part, we will provide a replacement. If a replacement is unavailable, we will issue a full refund.</li>
            <li>Warranty Coverage: This warranty applies solely to the purchased part and does not cover any additional costs.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Warranty Limitations</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Installation and Labor Costs: Expenses related to the removal, installation, or reinstallation of the part.</li>
            <li>Additional Expenses: Costs for towing, vehicle rental, or other consequential damages.</li>
            <li>Associated Parts: Any components not purchased from Revline Auto Parts.</li>
            <li>Wear and Tear Items: Normal wear parts such as hoses, belts, filters, and sensors.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Warranty Void Conditions</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Improper Installation: The part fails due to incorrect or improper installation.</li>
            <li>Misuse or Abuse: Damage results from accidents, negligence, racing, or unauthorized modifications.</li>
            <li>Lack of Maintenance: Failure due to inadequate lubrication, cooling, or failure to follow manufacturer specifications.</li>
            <li>Unauthorized Repairs: Repairs performed by individuals or facilities not authorized by Revline Auto Parts.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-[#f6251a] text-xl font-semibold mb-4">Return Policy</h2>
          <ol className="list-decimal list-inside mb-4">
            <li>Contact Us: Reach out to our customer service team within the warranty period to initiate a return.</li>
            <li>Obtain RMA: We'll provide a Return Merchandise Authorization (RMA) form via email.</li>
            <li>Return Shipping: The customer is responsible for securely packaging the part and covering return shipping costs.</li>
            <li>Return Address: Send the part to the address specified in the RMA.</li>
            <li>Inspection and Processing: Upon receiving the returned part, we'll inspect it to confirm it meets our return conditions, and then process a replacement or refund based on your preference and availability.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-[#f6251a] text-xl font-semibold mb-4">Specific Part Warranties and Conditions</h2>
          <h3 className="text-lg font-medium mb-2">Engines</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Coverage Includes: Engine block, cylinder heads, pistons, crankshafts, camshafts, and valves.</li>
            <li>Exclusions: Accessories attached to the engine (e.g., hoses, wiring harnesses, sensors, manifolds, turbos) are not covered.</li>
            <li>Installation Requirements: Use new fluids, filters, seals, and gaskets. Fluids must meet manufacturer specifications.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Transmissions</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Coverage Includes: Internal components and manufacturing defects.</li>
            <li>Exclusions: External components like cooling systems, electrical parts, and ignition systems.</li>
            <li>Installation Requirements: Use recommended transmission fluids and follow manufacturer installation guidelines.</li>
          </ul>

          {/* Additional sections for other parts such as Cylinder Heads, Carburetors, Struts, etc. */}
        </section>

        <section className="mb-12">
          <h2 className="text-[#f6251a] text-xl font-semibold mb-4">Additional Important Information</h2>
          <ul className="list-disc list-inside mb-4">
            <li>OEM Parts Interchangeability: Parts may fit multiple makes and models. We guarantee fitment based on the information provided at purchase.</li>
            <li>Appearance: While we aim to provide clean and presentable parts, cosmetic conditions are not covered under warranty.</li>
            <li>Mileage Estimates: Any mileage provided is an estimate and not guaranteed due to the nature of used parts.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Restocking Fee</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Non-Warranty Returns: Returns not due to defects (e.g., ordering the wrong part) may be subject to a 25% restocking fee.</li>
            <li>Shipping Costs: Customers are responsible for all shipping charges on non-warranty returns.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-[#f6251a] text-xl font-semibold mb-4">Customer Responsibilities</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Accurate Information: Provide correct vehicle details to ensure proper part compatibility.</li>
            <li>Inspection Upon Delivery: Inspect parts immediately upon receipt. Report any issues within 4 days.</li>
            <li>Proper Installation: Have parts installed by a certified professional following manufacturer guidelines.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-[#f6251a] text-xl font-semibold mb-4">Liability Disclaimer</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Revline Auto Parts is not responsible for parts lost or damaged after delivery to the provided address.</li>
            <li>We are not responsible for failures due to customer misuse, improper installation, or neglect.</li>
            <li>We are not liable for incidental or consequential damages arising from the use of our parts.</li>
          </ul>
        </section>
      </div>
      <TrustBanner/>
    </div>
  )
}

export default WarrantyReturnsPage;
