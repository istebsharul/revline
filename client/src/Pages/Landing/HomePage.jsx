import React from 'react'
import Tagline from '../../Components/Tagline'
import BestBuyingExperience from '../../Components/BestBuyingExperience'
import Testimonials from '../../Components/Testimonials'
import MultiStepForm from '../../Components/Form'
import HeroSection from '../../Components/User/HeroSection'

function HomePage() {
  return (
    <div className='w-full bg-gray-100'>
      <HeroSection/>
      <BestBuyingExperience/>
      <Tagline/>
      <Testimonials/>
    </div>
  )
}

export default HomePage