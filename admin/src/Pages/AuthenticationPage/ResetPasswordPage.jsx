import React from 'react'
import ResetPassword from '../../Components/Auth/ResetPasswordForm'

function ResetPasswordPage() {
  return (
    <div className='relative h-[94vh] w-full overflow-hidden'>
      <div className="w-full h-full absolute inset-0 flex justify-center items-center"> 
        <ResetPassword/>
      </div>
      
    </div>
  )
}

export default ResetPasswordPage