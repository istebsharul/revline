import React from 'react'
import Signup from '../../Components/Auth/SignUpForm'

function SignUpPage() {
  return (
    <div className='relative h-[94vh] w-full overflow-hidden'>
      <div className="w-full h-full absolute inset-0 flex justify-center items-center">
      <Signup/>
      </div>
      
    </div>

  )
}

export default SignUpPage