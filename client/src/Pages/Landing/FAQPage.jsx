import React from 'react'
import FAQItems from '../../Components/FAQItems'
import Banner from '../../Components/Banner'

function FAQPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
          FAQ
        </p>
      </div>

      <div className='md:p-20 p-5'>
        <h1 className='md:text-4xl text-2xl text-red-600 font-medium font-inter'>
          HAVING QUESTIONS?
        </h1>
        <p className='md:text-2xl  tracking-wider text-center'>FREQUENTLY ASKED QUESTION</p>
      </div>

      <FAQItems />
    </div>

  )
}

export default FAQPage