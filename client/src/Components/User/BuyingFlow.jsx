import React from 'react';
import { FaSearch, FaClipboardList, FaFileInvoiceDollar, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BuyingFlow = React.forwardRef((props, ref) => {
    const steps = [
        {
            icon: <FaSearch className="md:text-5xl text-2xl text-black mb-4" />,
            title: 'Find a Part',
            description: 'Browse through our extensive catalog to find the right auto part for your vehicle.',
        },
        {
            icon: <FaClipboardList className="md:text-5xl text-2xl text-black mb-4" />,
            title: 'Fill Up Details',
            description: 'Provide necessary details like vehicle model, year, and variant to ensure compatibility.',
        },
        {
            icon: <FaFileInvoiceDollar className="md:text-5xl text-2xl text-black mb-4" />,
            title: 'Receive Quotation',
            description: 'Once your details are verified, you will receive a quotation, click pay to make payments',
        },
        {
            icon: <FaCheckCircle className="md:text-5xl text-2xl text-black mb-4" />,
            title: 'Order Placed',
            description: 'After payment, your order is confirmed, and the part will be shipped to your address.',
        },
    ];

    // Animation variants for Framer Motion
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="md:pb-20 pb-20" ref={ref}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className='md:md:text-5xl text-2xl text-4xl font-inter tracking-tight text-center py-20'>
                    FLOW OF <span className='text-[#f6251a]'>BUYING</span> PARTS
                </h1>
                <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="md:w-full w-4/5 h-full flex flex-col justify-start items-center bg-white rounded-xl p-6 text-center hover:shadow relative"
                            initial="hidden" // Animation starts hidden
                            whileInView="visible" // Animates when in view
                            viewport={{ amount: 0.1 }} // Animates every time 30% of the element is in view
                            transition={{ duration: 0.3, delay: index * 0.2 }} // Duration and delay for stagger effect
                            variants={variants} // Apply animation variants
                        >
                            {/* Step Number */}
                            <div className="absolute -top-6 w-12 h-12 rounded-full bg-[#f6251a] flex items-center justify-center text-white text-2xl font-bold">
                                {index + 1}
                            </div>
                            <div className='flex md:flex-col md:justify-center md:items-center pt-4 gap-2 md:gap-0 md:pt-0'>
                                <div className='md:pt-10'>{step.icon}</div>
                                <h3 className="text-lg font-semibold text-[#f6251a] md:mt-4">{step.title}</h3>
                            </div>
                            <p className="mt-2 text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default BuyingFlow;
