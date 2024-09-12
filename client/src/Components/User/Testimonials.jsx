import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi doloribus consequuntur, sapiente asperiores dolorem officiis maiores omnis, voluptates praesentium minima laborum quo porro! Laborum.",
        name: "John Doe",
        carBrand: "Tesla",
        image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724425673/revline/uhl5vhbdmfqskmhpmffo.avif"
    },
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, tempore.",
        name: "Jane Smith",
        carBrand: "Ford",
        image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724197561/revline/upmd1zbjf4imn1inxs5a.png"
    },
    {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, accusantium.",
        name: "Michael Johnson",
        carBrand: "BMW",
        image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724197561/revline/upmd1zbjf4imn1inxs5a.png"
    }
];

function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(handleNext, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className='flex flex-col justify-center items-center bg-gray-100 rounded-2xl'>
            <h1 className='text-center md:text-5xl text-3xl text-red-600 py-10 font-medium'>TESTIMONIALS</h1>

            <div className='relative w-4/5 md:w-3/5 overflow-hidden rounded-2xl'>
                <div
                    className='flex transition-transform duration-500 rounded-2xl'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className='flex-none w-full p-4 bg-white rounded-2xl md:pb-0 flex md:flex-row flex-col-reverse justify-center items-center'
                        >
                            <div className='md:w-3/5 w-4/5 space-y-2 flex flex-col justify-start py-2 mb-2'>
                                <p>{testimonial.text}</p>
                                <h1 className='text-3xl'>{testimonial.name}</h1>
                                <h2>{testimonial.carBrand}</h2>
                            </div>
                            <div className='md:w-1/4 w-2/4'>
                                <img className='w-full' src={testimonial.image} alt={testimonial.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex space-x-6 p-10'>
                <button
                    onClick={handlePrev}
                    className='p-3 bg-red-600 rounded-full text-white text-xl'
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className='p-3 bg-red-600 rounded-full text-white text-xl'
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default Testimonials;
