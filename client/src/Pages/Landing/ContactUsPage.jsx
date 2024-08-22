import React from 'react'
import Banner from '../../Components/Banner'
import ContactForm from '../../Components/ContactForm'

function ContactUsPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
          Contact Us
        </p>
      </div>

      <div className='md:p-20 p-5'>
        <h1 className='md:text-4xl text-2xl text-red-600 font-medium font-inter'>
          HAVING TROUBLE?
        </h1>
        <p className='md:text-2xl  tracking-wider text-center'>CALL NOW XXXXXXXXXX</p>
      </div>

      <ContactForm />

      {/* Map */}
      <div className='w-full mt-20'>
        <h1 className='md:text-3xl text-2xl text-red-600 font-medium font-inter text-center p-10'>Find Us</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14737.221571477296!2d88.36456670876203!3d22.567678536624573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02765961c4b35d%3A0xfe3d0ba7a2e15cd4!2sRaja%20Bazar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1724279031559!5m2!1sen!2sin" width="100%" height="350" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default ContactUsPage