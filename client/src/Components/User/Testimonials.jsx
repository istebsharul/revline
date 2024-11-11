import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar, FaRegStar } from 'react-icons/fa';
import { SiComma } from "react-icons/si";

const testimonials = [
    { text: "Incredible service! My car runs like new. The staff were professional and friendly. I highly recommend this service for anyone looking for quality work!", name: "Alex Carter", carBrand: "Toyota", rating: 5 },
    { text: "Fast, efficient, and very friendly. They took the time to explain every detail of the process, and I left feeling completely satisfied with the service.", name: "Rachel Brooks", carBrand: "Honda", rating: 5 },
    { text: "Trustworthy and knowledgeable team. I feel confident leaving my car in their hands. They handled everything seamlessly. A great experience overall!", name: "David Murphy", carBrand: "Ford", rating: 5 },
    { text: "Excellent service with clear communication. They handled everything with professionalism and efficiency. I will definitely return for future car care needs!", name: "Jessica Wright", carBrand: "Chevrolet", rating: 5 },
    { text: "Went above and beyond to get my car fixed. The staff were professional and courteous. Great job overall. I would highly recommend them to anyone!", name: "Luke Davis", carBrand: "BMW", rating: 5 },
    { text: "The team was friendly, efficient, and made sure my car was in top shape. I am very satisfied with their service and will return in the future.", name: "Emily Morgan", carBrand: "Audi", rating: 5 },
    { text: "Transparent, reliable, and professional. I’ve finally found a service I can trust with my car. I’m confident in their abilities and recommend them highly!", name: "Liam Robinson", carBrand: "Mercedes-Benz", rating: 5 },
    { text: "Amazing customer care and attention to detail. They truly care about quality and make sure every job is done right. I highly recommend their service!", name: "Sophia Green", carBrand: "Volkswagen", rating: 5 },
    { text: "Outstanding work. My car feels brand new after the service. Couldn’t ask for better service. The team was amazing from start to finish.", name: "Ethan King", carBrand: "Nissan", rating: 5 },
    { text: "Professional, friendly, and skilled team. My car’s performance improved greatly after their service. I will be using them for all my car needs in the future!", name: "Olivia Scott", carBrand: "Hyundai", rating: 5 },
    { text: "Quick and dependable service. They got me back on the road in no time. I was very impressed with the speed and efficiency of the work done.", name: "Benjamin Lee", carBrand: "Subaru", rating: 5 },
    { text: "Exceptional care and professionalism. They handled everything perfectly and exceeded my expectations. They’re my top choice for any future car needs!", name: "Amelia Baker", carBrand: "Mazda", rating: 5 },
    { text: "Couldn't be happier with the thorough service. The team provided clear explanations and outstanding customer support. My car is running like new now.", name: "Daniel Clark", carBrand: "Lexus", rating: 5 },
    { text: "Great prices and excellent work. I appreciate their dedication to quality. I will definitely be returning for any future car services or repairs.", name: "Isabella Lewis", carBrand: "Acura", rating: 5 },
    { text: "They explained everything step-by-step, which really helped me feel at ease. Great customer experience. The staff were friendly and knowledgeable throughout.", name: "James Walker", carBrand: "Kia", rating: 5 },
    { text: "Fantastic service. My car runs perfectly now. They took great care of everything, and I’m very pleased with the results. Highly recommend this service!", name: "Ava Harris", carBrand: "Porsche", rating: 5 },
    { text: "Fast, fair, and friendly! I found my go-to place for all car services. The team was professional, and the service was excellent from start to finish.", name: "Henry Young", carBrand: "Jaguar", rating: 5 },
    { text: "The team goes the extra mile to make sure you’re satisfied. Excellent work and service, and they make sure everything is taken care of before you leave.", name: "Mia Perez", carBrand: "Land Rover", rating: 5 },
    { text: "Top-notch repairs and amazing communication. I highly recommend them to anyone in need of car care. They take the time to do it right every time.", name: "William Campbell", carBrand: "Volvo", rating: 5 },
    { text: "Trustworthy, efficient, and courteous. A great place for reliable service. They did a wonderful job with my car, and I’m very happy with the results.", name: "Charlotte Mitchell", carBrand: "Infiniti", rating: 5 },
    { text: "Efficient and knowledgeable service. They’ve earned my trust and business. I’m glad to have found a reliable place to take care of my car needs.", name: "Samuel Carter", carBrand: "Tesla", rating: 4 },
    { text: "Very impressed with their attention to detail. My car’s performance has improved dramatically! The staff were friendly and ensured everything was done properly.", name: "Chloe Edwards", carBrand: "Mitsubishi", rating: 4 },
    { text: "The staff truly cares about their customers. A rare and refreshing experience! They went above and beyond to ensure I was satisfied with the service.", name: "Mason Hughes", carBrand: "Mini", rating: 4 },
    { text: "Best service I’ve experienced! They’re reliable, friendly, and knowledgeable. I highly recommend them for anyone looking for quality car service and repairs.", name: "Ella Long", carBrand: "Fiat", rating: 4 },
    { text: "Honest and friendly staff. I’m very happy with the results and service. They were transparent throughout the process and made everything easy to understand.", name: "Aiden Carter", carBrand: "Chrysler", rating: 4 },
    { text: "My car is running like a dream now. Thank you so much for your hard work! The team was professional and made sure everything was taken care of.", name: "Sophie Bennett", carBrand: "Jeep", rating: 4 },
    { text: "Very pleased with the whole process from start to finish. The service was quick and efficient. I’ll definitely be returning for future car care needs.", name: "Nathan Green", carBrand: "Lincoln", rating: 4 },
    { text: "Efficient and friendly. My car has never felt better! The staff were professional and made sure to explain every step of the service they performed.", name: "Zoey Sanders", carBrand: "Genesis", rating: 4 },
    { text: "A very reliable service. I trust them with all my car needs and will definitely return. They did a fantastic job, and my car runs smoothly now.", name: "Oliver Foster", carBrand: "Bentley", rating: 3 },
    { text: "Amazing service and very knowledgeable staff. They provided a detailed explanation of everything that was done. I’ll definitely return for any future car repairs.", name: "Harper Adams", carBrand: "Rolls-Royce", rating: 4 }
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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500 text-xl" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500 text-xl" />);
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
                                    <div className="flex space-x-1 my-2">
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
