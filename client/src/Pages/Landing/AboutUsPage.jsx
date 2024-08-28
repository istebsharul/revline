import React from 'react'
import Banner from '../../Components/User/Banner'
import Tagline from '../../Components/User/Tagline'
import TrustBanner from '../../Components/User/TrustBanner'

function AboutUsPage() {
  return (
    <div className='md:pt-10 pt-16'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white '>
          About Us
        </p>
      </div>

      
      <div className="w-full dark:bg-gray-100 pt-20">
        <div className="md:w-3/5 w-4/5 m-auto flex flex-col justify-center item-center ">
          <div className="w-full flex md:flex-row flex-col-reverse justify-center item-center ">
            <div className="md:w-3/5 flex flex-col justify-center items-start">
              <h1 className="text-2xl">About Us</h1>
              <p className='text-left'>
                At Revline Auto Parts, we are committed to setting new benchmarks in the automotive industry by offering top-quality parts and unmatched service. Our experienced team is passionate about providing reliable solutions that keep vehicles performing at their best. We prioritize customer satisfaction through clear communication, transparency, and trustworthiness. Let's drive your success together with parts you can depend on.
              </p>

            </div>
            <div className="md:w-1/2 flex md:justify-end md:items-end justify-center item-center">
              <img
                src="https://res.cloudinary.com/drszvaldf/img/upload/v1714427773/aiy0wuqzvoaight2cjfe.png" // Add the path to your img file
                alt="About Us img"
                width={400} // Set your desired width
                height={400} // Set your desired height
              />
            </div>
          </div>


          {/* Mission Vision Values */}
          <div className="flex gap-5 md:flex-row flex-col justify-start items-start my-20">
            <div className="md:w-1/3 flex flex-col justify-center items-center">
              <div className='flex justify-center'>
                <img
                  src="https://res.cloudinary.com/drszvaldf/img/upload/v1714987115/otg/esrcvhkzqr0vocttyvax.png"
                  alt="Our Mission"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-2xl text-center text-red-600">Our Mission</h1>
              <p className="text-center">
                To deliver high-quality, reliable auto parts that enhance vehicle performance and safety, ensuring our customers drive with confidence and peace of mind.
              </p>
            </div>

            <div className="md:w-1/3 flex flex-col justify-center items-center">
              <div className='flex justify-center'>
                <img
                  src="https://res.cloudinary.com/drszvaldf/img/upload/v1714987115/otg/zb8lyznqkwnxnvihqt7j.png"
                  alt="Our Vision"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-2xl text-center text-red-600">Our Vision</h1>
              <p className="text-center">
                To be the leading provider of premium auto parts, trusted by automotive professionals and enthusiasts alike for our commitment to quality and customer satisfaction.
              </p>
            </div>

            <div className="md:w-1/3 flex flex-col justify-center items-center">
              <div className='flex justify-center'>
                <img
                  src="https://res.cloudinary.com/drszvaldf/img/upload/v1714987115/otg/dkkaqcayhjtffwturau3.png"
                  alt="Our Values"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-2xl text-center text-red-600">Our Values</h1>
              <p className="text-center">
                We are driven by integrity, innovation, and customer focus, delivering exceptional service and products that meet the evolving needs of the automotive industry.
              </p>
            </div>
          </div>



        </div>
      </div>

      <Tagline />

      {/* Out Team */}
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='md:w-1/3 w-3/4 flex flex-col justify-center items-center'>
          <h1 className='text-center text-5xl text-red-600 py-10 font-medium'>Our Team</h1>
          <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724197561/revline/upmd1zbjf4imn1inxs5a.png" />
          <p className='text-center md:p-10'>
            Our team at Revline Auto Parts is a diverse group of automotive enthusiasts and industry experts. With years of experience in the field, we are dedicated to delivering exceptional quality and service. Each member brings unique skills and a shared passion for excellence, ensuring that we meet and exceed our customers' expectations. Together, we are committed to driving innovation and maintaining the highest standards in everything we do.
          </p>
        </div>
      </div>

      {/* Trust Banner */}
      <TrustBanner/>
    </div>
  )
}

export default AboutUsPage