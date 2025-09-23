import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams } from 'react-router-dom';
import BlogCTADark from '../../Components/Blogs/BlogCTADark';
import MultiStepForm from '../../Components/User/Form/MultiStepForm';
import blogdata from '../../data/partblogdata.json';
import PartsModel from '../../Components/Blogs/PartsModel';
import PartsTabbedView from '../../Components/Blogs/PartsTabbedView';
import VideoComponent from '../../Components/User/VideoComponent';
import MovingBrands from '../../Components/User/MovingBrands';
import WhyChooseUs from '../../Components/User/WhyChooseUs';

import googleLogo from '../../Assets/Blog/google.png';
import TrustpilotLogo from '../../Assets/Blog/trust-pilot.png';
import BBALogo from '../../Assets/Blog/bba.png';
import BestSeller from '../../Components/User/BestSeller';
import FAQ from '../../Components/User/FAQ';
import BuyingFlow from '../../Components/User/BuyingFlow';
import Testimonials from '../../Components/User/Testimonials';
import SubCTA from '../../Components/User/Sub-CTA';
import SubCTA2 from '../../Components/User/SubCTA2';
import AutoSlider from '../../Components/Blogs/AutoSlider';

const carouselItems = [
    {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599518/Adobe_Express_-_file_4_gp7kbf.png",
        "altText": "Item 1"
    },
    {
        "id": 2,
        "imageUrl": "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599520/Adobe_Express_-_file_5_ecsmig.png",
        "altText": "Item 2"
    },
    {
        "id": 3,
        "imageUrl": "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599517/Adobe_Express_-_file_3_hgvv8a.png",
        "altText": "Item 3"
    },
    {
        "id": 4,
        "imageUrl": "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599516/Adobe_Express_-_file_6_u5ckej.png",
        "altText": "Item 4"
    }
];

const reviews = [
    {
        id: 1,
        name: "Google Reviews",
        rating: "4.8/5",
        image: googleLogo, // Replace with your Google logo
    },
    {
        id: 2,
        name: "Trustpilot",
        rating: "4.6/5",
        image: TrustpilotLogo, // Replace with your Trustpilot logo
    },
    {
        id: 3,
        name: "BBA Accreditation", // Or Facebook, Yelp, Capterra, etc.
        rating: "4.7/5",
        image: BBALogo, // Replace with your third logo
    },
];

