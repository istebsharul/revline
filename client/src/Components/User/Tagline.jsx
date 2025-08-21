import React from 'react'

function Tagline() {
    return (
        <div className='w-full md:h-auto bg-black flex'>
            <div className='w-2/5 flex justify-end'><img className='h-full w-auto' src="https://res.cloudinary.com/drszvaldf/image/upload/v1724188616/revline/wtihz2knuki1ysvci3op.gif" /></div>
            <div className="w-2/5 flex justify-center items-center italic 
                text-lg sm:text-2xl md:text-5xl lg:text-7xl">
                <h1 className="text-white text-nowrap">
                    Rev Up <span className="text-[#f6251a]">Your Drive<br />with the</span> Best Parts
                </h1>
            </div>
        </div>
    )
}

export default Tagline