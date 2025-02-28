import React from 'react';

function BlogParts({ parts, title }) {
    return (
        <div>
            <h2 className="text-3xl font-bold text-left p-4"> {title || 'Parts'}</h2>
            <div className='flex flex-wrap p-2'>
                {parts?.map((part, index) => (
                    <div
                        className='bg-white m-2 px-4 py-2 rounded-xl border border-red-500 hover:shadow hover:shadow-red-400'
                        key={index}>{part}</div> // Display the model name
                ))}
            </div>
        </div>
    );
}

export default BlogParts;
