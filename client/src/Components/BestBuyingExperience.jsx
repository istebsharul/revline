import React from 'react'
import { FaArrowAltCircleUp, FaArrowUp } from 'react-icons/fa'

function BestBuyingExperience() {
    return (
        <div className='flex flex-col justify-center items-center my-40'>
            <div className='text-center py-10'>
                <h1 className='text-5xl font-inter tracking-tight'>BEST <span className='text-red-600'>BUYING</span> EXPERIENCE</h1>
                <p className='p-4'>Explore our best-selling auto parts, renowned for their quality and reliability.</p>
            </div>
            <div className='md:w-3/5 w-5/6 flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3'>
                <div className='relative md:w-1/2'>
                    <img className='w-full h-full brightness-50 rounded-xl' src="https://res.cloudinary.com/drszvaldf/image/upload/v1724191391/revline/vc1m9cfbzhl5gsscpd1m.avif" />
                    <div className='absolute bottom-2 left-5 flex flex-col text-white space-y-1'>
                        <h1 className='font-Medium font-inter md:text-5xl text-3xl tracking-tight'>Our Bestsellers</h1>
                        <p className='w-11/12 md:text-sm text-xs'>
                            Discover top-rated auto parts that offer unbeatable quality and performance.</p>
                        <a className='w-2/5 h-min bg-red-600 p-1 rounded-full flex justify-center items-center text-sm'>SEE ALL<FaArrowUp className='mx-2 rotate-90' /></a>
                    </div>
                </div>
                <div className='md:w-1/2 flex flex-col space-y-3'>
                    <div className='relative w-full h-2/3'>
                        <img className='w-full h-full overflow-hidden brightness-75' src="https://res.cloudinary.com/drszvaldf/image/upload/v1724191174/revline/p1xjyzek46abzicxz5tr.png" />
                        <div className='absolute bottom-5 left-6 flex items-center'>
                            <h1 className='text-white font-Medium font-inter md:text-5xl text-2xl tracking-tight'>Understand<br />the process</h1>
                            <a className='w-[3rem] h-[3rem] mx-9 bg-white rounded-full flex justify-center items-center'><FaArrowUp className='text-2xl rotate-45 text-red-600' /></a>
                        </div>
                    </div>
                    <div className='w-full h-1/3 bg-red-600 rounded-xl flex justify-around p-3'>
                        <div className='flex flex-col justify-center items-center text-white md:text-lg text-sm'><p className='md:text-4xl text-2xl font-semibold'>1000+</p>PARTS SOLD</div>
                        <div className='flex flex-col justify-center items-center text-white md:text-lg text-sm'><p className='md:text-4xl text-2xl font-semibold'>100+</p>ACTIVE VISITORS</div>
                        <div className='flex flex-col justify-center items-center text-white md:text-lg text-sm'><p className='md:text-4xl text-2xl font-semibold'>10+</p>CITIES</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestBuyingExperience