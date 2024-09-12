import React from 'react';
import { FaCheckCircle, FaDollarSign, FaShippingFast, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: <FaCheckCircle className="text-5xl text-black mb-4" />,
            title: 'Quality Parts',
            description: 'Our auto parts are fully tested and inspected to ensure top-notch quality.',
        },
        {
            icon: <FaDollarSign className="text-5xl text-black mb-4" />,
            title: 'Affordable Prices',
            description: 'We offer competitive pricing on all our products without compromising on quality.',
        },
        {
            icon: <FaShippingFast className="text-5xl text-black mb-4" />,
            title: 'Fast Shipping',
            description: 'Get your auto parts delivered quickly with our fast and reliable shipping options.',
        },
        {
            icon: <FaHeadset className="text-5xl text-black mb-4" />,
            title: 'Excellent Support',
            description: 'Our support team is available 24/7 to assist you with any questions or concerns.',
        },
    ];

    // Animation variants for Framer Motion
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="md:pb-40 pb-20 bg-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className='md:text-5xl text-4xl font-inter tracking-tight text-center py-20'>
                    WHY <span className='text-red-600'>CHOOSE</span> US?
                </h1>
                <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            className="md:w-full w-4/5 h-full flex flex-col justify-start items-center bg-white rounded-xl p-6 text-center hover:shadow"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }} // Animate when 30% of the element is in view
                            transition={{ duration: 0.5, delay: index * 0.4 }} // Staggered animations
                            variants={variants}
                        >
                            <div className='pt-4'>{reason.icon}</div>
                            <h3 className="text-lg font-semibold text-red-600 mt-4">{reason.title}</h3>
                            <p className="mt-2 text-gray-600">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
