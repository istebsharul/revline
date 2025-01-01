// PartCarousel.jsx
import React from 'react';
import {
    StackedCarousel,
    ResponsiveContainer,
} from 'react-stacked-center-carousel';
// Importing Fab and icons from Material UI v5
import { Fab } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Correct imports for icons

// Carousel items with image and altText
const carouselItems = [
    {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735485731/revlineautoparts/Assets/Blogs/shxcwxhi4mcfurivynlk.png',
        altText: 'Item 1',
    },
    {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735543848/revlineautoparts/Assets/Blogs/ygyri8j71j8yke24mntz.png',
        altText: 'Item 2',
    },
    {
        id: 3,
        imageUrl: 'https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735485730/revlineautoparts/Assets/Blogs/dypejpkutmjwf65zripg.png',
        altText: 'Item 3',
    },
    {
        id: 4,
        imageUrl: 'https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735544374/revlineautoparts/Assets/Blogs/r2volmrle95fahhsnura.png',
        altText: 'Item 4',
    },
    {
        id: 5,
        imageUrl: 'https://res.cloudinary.com/dp3xz2kbh/image/upload/v1735568151/revlineautoparts/Assets/Blogs/oquyn42pkogvehdwwdyp.png',
        altText: 'Wheel',
    },
];

const PartCarousel = () => {
    const carouselRef = React.useRef();

    return (
        <div className='h-min'>
            <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
            <div className="w-full md:py-10 relative">
                <ResponsiveContainer
                    carouselRef={carouselRef}
                    render={(parentWidth, carouselRef) => {
                        let currentVisibleSlide = 5;
                        if (parentWidth <= 1440) currentVisibleSlide = 5;
                        if (parentWidth <= 1080) currentVisibleSlide = 3;
                        if (parentWidth <= 800) currentVisibleSlide = 1;

                        return (
                            <StackedCarousel
                                ref={carouselRef}
                                data={carouselItems}
                                slideComponent={Card}
                                slideWidth={parentWidth < 800 ? parentWidth - 40 : 230}
                                carouselWidth={parentWidth}
                                currentVisibleSlide={currentVisibleSlide}
                                maxVisibleSlide={5}
                                useGrabCursor
                                autoPlay={true}
                                showDots={true}
                            />
                        );
                    }}
                />
                <div className="w-10 h-10 absolute flex justify-center items-center top-1/2 left-5 z-10 transform -translate-y-1/2 bg-red-500 shadow-lg rounded-full">
                    <ArrowBack
                        onClick={() => carouselRef.current?.goBack()}
                        className='text-white'
                    />
                </div>
                <div className="w-10 h-10 flex justify-center items-center absolute top-1/2 right-5 z-10 transform -translate-y-1/2 bg-red-500 shadow-lg rounded-full">
                    <ArrowForward
                        onClick={() => carouselRef.current?.goNext()}
                        className='text-white'
                    />
                </div>
            </div>
        </div>
    );
};

const Card = React.memo(function Card({ data, dataIndex }) {
    const { imageUrl, altText } = data[dataIndex];

    return (
        <div className="relative w-full md:h-72 2xl:p-2 p-16">
            <img
                className="w-full h-full object-cover"
                src={imageUrl}
                draggable="false"
            />
        </div>
    );
});

export default PartCarousel;
