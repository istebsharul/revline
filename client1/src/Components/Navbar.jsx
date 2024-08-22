import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Cta from './Cta';


function Navbar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full flex justify-center items-center fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="w-full lg:w-4/6 md:flex md:justify-between md:items-center md:px-4 md:rounded-full md:p-0 p-4">
                {/* LOGO */}
                <div className='flex md:flex-col items-center justify-between md:block'>
                    <div className="w-[9rem]">
                        <Link to="/">
                            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724180173/revline/kn373iik4j6x2txiqs0p.png" alt="Logo" width={200} height={100} />
                        </Link>
                    </div>
                    {/* HAMBURGER BUTTON FOR MOBILE */}
                    <div className="md:hidden">
                        <button
                            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border transform transition-transform duration-300"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? <FiX size={30} /> : <FiMenu size={30} />}
                        </button>
                    </div>
                </div>
                <div className={`transparent text-black flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'}`}>
                    <ul className="text-black text-sm md:h-fit items-center justify-center md:flex relative">
                        {['/Home', '/About', '/Warranty', '/FAQ', '/Contact'].map((path, index) => (
                            <li key={index} className="hover:text-red-600 pb-3 text-[1rem] py-2 md:px-6 text-center transform transition-transform hover:translate-y-1">
                                <Link to={path.toLowerCase()} onClick={() => setNavbar(false)}>
                                    <div>
                                        {path.slice(1) || 'Home'}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden md:block">
                    <Cta />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;