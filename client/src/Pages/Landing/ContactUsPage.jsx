import React from 'react'
import Banner from '../../Components/User/Banner'
import ContactForm from '../../Components/User/ContactForm'

function ContactUsPage() {
  return (
    <div className='flex flex-col justify-center items-center md:pt-10 pt-16'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
          Contact Us
        </p>
      </div>

      <div className='md:p-20 p-5 text-center'>
        <h1 className='md:text-4xl text-2xl text-[#f6251a] font-medium font-inter'>
          HAVING TROUBLE?
        </h1>
        <p className='md:text-2xl  tracking-wider text-center'>CALL NOW +1 855-600-9080</p>
      </div>

      <ContactForm />

      {/* Map */}
      <div className='w-full mt-20'>
        <h1 className='md:text-3xl text-2xl text-[#f6251a] font-medium font-inter text-center p-10'>Find Us</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.437746271895!2d-115.12268172419653!3d36.03402117247551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8cfb5231519cb%3A0x5821291729c002db!2s8565%20S%20Eastern%20Ave%20%23255%2C%20Las%20Vegas%2C%20NV%2089123%2C%20USA!5e0!3m2!1sen!2sin!4v1732225993295!5m2!1sen!2sin" width="100%" height="350" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default ContactUsPage