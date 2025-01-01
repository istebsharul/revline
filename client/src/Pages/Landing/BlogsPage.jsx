import React, { useState, useEffect, useRef } from 'react';
import Banner from '../../Components/User/Banner';
import { useParams } from 'react-router-dom';
import BlogCTA from '../../Components/Blogs/BlogCTA';
import BlogCTADark from '../../Components/Blogs/BlogCTADark';
import BuyingFlow from '../../Components/User/BuyingFlow';
import PartCarousel from '../../Components/Blogs/PartCarousel';
import Models from '../../Components/Blogs/Models';
import BlogParts from '../../Components/Blogs/BlogParts';
import MultiStepForm from '../../Components/User/Form/MultiStepForm';
import blogdata from '../../data/blogdata.json';

import Ford from '../../Assets/Company/ford.png';
import Toyota from '../../Assets/Company/toyota.png';
import Chevrolet from '../../Assets/Company/chevrolet.png';
import Honda from '../../Assets/Company/honda.webp';
import Nissan from '../../Assets/Company/nissan.png';
import Hyundai from '../../Assets/Company/hyundai.png';
import Kia from '../../Assets/Company/kia.png';
import Jeep from '../../Assets/Company/jeep.png';
import Subaru from '../../Assets/Company/subaru.png';
import Dodge from '../../Assets/Company/dodge.png';
import GMC from '../../Assets/Company/gmc.png';
import Volkswagen from '../../Assets/Company/volkswagen.png';
import Mazda from '../../Assets/Company/mazda.png';
import Ram from '../../Assets/Company/ram.png';
import Buick from '../../Assets/Company/buick.png';
import Chrysler from '../../Assets/Company/chrysler.png';
import Mitsubishi from '../../Assets/Company/mitsubishi.png';
import Fiat from '../../Assets/Company/fiat.png';

const getCompanyLogoUrl = {
    ford: Ford,
    toyota: Toyota,
    chevrolet: Chevrolet,
    honda: Honda,
    nissan: Nissan,
    hyundai: Hyundai,
    kia: Kia,
    jeep: Jeep,
    subaru: Subaru,
    dodge: Dodge,
    gmc: GMC,
    volkswagen: Volkswagen,
    mazda: Mazda,
    ram: Ram,
    buick: Buick,
    chrysler: Chrysler,
    mitsubishi: Mitsubishi,
    fiat: Fiat,
  };

