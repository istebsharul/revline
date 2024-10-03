import React from 'react';
import Banner from '../../Components/User/Banner';
import Tagline from '../../Components/User/Tagline';
import TrustBanner from '../../Components/User/TrustBanner';
import WhyChooseUs from '../../Components/User/WhyChooseUs';

function AboutUsPage() {
  return (
    <div className='md:pt-10 pt-16'>
      <div className='relative'>
        <Banner />
        <p className='absolute text-4xl inset-0 flex justify-center items-center text-white '>
          About Us
        </p>
      </div>

      <div className="w-full pt-20">
        <div className="md:w-3/5 w-4/5 max-w-4xl m-auto flex flex-col justify-center item-center ">
          <div className="w-full flex flex-col justify-center items-center">
            <div className='w-full flex justify-center'>
              <div className="w-1/5">
                <img
                  src="https://res.cloudinary.com/drszvaldf/image/upload/v1725041332/revline/gf99ercnmmbxk4gt2mtd.png" // Add the path to your img file
                  alt="About Us img"
                  width={250} // Set your desired width
                  height={250} // Set your desired height
                />
              </div>
              <div className="w-3/5 flex flex-col justify-center items-start">
                <h1 className="text-2xl py-2">About Us</h1>
                <p className='flex flex-col space-y-2 text-justify'>
                  <span>
                    At Revline Auto Parts, we are your trusted source for high-quality used OEM auto parts and accessories. We are committed to providing genuine, reliable components at affordable prices, ensuring that your experience with us is seamless and satisfying from start to finish.
                  </span>
                </p>
              </div>
            </div>

            <div className='w-4/5 text-justify'>
              <span>
                We recognize that getting your vehicle back on the road swiftly is crucial. That's why we prioritize fast and efficient shipping across the United States, delivering the parts you need directly to your home, business, or mechanic. Our goal is to minimize downtime and help you regain the freedom of the open road as quickly as possible.
                Our extensive inventory is updated in real-time, so you can have confidence that the parts listed on our website are in stock and ready to ship. Whether you're searching for common components or those elusive hard-to-find parts, our dedicated team is here to assist you every step of the way. If you can't locate a specific item, simply let us know, and we'll utilize our vast network of reputable suppliers nationwide to find it for you promptly.
              </span>
              <span>
                At Revline Auto Parts, we stand behind the quality of our products. Every part we sell undergoes rigorous inspection and testing to meet our high standards. We also offer a hassle-free warranty on all our parts, providing you with added peace of mind with every purchase.
              </span>
            </div>
          </div>

          {/* Mission Vision Values */}
          <div className="flex gap-5 md:flex-row flex-col justify-start items-start my-20">
            <div className="md:w-1/3 flex flex-col justify-center items-center">
              <div className='flex justify-center'>
                <img
                  src="https://res.cloudinary.com/drszvaldf/image/upload/v1725046376/revline/yzucl1br6zhkbsma8k5t.png"
                  alt="Our Mission"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-2xl text-center text-red-600">Our Mission</h1>
              <p className="text-center">
              Our mission is to help you ignite your drive by providing exceptional parts and unparalleled customer service. We believe in building relationships with our customers based on trust, quality, and mutual respect.
              </p>
            </div>

            <div className="md:w-1/3 flex flex-col justify-center items-center">
              <div className='flex justify-center'>
                <img
                  src="https://res.cloudinary.com/drszvaldf/image/upload/v1725046376/revline/scrdya433ulwldjoxi09.png"
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
                  src="https://res.cloudinary.com/drszvaldf/image/upload/v1725046376/revline/w0kv3glrdmhfzdhlyarl.png"
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

      <WhyChooseUs/>

      {/* Our Team */}
      {/* <div className='w-full flex flex-col justify-center items-center'>
        <div className='md:w-1/3 w-3/4 flex flex-col justify-center items-center'>
          <h1 className='text-center text-5xl text-red-600 py-10 font-medium'>Our Team</h1>
          <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724197561/revline/upmd1zbjf4imn1inxs5a.png" />
          <p className='text-center md:p-10'>
            Our team at Revline Auto Parts is a diverse group of automotive enthusiasts and industry experts. With years of experience in the field, we are dedicated to delivering exceptional quality and service. Each member brings unique skills and a shared passion for excellence, ensuring that we meet and exceed our customers' expectations. Together, we are committed to driving innovation and maintaining the highest standards in everything we do.
          </p>
        </div>
      </div> */}

      {/* Trust Banner */}
      <TrustBanner />
    </div>
  );
}

export default AboutUsPage;
