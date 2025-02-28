import React from 'react';

function Models({ models }) {
    const handleFormClick = () =>{

    }
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-left p-4">Models</h2>
            <div className='flex flex-wrap'>
            {models?.map((model, index) => (
                <div
                    className='bg-white m-2 px-4 py-2 rounded-xl border border-red-500 hover:shadow hover:shadow-red-400'
                    onClick={handleFormClick}
                    key={index}>{model}</div> // Display the model name
            ))}
            </div>
        </div>
    );
}

export default Models;
