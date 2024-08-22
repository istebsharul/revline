import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function Testimonials() {
    return (
        <div className='flex flex-col justify-center items-center bg-gray-100'>
            <h1 className='text-center text-5xl text-red-600 py-10 font-medium'>TESTIMONIALS</h1>

            <div className='md:w-3/5 w-4/5 flex md:flex-row flex-col-reverse justify-center items-center bg-white rounded-2xl p-4 md:pb-0'>
                <div className='md:w-3/5 w-4/5 space-y-2 flex flex-col  justify-start md:justify-center items-center py-2'>
                    <p className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi doloribus consequuntur, sapiente asperiores dolorem officiis maiores omnis, voluptates praesentium minima laborum quo porro! Laborum.</p>
                    <h1 className='text-3xl'>Name</h1>
                    <h2>Car Brand</h2>    
                </div>
                <div className='md:w-1/4 w-2/4'><img className='w-full' src="https://res.cloudinary.com/drszvaldf/image/upload/v1724197561/revline/upmd1zbjf4imn1inxs5a.png" /></div>
            </div>
            <div className='flex space-x-6 p-10'>
                <a className='p-3 bg-red-600 rounded-full text-white text-xl'><FaArrowLeft/></a>
                <a className='p-3 bg-red-600 rounded-full text-white text-xl'><FaArrowRight/></a>
            </div>
        </div>
    )
}

export default Testimonials