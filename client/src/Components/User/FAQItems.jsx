import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const faqItems = [
    {
        question: "Can I trust the quality of the used parts I purchase from Revline Auto Parts?",
        answer: "At Revline Auto Parts, we provide genuine OEM (Original Equipment Manufacturer) used parts that undergo a thorough inspection before being listed. These parts are verified for functionality and reliability, ensuring they will fit your vehicle perfectly and restore its efficiency. Purchasing from us guarantees that you receive quality parts at an affordable price."
    },
    {
        question: "What are the benefits of choosing used or 'green' auto parts?",
        answer: "Opting for used auto parts offers several advantages:\n• Cost-Effective: They are significantly less expensive than brand-new parts, often saving you up to 50% or more.\n• Eco-Friendly: 'Green' parts help reduce waste by recycling quality components, making them an environmentally friendly option.\n• Compatibility: Used OEM parts come directly from your vehicle’s manufacturer, ensuring a perfect fit and performance, unlike some aftermarket alternatives."
    },
    {
        question: "How does choosing used parts benefit the environment?",
        answer: "By choosing used parts, you help reduce waste and conserve resources. Recycling functional components that might otherwise be discarded lowers the demand for new parts and decreases the carbon footprint associated with manufacturing, contributing to a more sustainable future."
    },
    {
        question: "How can I place an order for auto parts?",
        answer: "You can easily place an order on our website:\n• Browse our catalog and select the parts you need.\n• Provide Vehicle Details: Enter your vehicle's make, model, and year to ensure compatibility.\n• Assistance: If you're unsure, contact our team with your Vehicle Identification Number (VIN), and we'll help you find the exact part you need.\n• Checkout: Complete the purchase by following the checkout process.\nOnce confirmed, you'll receive an invoice, and after payment, we'll dispatch the part to your specified address."
    },
    {
        question: "How long does shipping take?",
        answer: "• Order Processing: We process orders within 1-2 business days.\n• Delivery Timeframes:\n   o Non-Freight Items (less than 70 pounds): Estimated delivery is 5-7 business days after dispatch.\n   o Freight Items (more than 70 pounds): Estimated delivery is 7-10 business days after dispatch.\nDelivery times may vary based on your location."
    },
    {
        question: "How do I track my order once it's shipped?",
        answer: "• Online Account: Log in to your account on our website to track your order status, view tracking numbers, and monitor your shipment in real-time. You can also manage returns and submit support tickets or inquiries.\n• Email and SMS Notifications: You'll receive email and SMS updates when your order is placed, shipped (including tracking ID), and delivered. Ensure your email address and mobile number are correctly entered during checkout to receive timely updates."
    },
    {
        question: "Do you provide a warranty on used parts?",
        answer: "Yes, all parts purchased from Revline Auto Parts come with a 30-day warranty starting from the date of purchase. If the part is damaged or faulty, you can request a replacement or a refund within this warranty period. Our goal is to ensure your satisfaction with every purchase."
    },
    {
        question: "What should I do if I receive the wrong or defective part?",
        answer: "If you receive an incorrect or damaged part:\n• Contact Us Immediately: Reach out via phone or email.\n• Return Process: We'll guide you through the return process and provide a Return Merchandise Authorization (RMA) form.\n• Resolution: We will arrange for a replacement or refund promptly."
    },
    {
        question: "Why do you only ship to the billing address?",
        answer: "To prevent fraudulent transactions, we generally ship parts only to the billing address associated with the payment method. If you prefer to ship to a business address or a different location, please contact us to discuss available options."
    },
    {
        question: "Is in-store pickup available for my order?",
        answer: "Currently, we do not offer in-store pickup. All orders will be shipped directly to your specified address to provide a convenient and efficient service."
    },
    {
        question: "How can I be sure the part will fit my vehicle?",
        answer: "To ensure compatibility:\n• Vehicle Search: Use our website to search for parts based on your vehicle's make, model, and year.\n• VIN Verification: Provide your Vehicle Identification Number (VIN) for additional assurance.\nOur team will verify the part's fitment before processing your order."
    },
    {
        question: "What are my payment options?",
        answer: "We accept various payment methods:\n• Credit and Debit Cards\n• PayPal\n• Wire Transfers (for larger orders)\nSelect the payment method that is most convenient for you during checkout."
    },
    {
        question: "Can I get a discount if I order in bulk?",
        answer: "Yes, we offer special pricing for bulk orders. If you're interested in purchasing multiple parts or placing a wholesale order, please contact our sales team to discuss available discounts and terms."
    },
    {
        question: "How can I get in touch with customer support?",
        answer: "Our customer support team is available to assist you:\n• Phone:\n• Email: Support@revlineautoparts.com\nWe aim to respond to all inquiries within 24 hours."
    },
    {
        question: "Do you offer any discounts or loyalty programs?",
        answer: "Yes, we regularly offer special promotions and discounts for both new and returning customers. We also have a loyalty program where you can earn points for every purchase, redeemable for discounts on future orders."
    },
    {
        question: "How do I handle returns or refunds?",
        answer: "If you need to return a part:\n• Contact Us within 30 days of your purchase.\n• Receive RMA: We'll provide a Return Merchandise Authorization (RMA) form and instructions.\n• Return Shipment: Ship the item back to us following the provided guidelines.\n• Processing: Upon receiving the part, we'll process your refund or send a replacement based on your preference."
    },
    {
        question: "Will I receive notifications about my order status?",
        answer: "Yes, we keep you informed throughout the process:\n• Order Confirmation: Email and SMS notification when your order is placed.\n• Shipping Updates: Email and SMS notification when your order is shipped, including tracking ID.\n• Delivery Confirmation: SMS notification when your order is delivered.\nEnsure your contact information is accurate to receive timely updates."
    },
    {
        question: "Can I change or cancel my order after it's been placed?",
        answer: "If you need to modify or cancel your order:\n• Contact Us As Soon As Possible: Changes or cancellations can only be made before the order has been shipped.\n• Limitations: Once the order is dispatched, we may not be able to accommodate changes or cancellations."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we do not offer international shipping. We deliver orders throughout the United States. Please check back in the future for any updates to our shipping destinations."
    },
    {
        question: "Are there any restrictions on shipping addresses?",
        answer: "Yes, we do not ship to P.O. Box addresses. Please provide a valid residential or business address for delivery to ensure a smooth shipping process."
    },
    {
        question: "What if I have additional questions not covered here?",
        answer: "We're here to help! If you have any other questions or need further assistance, please don't hesitate to contact our customer support team via phone or email.\nContact Information:\n• Phone: +1 855-600-9080\n• Email: Support@revlineautoparts.com"
    }
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
                                    <div className="max-w-4xl py-4 text-md font-light text-gray-900 flex flex-col justify-center">
                                        {item.answer.split('\n').map((line, index) => (
                                            <p key={index} className="mb-2">
                                                {line}
                                            </p>
                                        ))}
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
