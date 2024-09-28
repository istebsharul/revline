import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const faqItems = [
    {
        question: "What’s so Unique about you?",
        answer: "Because we don’t maintain our separate entity but become an integrated division and component of your company and operations. We become a very needed extension that boosts your desired growth."
    },
    {
        question: "So, what’s the difference between you guys and a freelancer?",
        answer: "We work as an integrated part of your team, providing a broader range of services and support compared to freelancers."
    },
    {
        question: "What other services do you offer?",
        answer: "We offer a wide range of services including SEO, PPC, content marketing, and email marketing."
    },
    {
        question: "So, what’s the difference between you guys and a freelancer?",
        answer: "We work as an integrated part of your team, providing a broader range of services and support compared to freelancers."
    },
    {
        question: "What other services do you offer?",
        answer: "We offer a wide range of services including SEO, PPC, content marketing, and email marketing."
    },
    // Add more FAQ items as needed
];

const FAQItems = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <>
            <div className="md:w-full flex md:flex-row flex-col justify-center items-start text-black mb-0 pb-0 md:px-[10rem] text-black">
                <div className='2xl:w-3/5 lg:w-3/6'>
                    <div className="w-full md:px-0 px-10 md:ml-4 space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex justify-between items-center w-full py-2 text-left 2xl:text-lg lg:text-md font-medium transition-transform duration-300"
                                >
                                    {item.question}
                                    <span className={`text-4xl transition-transform ml-2 font-light duration-300 ${expandedIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                                        +
                                    </span>
                                </button>
                                {expandedIndex === index && (
                                    <div className="py-4 text-sm font-light text-gray-900">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center py-20'>
                <h1 className='mb-5'>Still got questions?</h1>
                <a 
                href="/contact"
                className='flex justify-center items-center px-4 py-2 rounded-3xl bg-gradient-to-r from-red-800 to-red-400 text-white transition duration-300 ease-in-out hover:from-red-900 hover:to-red-500'>
                    Contact Us
                    <FaChevronRight />
                </a>
            </div>
        </>
    );
};

export default FAQItems;
