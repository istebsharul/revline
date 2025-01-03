import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrustBanner = () => {
    const navigate = useNavigate();

    const handleContact = () => {
        navigate('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleParts = () => {
        navigate('/parts');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className='relative w-full flex justify-center items-center'>
            <div className="w-4/5 md:w-2/3 flex flex-col items-center justify-center bg-[#f6251a] text-white py-12 md:py-20 px-4 md:px-8 rounded-lg mx-2 md:mx-4 my-4 md:my-8">
                <h2 className="text-center text-lg md:text-3xl font-inter">
                    PROUDLY TRUSTED BY OVER 6,000+ CAR ENTHUSIASTS<br />
                    YOUR TRUSTED PARTNER FOR QUALITY AUTO PARTS
                </h2>
                <div className="w-4/5 md:w-1/2 flex flex-col md:flex-row justify-center mt-6 md:mt-8 md:space-x-4 space-y-2 md:space-y-0 text-sm">
                    <button
                        onClick={handleParts}
                        className="w-full bg-white text-[#f6251a] font-medium py-2 px-4 md:px-8 rounded-lg hover:bg-gray-200 transition">
                        PARTS
                    </button>
                    <button
                        onClick={handleContact}
                        className="w-full bg-transparent border border-white text-white font-medium py-2 px-4 md:px-8 rounded-lg hover:bg-white hover:text-[#f6251a] transition">
                        CONTACT US
                    </button>
                </div>
            </div>
            <div className='absolute bottom-0 bg-black w-full h-20 md:h-40 z-[-1]'></div>
        </div>

    );
};

export default TrustBanner;
