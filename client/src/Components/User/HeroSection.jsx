import React from 'react'
import MultiStepForm from './Form'

function HeroSection() {
  return (
    <div className='relative w-full h-screen flex flex-col justify-center items-center md:pt-20 pt-0 z-10 bg-black'>
      <div className='2xl:w-3/5 md:w-4/6 flex md:flex-row flex-col justify-center items-center'>
        <div className='md:w-3/5 flex flex-col justify-center items-start'>
          <h1 className='2xl:w-4/5 md:w-full w-1/2 md:text-left text-center font-inter text-white md:text-6xl text-4xl font-medium leading-tight pt-16'>
            Parts for Every Make and Model
          </h1>
          <div>
            <video
              src="https://res.cloudinary.com/drszvaldf/video/upload/v1725348596/revline/bzn0s0itovnonddecmnx.mp4"
              className='md:w-[35rem] w-1/2'
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
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