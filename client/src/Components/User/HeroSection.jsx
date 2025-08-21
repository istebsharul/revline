import React, { forwardRef } from 'react';
import MultiStepForm from './Form/MultiStepForm';
import VideoComponent from '../User/VideoComponent';
import MovingBrands from './MovingBrands';

const HeroSection = forwardRef((props, ref) => {
  return (
    <div ref={ref} id={props.id} className='relative w-full md:h-screen flex flex-col justify-center items-center md:pt-20 pt-20 z-10 bg-gray-100'>
      <div className='2xl:w-3/5 md:w-4/6 flex md:flex-row flex-col justify-center items-center'>
        <div className='md:w-1/2 flex flex-col justify-center md:items-start items-center'>
          <h1 className='2xl:w-4/5 md:w-full w-4/5 md:text-left text-center text-black md:text-6xl text-4xl font-medium leading-tight md:pt-16 md:p-0 p-4'>
            Parts for Every <span className='italic text-red-600'>Make</span> and <span className='italic text-red-600'>Model</span>
          </h1>
          <div className="flex justify-center items-center overflow-hidden mt-10">
            <VideoComponent />
          </div>
        </div>

        <div className='md:w-1/2 w-full flex md:justify-end justify-center'>
          <div className='w-4/5'>
            <MultiStepForm />
          </div>
        </div>
      </div>

      <MovingBrands/>
    </div>
  );
});

export default HeroSection;