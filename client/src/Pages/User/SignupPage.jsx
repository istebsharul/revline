import React from 'react'
import Signup from '../../Components/Auth/SignUpForm'

function SignUpPage() {
  return (
    <div className='relative h-[94vh] w-full overflow-hidden'>
      <img
        className='w-full h-full object-cover brightness-50'
        src="https://res.cloudinary.com/drszvaldf/image/upload/v1724317763/revline/k0nzsyc8yofyhnhvb07m.png"
        alt="Background"
      />
      <div className="w-full h-full absolute inset-0 flex justify-center items-center">
      <Signup/>
      </div>
      
    </div>

  )
}

export default SignUpPage