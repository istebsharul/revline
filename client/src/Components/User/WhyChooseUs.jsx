
import React from "react";
import { FaShieldAlt, FaRegClock, FaCheckCircle, FaLock } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-red-500 text-4xl" />,
      title: "1 YEAR WARRANTY",
      description: "We offer hassle-free guarantees",
    },
    {
      icon: <FaCheckCircle className="text-red-500 text-4xl" />,
      title: "QUALITY ASSURED PARTS",
      description: "All of our parts are quality tested & inspected.",
    },
    {
      icon: <FaRegClock className="text-red-500 text-4xl" />,
      title: "24 HOUR HANDLING",
      description:
        "We ship all products within 24 business hours to the lower 48 states.",
    },
    {
      icon: <FaLock className="text-red-500 text-4xl" />,
      title: "SECURE TRANSACTIONS",
      description: "256-BIT level encryption security, certified & verified.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className='text-center md:text-5xl text-3xl py-5 font-medium'>WHY <span className="text-[#f6251a]">CHOOSE</span> US</h1>
        <p className="md:px-40 md:pb-10 md:text-sm text-xs"><span className="hover:underline hover:text-[#f6251a]">Revlineautoparts.com</span> is the place for the best genuine OEM used auto parts online. With a hassle free, one year warranty, and the highest standards in quality and affordability, you can always rely on us for your parts.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col justify items-center text-center md:p-6 p-2 transition-transform duration-300 ${index == features.length-1 ? '': 'md:border-r'}`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="md:text-lg text-sm font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 md:text-sm text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;


// import React from 'react';
// import { FaShippingFast, FaCreditCard, FaShieldAlt, FaCheck } from 'react-icons/fa';

// const WhyChooseUs = () => {
//     const reasons = [
//         {
//             icon: <FaShippingFast className="text-3xl text-[#f6251a]" />,
//             title: 'Nationwide Shipping',
//             description: 'Shipping the parts you need throughout the United States',
//         },
//         {
//             icon: <FaCreditCard className="text-3xl text-[#f6251a]" />,
//             title: 'Secure Payment',
//             description: 'Shop thousands of quality used auto parts.',
//         },
//         {
//             icon: <FaShieldAlt className="text-3xl text-[#f6251a]" />,
//             title: 'Warranty Policies',
//             description: <>36-Month Parts & Labor Warranty available.</>,
//         },
//         {
//             icon: <FaCheck className="text-3xl text-[#f6251a]" />,
//             title: 'Quality Inspection',
//             description: 'Every part is inspected for quality assurance',
//         },
//     ];

//     return (
//         <div className="py-6 bg-white [">
//             <div className="max-w-7xl mx-auto px-6">
//                 {/* Use grid here with 2 columns on small screens, 4 on sm and above */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
//                     {reasons.map((reason, i) => (
//                         <div
//                             key={i}
//                             className={`flex flex-col md:flex-row items-center px-4 text-black max-w-xs mx-auto gap-2 ${i === reasons.length - 1 ? '' : 'md:border-r md:border-gray-300'}`}
//                         >
//                             <div>{reason.icon}</div>
//                             <div className="w-full flex flex-col justify-center items-center">
//                                 <h3 className="font-medium md:text-lg text-sm text-nowrap mt-2 mb-1">{reason.title}</h3>
//                                 <p className="text-xs font-light">{reason.description}</p>
//                             </div>
//                         </div>
//                     ))
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WhyChooseUs;