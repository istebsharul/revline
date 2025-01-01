import React from 'react';

function BlogParts({ parts }) {
    return (
        <div>
            <h2 className="text-3xl font-bold text-left p-4">Parts</h2>
            <div className='flex flex-wrap'>
            {parts?.map((part, index) => (
                <div
                    className='bg-white m-2 px-4 py-2 rounded-xl shadow shadow-red-400 hover:transform hover:translate-y-1'
                    key={index}>{part}</div> // Display the model name
            ))}
            </div>
        </div>
    );
}

export default BlogParts;
