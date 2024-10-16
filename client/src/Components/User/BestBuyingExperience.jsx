import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import CountUp from 'react-countup';
import { motion, useAnimation } from 'framer-motion';

function BestBuyingExperience({ handleScroll }) {
    const [counterOn, setCounterOn] = useState(false);
    const controls = useAnimation();
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScrollEvent = () => {
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                controls.start({ opacity: 1, y: 0 });
                setCounterOn(true); // Start counting up when the element is in view
            } else {
                controls.start({ opacity: 0, y: 50 });
                setCounterOn(false); // Stop counting up when the element exits
            }
        };

        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, [controls]);

    return (
        <div className='w-full flex flex-col justify-center items-center md:my-40 my-10' ref={sectionRef}>
            <div className='text-center md:py-10 py-5'>
                <motion.h1
                    className='text-5xl font-inter tracking-tight'
                    initial={{ opacity: 0, y: -50 }}
                    animate={controls}
                    transition={{ duration: 0.6 }}
                >
                    BEST <span className='text-red-600'>BUYING</span> EXPERIENCE
                </motion.h1>
                <motion.p
                    className='p-4'
                    initial={{ opacity: 0, y: -40 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Explore our best-selling auto parts, renowned for their quality and reliability.
                </motion.p>
            </div>

            <div className='flex justify-center'>
                <div className='md:w-3/5 w-5/6 flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3'>
                    <motion.div
                        className='relative md:w-1/2 hover:shadow-2xl rounded-xl'
                        initial={{ opacity: 0, scale: 1 }}
                        animate={controls}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            className={`w-full h-full brightness-50 rounded-xl object-cover`}
                            src="https://res.cloudinary.com/drszvaldf/image/upload/v1724191391/revline/vc1m9cfbzhl5gsscpd1m.avif"
                            alt="Bestsellers"
                        />
                        <div className='absolute bottom-2 left-5 flex flex-col text-white space-y-1'>
                            <h1 className='font-Medium font-inter md:text-5xl text-3xl tracking-tight'>Our Bestsellers</h1>
                            <p className='w-11/12 md:text-sm text-xs'>
                                Discover top-rated auto parts that offer unbeatable quality and performance.
                            </p>
                            <a className='w-2/5 h-min bg-red-600 p-1 rounded-full flex justify-center items-center text-sm'>
                                SEE ALL <FaArrowUp className='mx-2 rotate-90' />
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        className='md:w-1/2 flex flex-col space-y-3'
                        initial={{ opacity: 0, y: 50 }}
                        animate={controls}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className='relative w-full h-2/3 hover:shadow-2xl rounded-xl'
                            initial={{ opacity: 0, scale: 1 }}
                            animate={controls}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                className='w-full h-full overflow-hidden brightness-75'
                                src="https://res.cloudinary.com/drszvaldf/image/upload/v1724191174/revline/p1xjyzek46abzicxz5tr.png"
                                alt="Process"
                            />
                            <div className='absolute bottom-5 left-6 flex items-center'>
                                <h1 className='text-white font-Medium font-inter md:text-5xl text-2xl tracking-tight'>
                                    Understand<br />the process
                                </h1>
                                <a onClick={handleScroll} className='w-[3rem] h-[3rem] mx-9 bg-white hover:bg-white/90 rounded-full flex justify-center items-center'>
                                    <FaArrowUp className='text-2xl rotate-45 text-red-600' />
                                </a>
                            </div>
                        </motion.div>
                        <motion.div
                            className='w-full h-1/3 bg-red-600 rounded-xl flex justify-around p-3 hover:shadow-2xl'
                            initial={{ opacity: 0, y: 50 }}
                            animate={controls}
                            transition={{ duration: 0.6 }}
                        >
                            <div className='flex flex-col justify-center items-center text-white md:text-lg text-sm'>
                                <p className='md:text-4xl text-2xl font-semibold'>
                                    {counterOn && <CountUp start={0} end={1000} />}+
                                </p>
                                PARTS SOLD
                            </div>
                            <div className='flex flex-col justify-center items-center text-white md:text-lg text-sm'>
                                <p className='md:text-4xl text-2xl font-semibold'>
                                    {counterOn && <CountUp start={0} end={100} />}+
                                </p>
                                ACTIVE VISITORS
                            </div>
                            <div className='flex flex-col justify-center items-center text-white md:text-lg text-sm'>
                                <p className='md:text-4xl text-2xl font-semibold'>
                                    {counterOn && <CountUp start={0} end={10} />}+
                                </p>
                                CITIES
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default BestBuyingExperience;
