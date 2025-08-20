import React from 'react';
import { FaShippingFast, FaCreditCard, FaShieldAlt, FaCheck } from 'react-icons/fa';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: <FaShippingFast className="text-3xl text-[#f6251a]" />,
            title: 'Nationwide Shipping',
            description: 'Shipping the parts you need throughout the United States',
        },
        {
            icon: <FaCreditCard className="text-3xl text-[#f6251a]" />,
            title: 'Secure Payment',
            description: 'Shop thousands of quality used auto parts.',
        },
        {
            icon: <FaShieldAlt className="text-3xl text-[#f6251a]" />,
            title: 'Warranty Policies',
            description: <>36-Month Parts & Labor Warranty available.</>,
        },
        {
            icon: <FaCheck className="text-3xl text-[#f6251a]" />,
            title: 'Quality Inspection',
            description: 'Every part is inspected for quality assurance',
        },
    ];

    return (
        <div className="py-6 bg-white [">
            <div className="max-w-7xl mx-auto px-6">
                {/* Use grid here with 2 columns on small screens, 4 on sm and above */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    {reasons.map((reason, i) => (
                        <div
                            key={i}
                            className={`flex flex-col md:flex-row items-center px-4 text-black max-w-xs mx-auto gap-2 ${i === reasons.length - 1 ? '' : 'md:border-r md:border-gray-300'}`}
                        >
                            <div>{reason.icon}</div>
                            <div className="w-full flex flex-col justify-center items-center">
                                <h3 className="font-medium md:text-lg text-sm text-nowrap mt-2 mb-1">{reason.title}</h3>
                                <p className="text-xs font-light">{reason.description}</p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;



// import React from 'react';
// import { FaCheckCircle, FaDollarSign, FaShippingFast, FaHeadset, FaWrench, FaShieldAlt } from 'react-icons/fa'; // Added new icons
// import { motion } from 'framer-motion';

// const WhyChooseUs = () => {
//     const reasons = [
//         {
//             icon: <FaCheckCircle className="text-5xl text-black mb-4" />,
//             title: 'Quality You Can Trust',
//             description: 'We ensure our OEM parts are thoroughly tested and inspected to meet performance expectations, ensuring top reliability.',
//         },
//         // {
//         //     icon: <FaDollarSign className="text-5xl text-black mb-4" />,
//         //     title: 'Affordable Pricing',
//         //     description: 'Our competitive prices help you save money while ensuring you receive the highest quality parts available.',
//         // },
//         // {
//         //     icon: <FaWrench className="text-5xl text-black mb-4" />, // Using a wrench for "Real-Time Inventory"
//         //     title: 'Real-Time Inventory',
//         //     description: 'Our live inventory system guarantees the parts you need are available exactly when you need them.',
//         // },
//         {
//             icon: <FaShippingFast className="text-5xl text-black mb-4" />,
//             title: 'Nationwide Shipping',
//             description: 'We provide fast, reliable shipping across the United States, ensuring your parts arrive as quickly as possible.',
//         },
//         // {
//         //     icon: <FaHeadset className="text-5xl text-black mb-4" />,
//         //     title: 'Expert Assistance',
//         //     description: 'Our knowledgeable specialists are here to help you find exactly what you need, providing personalized support.',
//         // },
//         {
//             icon: <FaShieldAlt className="text-5xl text-black mb-4" />, // Using a shield for "Comprehensive Warranty"
//             title: 'Comprehensive Warranty',
//             description: 'You can enjoy peace of mind with our hassle-free warranty included with every part we sell to you.',
//         },
//         {
//             icon: <FaHeadset className="text-5xl text-black mb-4" />,
//             title: 'Customer Support',
//             description: 'Our dedicated customer service team is committed to answering your questions and ensuring complete satisfaction.',
//         },
//     ];


//     // Animation variants for Framer Motion
//     const variants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0 },
//     };

//     return (
//         <div className="md:pb-40 pb-20">
//             <div className="2xl:w-4/6 md:w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
//                 <h1 className='md:text-5xl text-4xl font-inter tracking-tight text-center py-20'>
//                     WHY <span className='text-[#f6251a]'>CHOOSE</span> US?
//                 </h1>
//                 <div className="flex flex-wrap justify-center">
//                     {reasons.map((reason, index) => (
//                         <motion.div
//                             key={index}
//                             className={`flex flex-col justify-start items-center shadow-xl bg-gray-50 border rounded-xl p-6 text-center hover:shadow 2xl:w-1/5 md:w-1/5 w-full m-4`} // Adjusting width
//                             initial="hidden"
//                             whileInView="visible"
//                             viewport={{ amount: 0.3 }} // Animate when 30% of the element is in view
//                             transition={{ duration: 0.3, delay: index * 0.3 }} // Staggered animations
//                             variants={variants}
//                         >
//                             <div className='pt-4'>{reason.icon}</div>
//                             <h3 className="text-lg font-semibold text-[#f6251a] mt-4">{reason.title}</h3>
//                             <p className="mt-2 text-gray-600">{reason.description}</p>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WhyChooseUs;