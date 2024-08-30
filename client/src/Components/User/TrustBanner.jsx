import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrustBanner = () => {
    const navigate = useNavigate();

    const handleContact = () => {
        navigate('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleParts = () =>{
        navigate('/parts');
        window.scrollTo({top:0,behavior:'smooth'});
    }

    return (
        <div className='relative w-full flex justify-center items-center'>
            <div className="w-2/3 flex flex-col items-center justify-center bg-red-600 text-white py-20 px-8 rounded-lg mx-4 my-8">
                <h2 className="text-center text-2xl md:text-3xl font-inter">
                    WE ARE TRUSTED BY OVER 10K CUSTOMERS.<br />
                    WE CARE FOR YOU LIKE YOU CARE FOR YOUR CAR.
                </h2>
                <div className="w-1/2 flex md:flex-row flex-col justify-center mt-8 md:space-x-4 md:space-y-0 space-y-2 text-sm">
                    <button 
                        onClick={handleParts}
                        className="w-full bg-white text-red-600 font-medium py-2 px-8 rounded-lg hover:bg-gray-200 transition">
                        PRODUCTS
                    </button>
                    <button 
                        onClick={handleContact}
                        className="w-full bg-transparent border border-white text-white font-medium py-2 px-8 rounded-lg hover:bg-white hover:text-red-600 transition">
                        CONTACT US
                    </button>
                </div>
            </div>
            <div className='absolute bottom-0 bg-black w-full h-40 z-[-1]'></div>
        </div>
    );
};

export default TrustBanner;
