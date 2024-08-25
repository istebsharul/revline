import React from 'react'
import MultiStepForm from '../Form'

function HeroSection() {
  return (
    <div className='relative w-full flex flex-col justify-center items-center z-10'>
      <div className='absolute w-full h-screen z-[-1]'><img className='w-full h-screen object-cover brightness-50' src="https://res.cloudinary.com/drszvaldf/image/upload/v1724197582/revline/ja6ts57dvl5pizkf0vgr.gif" /></div>
      <div className='w-4/5 flex'>
        <div className='w-1/2 flex justify-center items-center'>
          <h1 className='w-4/5 font-inter text-white text-7xl font-bold p-4 leading-tight'>Parts for Every Make and Model</h1>
        </div>
        <div className='w-1/2'>
          <MultiStepForm />
        </div>
      </div>
      <div className='w-4/6 h-fit relative bg-red-400 my-10 flex'>
        <div className='absolute w-1/6 h-full bg-gradient-to-r from-black to white'></div>
        <div class="overflow-hidden whitespace-nowrap bg-white p-2">
          <div class="inline-block animate-marquee">
            <span class="mx-8 text-lg font-bold">Brand 1</span>
            <span class="mx-8 text-lg font-bold">Brand 2</span>
            <span class="mx-8 text-lg font-bold">Brand 3</span>
            <span class="mx-8 text-lg font-bold">Brand 4</span>
            <span class="mx-8 text-lg font-bold">Brand 5</span>
          </div>
          <div class="inline-block animate-marquee">
            <span class="mx-8 text-lg font-bold">Brand 1</span>
            <span class="mx-8 text-lg font-bold">Brand 2</span>
            <span class="mx-8 text-lg font-bold">Brand 3</span>
            <span class="mx-8 text-lg font-bold">Brand 4</span>
            <span class="mx-8 text-lg font-bold">Brand 5</span>
          </div>
    
        </div>
        <div className='absolute right-0 w-1/6 h-full bg-gradient-to-l from-black to white'></div>
      </div>
    </div>
  )
}

export default HeroSection