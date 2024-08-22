import React from 'react';
import Cta from './Cta';

function Footer() {
  return (
    <>
      <footer className="py-4 px-5 lg:px-40 w-full text-white bg-red-500 flex flex-col justify-between text-center z-50">
        <div className="flex flex-col lg:flex-row justify-around mx-2 my-6">
          <div className="w-full lg:w-1/5 mb-4 lg:mb-0">
            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724180173/revline/kn373iik4j6x2txiqs0p.png" width={100} height={100} alt="Logo" className="mx-auto lg:mx-0 w-32 lg:w-full" />
            <div className="text-center lg:text-end font-semibold text-lg mt-2 lg:mt-0">
              THE AKRAM
              CONSULTANCY
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col lg:flex-row text-white text-sm justify-around mt-2 lg:mt-0">
            <div className="my-2 lg:my-0">
              <a className="font-semibold no-underline">Careers</a>
            </div>
            <div className="my-2 lg:my-0">
              <a className="font-semibold no-underline">Blog</a>
            </div>
            <div className="my-2 lg:my-0">
              <a className="font-semibold no-underline">Work</a>
            </div>
            <div className="my-2 lg:my-0">
              <a className="font-semibold no-underline">About</a>
            </div>
            <div className="my-2 lg:my-0">
              <a className="font-semibold no-underline">Services</a>
            </div>
          </div>

          <div className="h-min gap-3 flex flex-col items-center lg:items-end justify-start font-semibold text-lg mt-2 lg:mt-0">
            <p className="text-center lg:text-end">Start your next project Today</p>
            <Cta />
          </div>
        </div>

        <div className="mt-4 lg:mt-2">
          <p className="font-light text-sm">
            © The Akram Consultancy 2023 | All rights reserved. | Privacy Policy
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;