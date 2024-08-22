import React from 'react';
import Cta from './Cta';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <footer className="py-4 px-5 lg:px-40 w-full text-white bg-black flex flex-col justify-between text-center z-50">
        <div className="flex flex-col lg:flex-row justify-around mx-2 my-6">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724180173/revline/kn373iik4j6x2txiqs0p.png" width={100} height={100} alt="Logo" className="mx-auto lg:mx-0 w-32 lg:w-full" />
            <div className="text-center lg:text-left font-thin text-md mt-2 lg:mt-0">
              Revline Auto Parts offers a complete range of high-quality auto parts for all vehicles, ensuring reliability and performance at competitive prices. Your trusted source for everything your car needs.
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col lg:flex-row text-white text-sm justify-around md:p-0 px-8 mt-2 lg:mt-0">
            <div className="my-2 lg:my-0 flex flex-col">
              <a className="font-medium text-left no-underline text-xl">Popular Makes</a>
              <div className='flex'>
                <ul className='text-left p-2 space-y-2'>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Ford</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Chevrolet</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Toyota</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Honda</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Nissan</a></li>
                </ul>
                <ul className='text-left p-2 font-light space-y-2'>
                  <li className='hover:underline decoration-red-600 font-thin'><a>BMW</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Mercedes-Benz</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Audi</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Volkswagen</a></li>
                  <li className='hover:underline decoration-red-600 font-thin'><a>Lexus</a></li>
                </ul>
              </div>

            </div>
            <div className="my-2 lg:my-0 flex flex-col">
              <a className="font-medium text-left no-underline text-xl">Quick Links</a>
              <ul className='text-left p-2 font-light space-y-2 '>
                <li className='hover:underline decoration-red-600'><a>Home</a></li>
                <li className='hover:underline decoration-red-600'><a>Contact Us</a></li>
                <li className='hover:underline decoration-red-600'><a>About Us</a></li>
                <li className='hover:underline decoration-red-600'><a>FAQ</a></li>
                <li className='hover:underline decoration-red-600'><a>Warranty & Returns</a></li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/6 h-min gap-3 flex flex-col items-center lg:items-start justify-start font-inter font-light italic text-lg mt-2 lg:mt-0">
            <p className="text-left lg:text-left">Rev Up <span className="text-red-600">Your Ride<br />
              with the</span> Best Parts</p>
            <div className='w-full space-y-1 font-medium text-md'>
              <button className='w-full px-1 bg-white hover:bg-green-600 hover:text-white rounded-lg text-black'>Buy Now</button>
              <button className='w-full px-1 bg-black hover:bg-blue-600 hover:border-blue-500 border rounded-lg text-white'>Call Now</button>
            </div>
            <div className='flex space-x-3 p-1'>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className=" hover:text-red-600"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className=" hover:text-red-600"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className=" hover:text-red-600"
              >
                <FaFacebook />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className=" hover:text-red-600"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-2">
          <p className="font-light text-sm">
            © revlineautoparts.com 2023 | All rights reserved. | Privacy Policy
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;