function BlogsPage() {
    const { make } = useParams('make');
    const [isOpen, setIsOpen] = useState(false);
    
    function getMakeData (make){
        return blogdata[make] || 'Make not found';
    }

    const data = getMakeData(make);

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
        // <div className='flex flex-col justify-center items-center md:pt-10 pt-16 bg-gray-100 relative'>
        //     <div className='relative'>
        //         <Banner />
        //         <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter capitalize'>
        //             {make}
        //         </p>
        //     </div>

        //     {isOpen && (
        //         <div className="w-full h-full bg-black/20 flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-10">
        //             <div className='w-[28rem] p-10' ref={popupRef}>
        //                 <MultiStepForm />
        //             </div>
        //         </div>
        //     )}


        //     <div className='w-3/5 mt-4'>
        //         <ul className='w-full flex border-black border-b p-2 gap-1'>
        //             <li className='hover:underline' ><a href='/blogs'>Home</a></li> {'>'}
        //             <li className='text-red-600 hover:underline capitalize'>{make}</li>
        //         </ul>
        //     </div>
        //     <div className='w-full h-min flex justify-center items-center relative'>
        //         <span className='text-center font-black text-red-500/10 tracking-wider select-none 2xl:text-[10rem] text-[8vw]'>
        //             REVLINE AUTOPARTS
        //         </span>
        //         <p className='text-4xl font-extrabold uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        //             {make} SPARE PARTS
        //         </p>
        //     </div>
        //     <div className='w-3/5 space-y-28'>
        //         {/* Summary */}
        //         <div className='w-full flex justify-between items-center'>
        //             <div className='w-3/5 space-y-4'>
        //                 <h1 className='text-3xl font-bold mb-4 text-red-500'>Summary</h1>
        //                 <p>{data?.summary}</p>
        //                 <BlogCTA togglePopup={togglePopup} />
        //             </div>
        //             <div className='w-1/3'>
        //                 <img src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735587867/revlineautoparts/Assets/Blogs/tjpzqlkbf0dkpm3ef5sq.png" alt="" />
        //             </div>
        //         </div>

        //         {/* History */}
        //         <div className='flex justify-center items-center'>
        //             <img className='w-1/4' src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1729154055/revlineautoparts/Company/afbqwqcybi09hvkokmux.png" alt="" />
        //             <div className='w-3/4'>
        //                 <h1 className='text-2xl font-bold'>Did You Know?</h1>
        //                 <p>{data?.history}</p>
        //             </div>
        //         </div>

        //         {/* Video */}
        //         {/* <div className='flex justify-center items-center'>
        //             <iframe width="720" height="400" src="https://www.youtube.com/embed/SyK9PTZ3hfo?si=SpIEgaLG9tMOEGGx" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true" ></iframe>
        //         </div> */}

        //         {/* Buyer's Guide */}
        //         <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        //             {/* Buyer's Guide Section */}
        //             <div className="space-y-4">
        //                 <h1 className="text-2xl font-bold mb-4 text-red-500">Buyer's Guide</h1>
        //                 <p className="text-gray-700 leading-relaxed">
        //                     When it comes to maintaining or repairing your Ford vehicle, choosing the right parts is crucial for ensuring optimal performance and longevity. At Revline Auto Parts, we understand the importance of using reliable, high-quality parts that are compatible with your vehicle.
        //                 </p>
        //                 <p className="text-gray-700 leading-relaxed">
        //                     Whether you're looking for OEM (Original Equipment Manufacturer) or aftermarket parts, we guide you through the process of selecting the best option for your specific needs.
        //                 </p>
        //                 <p className="text-gray-700 leading-relaxed">
        //                     It's essential to make informed decisions when purchasing parts, as using the wrong component can lead to poor performance or further damage. Always ensure that the part you choose is compatible with your vehicle's make, model, and year. Additionally, check for warranties or guarantees to ensure peace of mind when buying parts for your Ford.
        //                 </p>
        //             </div>

        //             {/* Key Considerations Section */}
        //             <div className="flex justify-between items-start">
        //                 <div className="w-1/2 space-y-4">
        //                     <h2 className="text-lg font-semibold mb-4">Key Considerations When Buying Ford Parts:</h2>
        //                     <ul className="space-y-3 list-decimal pl-5">
        //                         <li>Compatibility: Ensure the part is made for your specific Ford model and year.</li>
        //                         <li>Quality: Look for high-quality parts, whether OEM or aftermarket.</li>
        //                         <li>Warranty: Verify the warranty or return policy for added security.</li>
        //                         <li>Condition: Inspect parts for any visible damage or signs of wear.</li>
        //                         <li>Trusted Sources: Purchase from reputable suppliers to ensure reliability and performance.</li>
        //                     </ul>
        //                 </div>
        //                 <div className="2xl:w-1/4">
        //                     <img
        //                         className="w-full rounded-lg"
        //                         src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735482327/revlineautoparts/Assets/Blogs/fky7apz3selw6qudrpn8.png"
        //                         alt="Ford Parts"
        //                     />
        //                 </div>
        //             </div>

        //             {/* How We Can Help Section */}
        //             <div className="space-y-4">
        //                 <h1 className="text-xl font-bold mb-4">How Revline Auto Parts Can Help</h1>
        //                 <p className="text-gray-700 leading-relaxed">
        //                     While we don't sell parts directly, Revline Auto Parts connects you with trusted suppliers to find the right parts for your Ford vehicle. With our extensive network of suppliers, we ensure you have access to the best components, whether you're looking for replacement parts or upgrades. Let us help you find the perfect part for your Ford to get your vehicle back in top condition.
        //                 </p>
        //                 <BlogCTA togglePopup={togglePopup} />
        //             </div>
        //         </div>

        //     </div>
        //     {/* Buying Flow */}
        //     <BuyingFlow />

        //     <div className='w-4/5'>
        //         <PartCarousel />
        //     </div>

        //     <div className='w-3/5'>
        //         <Models models={data?.models}
        //         />

        //         <BlogParts
        //             parts={data?.parts}
        //         />
        //         {/* Banner */}
        //         <div className='w-full flex justify-center items-center my-20'>
        //             <div className='w-full relative'>
        //                 <img className='w-full h-[20rem] object-cover rounded-3xl' src='https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735571463/revlineautoparts/Assets/Blogs/ssysopidx5rwtfubgnox.jpg' alt='banner Image' />
        //                 <div className="rounded-3xl absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        //                 <h1 className='2xl:w-1/2 md:w-2/3 absolute top-[4rem] left-[3rem] text-4xl text-white leading-normal'>Looking for Affordable High-Quality OEM Parts?</h1>
        //                 <div className='absolute top-[12rem] left-[3rem]'>
        //                     <BlogCTADark togglePopup={togglePopup} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </div>
        <div className='flex flex-col justify-center items-center md:pt-10 pt-16 bg-gray-100 relative'>
            <div className='relative'>
                <Banner />
                <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter capitalize'>
                    {make}
                </p>
            </div>

            {isOpen && (
                <div className="w-full h-full bg-black/20 flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:p-10">
                    <div className='w-[28rem] p-10' ref={popupRef}>
                        <MultiStepForm />
                    </div>
                </div>
            )}

            <div className='w-full md:w-3/5 2xl:mt-4 p-4'>
                <ul className='w-full flex border-black border-b p-2 gap-1'>
                    <li className='hover:underline' ><a href='/blogs'>Home</a></li> {'>'}
                    <li className='text-red-600 hover:underline capitalize'>{make}</li>
                </ul>
            </div>

            <div className='w-full h-min flex justify-center items-center relative'>
                <span className='text-center font-black text-red-500/10 tracking-wider select-none 2xl:text-[10rem] text-[8vw]'>
                    REVLINE AUTOPARTS
                </span>
                <p className='2xl:text-4xl text-md font-extrabold uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-nowrap'>
                    {make} SPARE PARTS
                </p>
            </div>

            <div className='w-full sm:w-4/5 lg:w-3/5 space-y-8'>
                {/* Summary */}
                <div className='w-full flex flex-col md:flex-row justify-between items-center p-10'>
                    <div className='w-full md:w-3/5 space-y-4'>
                        <h1 className='text-3xl font-bold mb-4 text-red-500'>Summary</h1>
                        <p>{data?.summary}</p>
                        <BlogCTA togglePopup={togglePopup} />
                    </div>
                    <div className='w-full md:w-1/3'>
                        <img className="w-full" src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735587867/revlineautoparts/Assets/Blogs/tjpzqlkbf0dkpm3ef5sq.png" alt="" />
                    </div>
                </div>

                {/* History */}
                <div className='flex flex-col md:flex-row justify-center items-center p-6 md:text-left text-center md:space-x-8 md:space-y-0 space-y-8'>
                    <img className='w-1/2 md:w-1/4 ' src={getCompanyLogoUrl[make]} alt="ford logo" />
                    <div className='w-full md:w-3/4'>
                        <h1 className='text-2xl font-bold'>Did You Know?</h1>
                        <p>{data?.history}</p>
                    </div>
                </div>

                {/* Buyer's Guide */}
                <div className="max-w-screen-lg mx-auto 2xl:px-4 2xl:py-8 p-8 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold mb-4 text-red-500">Buyer's Guide</h1>
                        <p className="text-gray-700 leading-relaxed">
                            When it comes to maintaining or repairing your Ford vehicle, choosing the right parts is crucial for ensuring optimal performance and longevity. At Revline Auto Parts, we understand the importance of using reliable, high-quality parts that are compatible with your vehicle.
                        </p>
                    </div>

                    {/* Key Considerations Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/2 space-y-4">
                            <h2 className="text-lg font-semibold mb-4">Key Considerations When Buying Ford Parts:</h2>
                            <ul className="space-y-3 list-decimal pl-5">
                                <li>Compatibility: Ensure the part is made for your specific Ford model and year.</li>
                                <li>Quality: Look for high-quality parts, whether OEM or aftermarket.</li>
                                <li>Warranty: Verify the warranty or return policy for added security.</li>
                                <li>Condition: Inspect parts for any visible damage or signs of wear.</li>
                                <li>Trusted Sources: Purchase from reputable suppliers to ensure reliability and performance.</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/4">
                            <img
                                className="w-full rounded-lg"
                                src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735482327/revlineautoparts/Assets/Blogs/fky7apz3selw6qudrpn8.png"
                                alt="Ford Parts"
                            />
                        </div>
                    </div>

                    {/* How We Can Help Section */}
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold mb-4">How Revline Auto Parts Can Help</h1>
                        <p className="text-gray-700 leading-relaxed">
                            While we don't sell parts directly, Revline Auto Parts connects you with trusted suppliers to find the right parts for your Ford vehicle. With our extensive network of suppliers, we ensure you have access to the best components, whether you're looking for replacement parts or upgrades. Let us help you find the perfect part for your Ford to get your vehicle back in top condition.
                        </p>
                        <BlogCTA togglePopup={togglePopup} />
                    </div>
                </div>
            </div>

            {/* Buying Flow */}
            <BuyingFlow />

            <div className='w-full h-full md:w-4/5'>
                <PartCarousel />
            </div>

            <div className='w-full md:w-3/5 p-6'>
                <Models models={data?.models} />
                <BlogParts parts={data?.parts} />
                
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

export default BlogsPage;