import React from 'react'

function Tagline() {
    return (
        <div className='w-full md:h-60 bg-black flex'>
            <div className='w-2/5 flex justify-end'><img className='h-full' src="https://res.cloudinary.com/drszvaldf/image/upload/v1724188616/revline/wtihz2knuki1ysvci3op.gif" /></div>
            <div className='w-2/5 md:text-7xl text-lg flex justify-center items-center italic'>
                <h1 className='text-white'>Rev Up <span className="text-[#f6251a]">Your Drive<br/>
                with the</span> Best Parts</h1>
            </div>
        </div>
    )
}

export default Tagline