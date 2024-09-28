import React,{useEffect, useRef} from 'react'
import Tagline from '../../Components/User/Tagline'
import BestBuyingExperience from '../../Components/User/BestBuyingExperience'
import Testimonials from '../../Components/User/Testimonials'
import MultiStepForm from '../../Components/User/Form'
import HeroSection from '../../Components/User/HeroSection'
import WhyChooseUs from '../../Components/User/WhyChooseUs'
import BuyingFlow from '../../Components/User/BuyingFlow'
import { useLocation } from 'react-router-dom';


function HomePage() {
  const flowSectionRef = useRef(null);
  const formRef = useRef(null);
  const location = useLocation();

  const handleScroll = () => {
    console.log("Hand");
    if (flowSectionRef.current) {
      flowSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Check if the URL contains the #form hash
    if (location.hash === '#form') {
      // Scroll to the form section
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className='w-full bg-gray-100'>
      <HeroSection ref={formRef} id="form"/>
      <BestBuyingExperience handleScroll={handleScroll}/>
      <BuyingFlow ref={flowSectionRef}/>
      <Tagline/>
      <WhyChooseUs/>
      <Testimonials/>
    </div>
  )
}

export default HomePage