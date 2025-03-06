import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet-async";
import Banner from '../../Components/User/Banner';
import { useParams } from 'react-router-dom';
import BlogCTADark from '../../Components/Blogs/BlogCTADark';
import BuyingFlow from '../../Components/User/BuyingFlow';
import PartCarousel from '../../Components/Blogs/PartCarousel';
import MultiStepForm from '../../Components/User/Form/MultiStepForm';
import blogdata from '../../data/partblogdata.json';
import AutoSlider from '../../Components/Blogs/AutoSlider';
import { SiComma } from "react-icons/si";
import costEffective from '../../Assets/Blog/cost_effective.png';
import tested from '../../Assets/Blog/tested.png';
import ecoFriendly from '../../Assets/Blog/eco_friendly.png';
import wideCompatibility from '../../Assets/Blog/wide_compatibility.png';
import fastShipping from '../../Assets/Blog/fast_shipping.png';
import PartsModel from '../../Components/Blogs/PartsModel';
import PartsTabbedView from '../../Components/Blogs/PartsTabbedView';
import BuyersGuide from '../../Components/Blogs/BuyersGuide';

function PartsBlogsPage() {
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
        console.log(data);
        console.log(blogdata);
        console.log(part);
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
        <div className='flex flex-col justify-center items-center md:pt-10 pt-16 bg-gray-100 relative'>
            <div className='relative'>
                <Banner />
                <p className='absolute md:text-4xl text-2xl inset-0 flex justify-center items-center text-white font-inter capitalize'>
                    {data?.title}
                </p>
            </div>

            {isOpen && (
                <div className="w-full h-full bg-black/20 flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:p-10">
                    <div className='w-[28rem] p-10' ref={popupRef}>
                        <MultiStepForm />
                    </div>
                </div>
            )}

            {/* <div className='w-full md:w-2/3 2xl:mt-4 p-4'>
                <ul className='w-full flex border-black border-b p-2 gap-1'>
                    <li className='hover:underline' ><a href='/parts'>All Parts</a></li> {'>'}
                    <li className='text-red-600 hover:underline capitalize'>{part}</li>
                </ul>
            </div> */}
            <nav aria-label="breadcrumb" className='w-full md:w-2/3 2xl:mt-4 p-4'>
                <ul className="w-full flex justify-start p-2 gap-1  border-black border-b">
                    <li className="hover:underline">
                        <a href="/parts">All Parts</a>
                    </li>{'>'}
                    <li aria-current="page" className="text-red-600 hover:underline capitalize">
                        {part}
                    </li>
                </ul>
            </nav>


            <Helmet>
                <title>Buy Used {data?.title} Parts | High-Quality Auto Parts</title>
                <meta name="description" content={`Looking for high-quality used ${data?.title} parts? Get affordable, reliable, and performance-tested auto parts with fast shipping. Satisfaction guaranteed! Call now: +1-888-632-0709.`} />

                <meta name="keywords" content={`Used ${data?.title} Parts, Buy ${data?.title} Auto Parts, Affordable ${data?.title} Parts, Best ${data?.title} Parts, ${data?.title} Parts for Sale, Discount ${data?.title} Parts, OEM ${data?.title} Parts, Used ${data?.title} Car Parts`} />

                {/* Open Graph Tags for Facebook */}
                <meta property="og:title" content={`Buy Used ${data?.title} Parts | Affordable & Reliable`} />
                <meta property="og:description" content={`Looking for high-quality used ${data?.title} parts? Get affordable, reliable, and performance-tested auto parts with fast shipping. Satisfaction guaranteed! Call now: +1-888-632-0709.`} />
                <meta property="og:image" content={data?.carouselItems[0].imageUrl || "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812894/revlineautoparts/Logo/pfmbwdtq2eswnpcrqghn.png"} />
                <meta property="og:url" content={`https://revlineautoparts.com/parts/${part}`} />
                <meta property="og:type" content="product" />
                <meta property="og:site_name" content="Revline AutoParts" />
                <meta property="og:price:currency" content="USD" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Buy Used ${data?.title} Parts`} />
                <meta name="twitter:description" content={`Looking for high-quality used ${data?.title} parts? Get affordable, reliable, and performance-tested auto parts with fast shipping. Satisfaction guaranteed! Call now: +1-888-632-0709.`} />

                {/* Canonical URL to Prevent Duplicate Content Issues */}
                <link rel="canonical" href={`https://revlineautoparts.com/parts/${part}`} />

                {/* JSON-LD Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": `Used ${data?.title} Parts`,
                        "description": `Looking for high-quality used ${data?.title} parts? Get affordable, reliable, and performance-tested auto parts with fast shipping.`,
                        "image": data?.carouselItems[0].imageUrl || "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812894/revlineautoparts/Logo/pfmbwdtq2eswnpcrqghn.png",
                        "brand": {
                            "@type": "Brand",
                            "name": "Revline AutoParts"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://revlineautoparts.com/parts/${part}`,
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "Organization",
                                "name": "Revline AutoParts"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://revlineautoparts.com/parts/${part}`
                        }
                    }, null, 2)}
                </script>
            </Helmet>



            <div className='w-full sm:w-4/5 lg:w-2/3 space-y-32 flex justify-center items-center flex-col'>
                {/* Summary */}
                <div className='flex'>
                    <div className='w-full flex flex-col md:flex-col justify-center items-start md:space-x-8 md:gap-0 gap-2'>

                        {/* Title */}
                        {data.title && (
                            <h1 className="md:w-3/5 text-2xl md:text-left text-center font-bold text-red-500 px-8 py-4">
                                Used <span className="text-black capitalize">{data?.title}</span> Parts
                            </h1>
                        )}
                        <div className='flex flex-col-reverse md:flex-row justify-between items-center w-full'>
                            <div className='w-11/12 md:w-3/5 space-y-4 text-center md:text-left md:mt-0 mt-5'>
                                <div className='space-y-2'>
                                    {/* Subtitle */}
                                    <h2 className='font-semibold text-lg'>
                                        Buy High-Quality <span className="capitalize">{data?.title}</span> Used Auto Parts - Affordable & Reliable Solutions
                                    </h2>
                                    {/* Dynamically Styled Summary */}
                                    {data.summary && (
                                        <p className="text-gray-700">
                                            {data.summary.map((item, index) =>
                                                item.bold ? <strong key={index}>{item.text}</strong> : item.text
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <div className='md:w-full  flex flex-col md:flex-row justify-between items-center'>
                                        <div className='md:w-1/2'>
                                            <h2 className='font-semibold text-lg'>
                                                Order Your <span className="capitalize">{data?.title}</span> Used Parts from Revline Autoparts Today!
                                            </h2>
                                            <p className='text-gray-700'>
                                                Don’t compromise on safety—choose <span className='font-semibold text-black'>Revline AutoParts</span> for <span className='font-semibold text-black'>high-quality</span>, tested <span className="capitalize font-bold">{part} Used Parts </span> that provide a cost-effective and dependable solution. Browse our inventory and get the right part for your vehicle at the best price!
                                                Shop Now & Drive Safely with Revline AutoParts!
                                            </p>
                                        </div>
                                        <div className="md:w-1/2 flex-shrink-0">
                                            <AutoSlider images={data.carouselItems} />
                                        </div>
                                    </div>
                                    <p className='w-full text-gray-700'>
                                        At <span className='font-semibold text-black'>Revline AutoParts</span>, we provide high-quality used OEM <span className="capitalize font-semibold text-black">{part}</span> parts, ensuring perfect compatibility, tested performance, and affordability for your vehicle.
                                    </p>
                                </div>

                            </div>
                            <div className='w-11/12 md:w-2/5'>
                                <MultiStepForm />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-wrap justify-center gap-6 bg-gray-100">
                    {[
                        { img: costEffective, title: "Cost Effective" },
                        { img: tested, title: "100% Tested" },
                        { img: ecoFriendly, title: "Eco Friendly" },
                        { img: wideCompatibility, title: "Compatibility" },
                        { img: fastShipping, title: "Fast Shipping" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center p-4 group`}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-16 h-16 object-contain mb-3 transition-all duration-300 group-hover:transform group-hover:-translate-y-2"
                            />
                            <h1 className="text-md font-semibold text-red-500 transition-all duration-300">
                                {item.title}
                            </h1>
                        </div>
                    ))}
                </div>


                {/* History */}
                <div className='2xl:w-3/4 md:w-5/6 flex flex-col md:flex-row justify-center items-center md:p-12 p-6 md:text-left text-center md:space-x-8 md:space-y-0 space-y-8 bg-white rounded-xl m-4 relative'>
                    <div className='w-full space-y-2 relative flex flex-col justify-center items-center'>
                        <h1 className='text-center text-2xl font-bold text-red-500'>Did You Know?</h1>

                        {/* Commas positioned in the top-left corner */}
                        <div className='absolute md:top-5 top-4 md:left-10 left-0 flex text-[#f6251a] md:p-4 p-2'>
                            <SiComma className='md:text-2xl text-xl rotate-180' />
                            <SiComma className='md:text-2xl text-xl rotate-180 md:-ml-2 -ml-1' />
                        </div>

                        <p className='w-3/4 text-center pt-4'>{data?.history}</p>
                    </div>
                </div>

                {/* Buying Flow */}
                <BuyingFlow />
            </div>


            <div className='flex justify-center items-center mb-20'>
                <BuyersGuide part={data?.title} description={data?.buyersGuide?.description} details={data?.buyersGuide?.details} />
            </div>

            <div className='w-full h-full md:w-4/5'>
                <PartCarousel />
            </div>

            <div className='w-full md:w-3/5 p-6'>
                <PartsTabbedView part={part} />
                <PartsModel />

                {/* Banner */}
                <div className='w-full flex justify-center items-center my-20'>
                    <div className='w-full relative'>
                        <img className='w-full h-[20rem] object-cover rounded-3xl' src='https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735571463/revlineautoparts/Assets/Blogs/ssysopidx5rwtfubgnox.jpg' alt='banner Image' />
                        <div className="rounded-3xl absolute top-0 left-0 w-full h-full bg-black 2xl:opacity-30 opacity-50"></div>
                        <h1 className='2xl:w-1/2 md:w-2/3 w-fit absolute md:top-[4rem] md:left-[3rem] top-16 left-6 2xl:text-4xl text-[1.7rem] text-white leading-normal'>Looking for Affordable High-Quality OEM Parts?</h1>
                        <div className='absolute md:top-[12rem] md:left-[3rem] top-48 left-6'>
                            <BlogCTADark togglePopup={togglePopup} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartsBlogsPage;