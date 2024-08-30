import React from 'react'
import Tagline from '../../Components/User/Tagline'
import BestBuyingExperience from '../../Components/User/BestBuyingExperience'
import Testimonials from '../../Components/User/Testimonials'
import MultiStepForm from '../../Components/User/Form'
import HeroSection from '../../Components/Auth/HeroSection'
import WhyChooseUs from '../../Components/User/WhyChooseUs'
import BuyingFlow from '../../Components/User/BuyingFlow'


function HomePage() {
  return (
    <div className='w-full bg-gray-100'>
      <HeroSection/>
      <BestBuyingExperience/>
      <BuyingFlow/>
      <Tagline/>
      <WhyChooseUs/>
      <Testimonials/>
    </div>
  )
}

export default HomePage