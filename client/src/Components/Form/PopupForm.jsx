import React, { useState } from 'react'
import MultiStepForm from '../User/Form/MultiStepForm';

function PopupForm() {

    

    return (
        <div>
            {isOpen &&(
                <MultiStepForm/>
            )}
        </div>
    )
}

export default PopupForm