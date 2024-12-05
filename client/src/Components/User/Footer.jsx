import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cta from './Cta';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";


function Footer() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/#form');
  }

  const handleCall = () => {
    const phoneNumber = "+1 855 600 9480"; // Fixed phone number
    const formattedNumber = `tel:${phoneNumber}`; // Use tel: protocol to open the dialer
    window.location.href = formattedNumber;
  };

  return (
    <>
      <footer className="py-4 px-5 2xl:px-64 md:px-44 w-full text-white bg-black flex flex-col justify-between text-center z-50">
        <div className="flex flex-col lg:flex-row justify-around mx-2 my-6">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <img src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812716/revlineautoparts/Logo/tzeavglpto0z7toihv5e.png" width={100} height={100} alt="Logo" className="mx-auto lg:mx-0 w-32 lg:w-3/5" />
            <div className="text-center lg:text-left font-thin text-sm mt-2 lg:mt-0">
              Revline Auto Parts offers a complete range of high-quality auto parts for all vehicles, ensuring reliability and performance at competitive prices. Your trusted source for everything your car needs.
              <br /><span className='font-light text-sm flex mt-2'><FaLocationDot className='mr-0.5 my-0.5' />
                8565 South Eastern Avenue, Las Vegas, NV, 89123</span>
            </div>
            <div></div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col lg:flex-row text-white text-sm justify-around md:p-0 px-8 mt-2 lg:mt-0">
            <div className="my-2 lg:my-0 flex flex-col">
              <a className="font-medium text-left no-underline text-xl">Popular Makes</a>
              <div className="flex">
                <ul className="text-left p-2 space-y-2">
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Ford</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Chevrolet</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Toyota</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Honda</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Nissan</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Hyundai</a></li>
                </ul>

                <ul className="text-left p-2 space-y-2">
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Kia</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Jeep</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Subaru</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Dodge</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>GMC</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Volkswagen</a></li>
                </ul>
                <ul className="text-left p-2 space-y-2">
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Mazda</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Ram</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Buick</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Chrysler</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Mitsubishi</a></li>
                  <li onClick={handleClick} className="hover:underline decoration-red-600 font-thin"><a>Fiat</a></li>
                </ul>
              </div>

            </div>
            <div className="my-2 lg:my-0 flex flex-col">
              <a className="font-medium text-left no-underline text-xl">Quick Links</a>
              <ul className='text-left p-2 font-light space-y-2 '>
                <li className='hover:underline decoration-red-600'><a href='/'>Home</a></li>
                <li className='hover:underline decoration-red-600'><a href='/contact'>Contact Us</a></li>
                <li className='hover:underline decoration-red-600'><a href='/about'>About Us</a></li>
                <li className='hover:underline decoration-red-600'><a href='/faq'>FAQ</a></li>
                <li className='hover:underline decoration-red-600'><a href='/warranty'>Warranty & Returns</a></li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/6 h-min gap-3 flex flex-col items-center lg:items-start justify-start font-inter font-light italic text-lg mt-2 lg:mt-0">
            <p className="text-left lg:text-left">Rev Up <span className="text-[#f6251a]">Your Ride<br />
              with the</span> Best Parts</p>
            <div className='w-full space-y-1 font-medium text-md'>
              <button
                onClick={handleClick}
                className='w-full px-1 bg-white hover:bg-green-600 hover:text-white rounded-lg text-black'>Find Parts</button>
              <button
                onClick={handleCall}
                className='w-full px-1 bg-black hover:bg-blue-600 hover:border-blue-500 border rounded-lg text-white'>Call Now</button>
            </div>
            <div className='flex space-x-3 p-1'>
              <a
                href="https://instagram.com/revlineautoparts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className=" hover:text-[#f6251a]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61566917829480"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className=" hover:text-[#f6251a]"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/revlineautopart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className=" hover:text-[#f6251a]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-2">
          <p className="font-light text-sm">
            © Copyright updated 2024 | All rights reserved. | Privacy Policy
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;