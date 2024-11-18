import React, { forwardRef } from 'react';
import MultiStepForm from './Form/MultiStepForm';
import VideoComponent from '../User/VideoComponent';

// Dynamically import 15 images
import brand1 from '../../Assets/Company/audi.webp';
import brand2 from '../../Assets/Company/bentley.png';
import brand3 from '../../Assets/Company/bmw.png';
import brand4 from '../../Assets/Company/chevrolet.png';
import brand5 from '../../Assets/Company/ford.png';
import brand6 from '../../Assets/Company/honda.webp';
import brand7 from '../../Assets/Company/hyundai.png';
import brand8 from '../../Assets/Company/jaguar.png';
import brand9 from '../../Assets/Company/jeep.png';
import brand10 from '../../Assets/Company/kia.png';
import brand11 from '../../Assets/Company/lamborghini.png';
import brand12 from '../../Assets/Company/mclaren.png';
import brand13 from '../../Assets/Company/mercedes.png';
import brand14 from '../../Assets/Company/mitsubishi.png';
import brand15 from '../../Assets/Company/toyota.png';

// import car from '../../Assets/web/car.png';

// Array of brand images
const brandImages = [
  { src: brand1, alt: 'Brand 1' },
  { src: brand2, alt: 'Brand 2' },
  { src: brand3, alt: 'Brand 3' },
  { src: brand4, alt: 'Brand 4' },
  { src: brand5, alt: 'Brand 5' },
  { src: brand6, alt: 'Brand 6' },
  { src: brand7, alt: 'Brand 7' },
  { src: brand8, alt: 'Brand 8' },
  { src: brand9, alt: 'Brand 9' },
  { src: brand10, alt: 'Brand 10' },
  { src: brand11, alt: 'Brand 11' },
  { src: brand12, alt: 'Brand 12' },
  { src: brand13, alt: 'Brand 13' },
  { src: brand14, alt: 'Brand 14' },
  { src: brand15, alt: 'Brand 15' }
];

const HeroSection = forwardRef((props, ref) => {
  return (
    <div ref={ref} id={props.id} className='relative w-full md:h-screen flex flex-col justify-center items-center md:pt-20 pt-20 z-10 bg-gray-100'>
      <div className='2xl:w-3/5 md:w-4/6 flex md:flex-row flex-col justify-center items-center'>
        <div className='md:w-1/2 flex flex-col justify-center md:items-start items-center'>
          <h1 className='2xl:w-4/5 md:w-full w-4/5 md:text-left text-center text-black md:text-6xl text-4xl font-medium leading-tight md:pt-16 md:p-0 p-4'>
            Parts for Every <span className=' italic'>Make</span> and <span className='italic'>Model</span>
          </h1>
          <div className="flex justify-center items-center overflow-hidden mt-10">
            {/* <img
              src={car}
              alt="Car"
              className="w-[70%] md:w-full md:animate-car-slide animate-car-slideM" // Apply the custom animation class
            /> */}
            {/* <video
              src="https://res.cloudinary.com/dp3xz2kbh/video/upload/v1731663935/revlineautoparts/Assets/ebhcbutjl5vmn7kfrfd5.mp4"
              className='md:w-[35rem] w-1/2'
              autoPlay
              muted
              playsInline
            /> */}
            <VideoComponent/>
          </div>
        </div>

        <div className='md:w-1/2 w-full flex md:justify-end justify-center'>
          <div className='w-4/5'>
            <MultiStepForm />
          </div>
        </div>
      </div>

      <div className='2xl:w-4/6 md:w-4/5 w-5/6 h-fit relative bg-white md:my-10 my-5 flex shadow-xl rounded-full'>

        <div className="w-full overflow-hidden whitespace-nowrap bg-white p-2 rounded-full">
          <div className="inline-block animate-marquee flex justify-between items-center space-x-4">
            {/* Duplicate logos to create an infinite loop effect */}
            {brandImages.map((brand, index) => (
              <span key={index} className="text-lg font-bold flex-shrink-0">
                <img src={brand.src} alt={brand.alt} className="h-10 w-auto" />
              </span>
            ))}
            {brandImages.map((brand, index) => (
              <span key={`duplicate-${index}`} className="text-lg font-bold flex-shrink-0">
                <img src={brand.src} alt={brand.alt} className="h-10 w-auto" />
              </span>
            ))}
          </div>
        </div>
        <div className='absolute left-0 md:w-1/5 w-1/4 h-full bg-gradient-to-r from-black to white rounded-l-full z-10'></div>
        <div className='absolute right-0 md:w-1/5 w-1/4 h-full bg-gradient-to-l from-black to white rounded-r-full'></div>
      </div>
    </div>
  );
});

export default HeroSection;