function NewPartsBlogsPage() {
    const { part } = useParams('part');
    const [isOpen, setIsOpen] = useState(false);

    function getMakeData(part) {
        return blogdata[part] || 'Make not found';
    }

    const data = getMakeData(part);

    // Create a reference for the popup container
    const popupRef = useRef(null);

    // Function to toggle the popup
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    // Close the popup when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                togglePopup(); // Close the popup if clicked outside
            }
        };

        // Add the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [togglePopup]);


    return (
        <div className='w-full flex flex-col justify-center items-center md:pt-16 pt-16 bg-gray-100 relative'>
            <Helmet>
                {/* ✅ Meta Title (60 char max) */}
                <title>Used ABS Modules & ABS Pumps | OEM Tested | Fast Shipping</title>

                {/* ✅ Meta Description (150–160 chars) */}
                <meta
                    name="description"
                    content="Buy OEM-tested ABS modules, pumps & hydraulic units. VIN-verified fitment, 12-month warranty, and fast U.S. shipping."
                />

                {/* ✅ Meta Keywords */}
                <meta
                    name="keywords"
                    content="used ABS module, ABS pump, ABS hydraulic unit, buy ABS module, OEM ABS control module, Ford ABS module, Chevy ABS module, Toyota ABS module"
                />

                {/* Open Graph */}
                <meta property="og:title" content="Used ABS Modules & ABS Pumps | OEM Tested | Fast Shipping" />
                <meta property="og:description" content="Buy OEM-tested ABS modules, pumps & hydraulic units. VIN-verified fitment, 12-month warranty, and fast U.S. shipping." />
                <meta
                    property="og:image"
                    content="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812894/revlineautoparts/Logo/pfmbwdtq2eswnpcrqghn.png"
                />
                <meta property="og:url" content="https://revlineautoparts.com/parts/abs" />
                <meta property="og:type" content="product" />
                <meta property="og:site_name" content="Revline AutoParts" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Used ABS Modules & ABS Pumps | OEM Tested | Fast Shipping" />
                <meta name="twitter:description" content="Buy OEM-tested ABS modules, pumps & hydraulic units. VIN-verified fitment, 12-month warranty, and fast U.S. shipping." />

                {/* Canonical */}
                <link rel="canonical" href="https://revlineautoparts.com/parts/abs" />

                {/* JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(
                        {
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": "Used ABS Modules & ABS Pumps",
                            "description":
                                "Buy OEM-tested ABS modules, pumps & hydraulic units. VIN-verified fitment, 12-month warranty, and fast U.S. shipping.",
                            "image":
                                "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812894/revlineautoparts/Logo/pfmbwdtq2eswnpcrqghn.png",
                            "brand": {
                                "@type": "Brand",
                                "name": "Revline AutoParts",
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "reviewCount": "124",
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": "https://revlineautoparts.com/parts/abs",
                                "priceCurrency": "USD",
                                "lowPrice": "150",
                                "highPrice": "500",
                                "offerCount": "200",
                                "availability": "https://schema.org/InStock",
                                "seller": {
                                    "@type": "Organization",
                                    "name": "Revline AutoParts",
                                },
                            },
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "https://revlineautoparts.com/parts/abs",
                            },
                        },
                        null,
                        2
                    )}
                </script>
            </Helmet>

            {isOpen && (
                <div className="w-full h-full bg-black/20 flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:p-10">
                    <div className='w-[28rem] p-10' ref={popupRef}>
                        <MultiStepForm />
                    </div>
                </div>
            )}

            <div className='w-full space-y-10 py-6 flex justify-center items-center flex-col'>
                {/* Summary */}
                <div className='2xl:w-3/5 md:w-4/6 flex md:flex-row flex-col justify-center items-center'>
                    <div className='md:w-1/2 flex flex-col justify-center md:items-start items-center md:space-y-4'>
                        <h1 className='md:w-full w-4/5 md:text-left text-center text-black md:text-5xl 2xl:text-5xl text-3xl leading-tight md:pt-16 md:p-0 p-4'>
                            Used <span className='font-semibold italic text-red-600'>ABS</span> Control Modules & <span className='font-semibold italic text-red-600'>ABS</span> Pumps
                        </h1>
                        <p className='md:text-left md:px-0 px-8 text-center 2xl:text-lg text-sm'>Stop hunting across generic parts sites. This page is laser-focused on <strong>ABS modules, ABS pumps,</strong> and <strong>Hydraulic control units</strong> -quality-tested, warrantied, and matched to your VIN.</p>
                        <div className="w-3/4 flex justify-center items-center overflow-hidden">
                            {/* <VideoComponent /> */}
                            <AutoSlider images={carouselItems}/>
                        </div>
                    </div>

                    <div className='md:w-1/2 w-full flex md:justify-end justify-center'>
                        <div className='w-4/5'>
                            <MultiStepForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full pt-6 flex flex-col justify-center items-center'>
                <h2 className='md:text-lg text-center px-4 font-bold'>Looking for {data.title} part right now? Use the fitment tool or Call
                    <a href="tel:+18886320709" className="text-[#f6251a] hover:underline">  +1 888 632 0709</a>
                </h2>
                <MovingBrands />
            </div>

            <div className="w-full flex justify-center items-center p-4">
                <div className="flex justify-center items-center ">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={`flex flex-col md:flex-row items-center h-full md:p-4 p-3 gap-4 ${index == reviews.length - 1 ? '' : 'border-r border-gray-400'}`}
                        >
                            <img
                                src={review.image}
                                alt={review.name}
                                className="h-8"
                            />
                            <div className='flex flex-col md:items-start items-center'>
                                <p className="md:text-lg text-xs">{review.name}</p>
                                <p className="md:text-sm text-xs tfont-semibold text-green-600"><span className='text-gray-800'>Ratings</span> {review.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full'>
                <BestSeller />
            </div>

            <BuyingFlow />

            <SubCTA2 togglePopup={togglePopup} part={part} />

            <div className='w-full'>
                <WhyChooseUs />
            </div>

            <div className='w-full md:w-3/5 p-6 md:mt-10 md:space-y-10'>
                <PartsTabbedView part={part} />
                <PartsModel part={part} />
            </div>

            <FAQ />

            <Testimonials />

            <SubCTA togglePopup={togglePopup} part={part} />
        </div>
    );
}

export default NewPartsBlogsPage;