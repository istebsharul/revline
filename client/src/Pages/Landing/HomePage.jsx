import React from 'react'
import Tagline from '../../Components/Tagline'
import BestBuyingExperience from '../../Components/BestBuyingExperience'
import Testimonials from '../../Components/Testimonials'

function HomePage() {
  return (
    <div className='w-full bg-gray-100'>
      <BestBuyingExperience/>
      <Tagline/>
      <Testimonials/>
    </div>
  )
}

export default HomePage