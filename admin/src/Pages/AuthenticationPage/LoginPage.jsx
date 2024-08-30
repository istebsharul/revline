import React from 'react'
import Login from '../../Components/Auth/LoginForm'

function LoginPage() {
  return (
    <div className='relative h-[94vh] w-full overflow-hidden'>
      <div className="w-full h-full absolute inset-0 flex justify-center items-center">
        <Login />
      </div>
      
    </div>

  )
}

export default LoginPage