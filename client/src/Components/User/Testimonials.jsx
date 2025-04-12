import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import { SiComma } from "react-icons/si";

const testimonials = [
    
    {
        text: "Absolutely flawless experience! I was having trouble finding the correct ABS module for my 2010 Chevy Malibu—dealership said it was discontinued. I reached out to Revline and Adam Reed got back to me the same day. He confirmed the part.",
        name: "Isabelle Myra",
        carBrand: "Chevrolet",
        rating: 5
    },
    {
        text: "Was looking for a 2015 Dodge Charger ABS module and finally found one here at a fair price. They double-checked my VIN before shipping, and the part arrived well-packaged. Installed it over the weekend, and my ABS light is gone. Solid service!",
        name: "Freddie Davis",
        carBrand: "Dodge",
        rating: 5
    },
    {
        text: "Ordered a brake master cylinder from Revline, and I’m happy with how smooth everything went. Shipping was quick, the part fit perfectly, and the price was way better than the local dealer. No complaints at all!",
        name: "Jacob Brown",
        carBrand: "Dodge",
        rating: 5
    },
    {
        text: "I bought an ABS unit for my sedan, and it fits perfectly also condition was just like a new one. Thanks for the such a good customer support, Keep up the good work. Highly recommended.",
        name: "Istebsharul Bari",
        carBrand: "Dodge",
        rating: 5
    },
    {
        text: "I was struggling to find a radio unit for my 1997 Ford Pickup, and Revline had exactly what I needed. It arrived in great condition, plugged it in, and it worked right away. Super smooth process!",
        name: "Jackson Ward",
        carBrand: "Ford",
        rating: 5
    },
    {
        text: "Got the transmission control unit for my Kia Optima. Adam confirmed compatibility with my VIN. Working perfectly ever since!",
        name: "Jaiden Antwan",
        carBrand: "Kia",
        rating: 5
    },
    {
        text: "Ordered from ABS Part, and everything went smoothly. Good quality parts, fast response, and no issues with the process. Will definitely buy again!",
        name: "MH Vlogs",
        carBrand: "Dodge",
        rating: 5
    },
    {
        text: "Product worked but wasn’t cleaned properly. Still had oil residue. Functionally it’s fine, but a quick wipe-down would’ve helped.",
        name: "Jarrett Houston",
        carBrand: "Dodge",
        rating: 4
    },
    {
        text: "Alternator came in used condition as expected. Worked fine. Packaging could have been better.",
        name: "Alexis Smith",
        carBrand: "Dodge",
        rating: 4
    },
    {
        text: "Had been searching for a replacement ABS module for my 2006 Dodge Charger. Adam Reed from Revline made the process painless. Verified the part with my VIN and got it shipped quickly. Installed and working great!",
        name: "Mehmood Jani",
        carBrand: "Dodge",
        rating: 5
    },
    {
        text: "Ordered a throttle body for my Civic Si. Adam checked everything before shipping. Arrived clean and worked perfectly. Very professional team.",
        name: "Ramzan Choudery",
        carBrand: "Honda",
        rating: 5
    },
    {
        text: "Great experience with RevLine Auto Parts! Quick response, quality parts, and smooth transaction. Definitely recommend for anyone looking for reliable auto parts.",
        name: "Syed Alam",
        carBrand: "Dodge",
        rating: 5
    },
    {
        text: "Good experience overall. Took an extra call to confirm fitment but Adam got it sorted.",
        name: "Ali Ali",
        carBrand: "Dodge",
        rating: 4
    },
    {
        text: "Needed a used OEM tail light for my Hyundai Elantra. Adam made sure it matched my trim level and shipped it the same day. It arrived clean and worked perfectly. Great experience!",
        name: "Mayra Jamal",
        carBrand: "Hyundai",
        rating: 5
    }
];


function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalRatings = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    const averageRating = (totalRatings / testimonials.length).toFixed(1); // rounded to 1 decimal


    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-[#F4B400] text-lg" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-500 text-lg" />);
            }
        }
        return stars;
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className='w-full flex flex-col justify-center items-center bg-gray-100 rounded-2xl'>
            <h1 className='text-center md:text-5xl text-3xl text-[#f6251a] py-10 font-medium'>TESTIMONIALS</h1>
            <div className='flex justify-end items-end my-2 gap-1 text-xl'>
                Our <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png" /> reviews <span className='text-xl font-medium'> {averageRating}</span> rating of {testimonials.length} reviews
            </div>
            <div className='md:w-4/6 w-full flex justify-start p-4'>
                <div className='flex text-[#f6251a]'>
                    <SiComma className='md:text-4xl rotate-180' />
                    <SiComma className='md:text-4xl rotate-180' />
                </div>
            </div>


            <div className='relative w-4/5 md:w-3/5 overflow-hidden rounded-2xl'>
                <div
                    className='flex transition-transform duration-500 rounded-2xl'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className='flex-none w-full p-4 bg-white rounded-2xl md:pb-0 flex flex-col justify-center items-center'
                        >
                            <div className='w-4/5 space-y-2 flex flex-col justify-start py-2 mb-2'>
                                <div className='flex flex-col justify-between items-start'>
                                    <div className="flex justify-center items-center space-x-1 my-2">
                                        <img className='w-8 h-8 mr-1' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" />
                                        <span className='text-xl text-[#F4B400] font-medium mr-2'>{testimonial.rating.toPrecision(2)}</span>
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p>{testimonial.text}</p>
                                </div>
                                <h2 className='font-bold font-sans text-lg'>{testimonial.carBrand}</h2>
                                <h1 className='md:text-3xl text-xl italic font-serif text-right'> -  {testimonial.name}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex space-x-6 p-10'>
                <button
                    onClick={handlePrev}
                    className='p-3 bg-[#f6251a] rounded-full text-white text-xl'
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className='p-3 bg-[#f6251a] rounded-full text-white text-xl'
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default Testimonials;
