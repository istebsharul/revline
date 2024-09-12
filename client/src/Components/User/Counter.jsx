import React, { useState, useEffect } from 'react';

const Counter = ({ target, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target.substring(0, target.length - 1));
        if (start === end) return;

        let incrementTime = (duration / end) * 1000;

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return (
        <p className='md:text-4xl text-2xl font-semibold'>{count}+</p>
    );
};

export default Counter;
