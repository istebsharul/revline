import React from 'react'
import MultiStepForm from '../User/Form'

function HeroSection() {
  return (
    <div className='relative w-full flex flex-col justify-center items-center md:pt-20 pt-0 z-10 bg-black'>
        <div className='md:w-4/5 flex md:flex-row flex-col justify-center items-center'>
        <div className='md:w-1/2 flex justify-center items-center md:py-20 pt-20 pb-10'>
          <h1 className='md:w-4/5 w-1/2 md:text-left text-center font-inter text-white md:text-7xl text-4xl font-bold leading-tight pt-16'>Parts for Every Make and Model</h1>
        </div>
        <div className='md:w-1/2 w-4/5'>
          <MultiStepForm />
        </div>
      </div>
      <div className='w-4/6 h-fit relative bg-red-400 md:my-10 my-5 flex'>
        <div className='absolute w-1/6 h-full bg-gradient-to-r from-black to white/50'></div>
        <div className="overflow-hidden whitespace-nowrap bg-white p-2">
          <div className="inline-block animate-marquee">
            <span className="mx-8 text-lg font-bold">Brand 1</span>
            <span className="mx-8 text-lg font-bold">Brand 2</span>
            <span className="mx-8 text-lg font-bold">Brand 3</span>
            <span className="mx-8 text-lg font-bold">Brand 4</span>
            <span className="mx-8 text-lg font-bold">Brand 5</span>
          </div>
          <div className="inline-block animate-marquee">
            <span className="mx-8 text-lg font-bold">Brand 1</span>
            <span className="mx-8 text-lg font-bold">Brand 2</span>
            <span className="mx-8 text-lg font-bold">Brand 3</span>
            <span className="mx-8 text-lg font-bold">Brand 4</span>
            <span className="mx-8 text-lg font-bold">Brand 5</span>
          </div>

        </div>
        <div className='absolute right-0 w-1/6 h-full bg-gradient-to-l from-black to white'></div>
      </div>
    </div>
  )
}

export default HeroSection