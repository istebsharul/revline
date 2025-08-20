import React, { useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const items = [
    {
        id: 1,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599518/Adobe_Express_-_file_4_gp7kbf.png",
        altText: "abs",
        title: "ABS",
        description:
            "Enhance your vehicle's braking efficiency with a high-quality Anti-lock Braking System (ABS), designed for better control and safety.",
    },
    {
        id: 2,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599552/Adobe_Express_-_file_5_geloci.png",
        altText: "headlight",
        title: "Headlight",
        description:
            "Upgrade your visibility with a premium car headlight, offering bright illumination and improved safety for night driving.",
    },
    {
        id: 3,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599504/Adobe_Express_-_file_3_f0d1qm.png",
        altText: "transfercase",
        title: "Transfer Case",
        description:
            "Ensure smooth power distribution between the front and rear wheels with a durable transfer case, perfect for 4WD and AWD vehicles.",
    },
    {
        id: 4,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599486/Adobe_Express_-_file_1_yk9qkq.png",
        altText: "brakemastercylinder",
        title: "Brake Master Cylinder",
        description:
            "Maintain precise braking performance with a reliable brake master cylinder, essential for safe and responsive braking.",
    },
    {
        id: 5,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599465/Adobe_Express_-_file_5_zlvkw2.png",
        altText: "powerbrakemaster",
        title: "Power Brake Master",
        description:
            "Improve stopping power with a power brake master cylinder, ensuring smooth and efficient braking in all driving conditions.",
    },
    {
        id: 6,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599446/Adobe_Express_-_file_6_bc1a9b.png",
        altText: "alternator",
        title: "Alternator",
        description:
            "Keep your vehicle’s electrical system running smoothly with a high-performance alternator, delivering consistent power output.",
    },
    {
        id: 7,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599405/Adobe_Express_-_file_4_awjpls.png",
        altText: "accompressor",
        title: "AC Compressor",
        description:
            "Stay cool on the road with a top-quality AC compressor, ensuring efficient cooling and climate control for your vehicle.",
    },
    {
        id: 8,
        imageUrl:
            "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599390/Adobe_Express_-_file_4_eb7ay2.png",
        altText: "condensor",
        title: "Condensor",
        description:
            "Optimize your vehicle’s air conditioning system with a high-efficiency condenser, providing excellent cooling performance.",
    },
];

const BestSeller = () => {
    const navigate = useNavigate();

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;

            swiperRef.current.navigation.destroy(); // reset
            swiperRef.current.navigation.init();    // reinit
            swiperRef.current.navigation.update();  // update
        }
    }, []);

    return (
        <div className="2xl:px-72 md:p-32 p-8 mx-auto flex md:flex-row flex-col gap-6 bg-white">
            {/* Left section */}
            <div className="md:w-1/3 flex flex-col justify-center md:text-left text-center">
                <h1 className="text-4xl text-red-500 font-bold mb-4">
                    <span className="text-black">Best</span> Seller
                </h1>
                <p className="text-gray-700">
                    Discover our top-quality auto parts that ensure performance and
                    safety. Browse through our best sellers selected by customers.
                </p>
            </div>

            {/* Right section */}
            <div className="md:w-2/3 relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="flex flex-col justify-center items-center border rounded-xl hover:shadow-md p-4 h-full">
                                <img
                                    src={item.imageUrl}
                                    alt={item.altText}
                                    className="w-full h-48 object-contain rounded"
                                />
                                <div className="flex flex-col w-full">
                                    <div className="w-full flex justify-between items-center">
                                        <h3 className="w-4/5 text-lg text-red-500 font-semibold">
                                            {item.title}
                                        </h3>
                                        <button
                                            onClick={() => navigate(`/parts/${item.altText}`)}
                                            className="w-min border border-red-500 hover:bg-red-500 hover:text-white p-1 rounded-full duration-300 flex justify-center items-center group"
                                        >
                                            <MdArrowOutward className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                                        </button>
                                    </div>
                                    <p className="text-gray-700 text-sm px-2 line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Custom Buttons */}
                <button
                    ref={prevRef}
                    className="w-10 h-10 flex justify-center items-center absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 hover:shadow-lg border bg-[#f6251a] text-white hover:text-white p-2 rounded-full shadow-lg hover:bg-[#f6251a] transition"
                >
                    &#8592;
                </button>
                <button
                    ref={nextRef}
                    className="w-10 h-10 flex justify-center items-center absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 hover:shadow-lg border bg-[#f6251a] text-white hover:text-white p-3 rounded-full shadow-lg hover:bg-[#f6251a] transition"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default BestSeller;



// import React from 'react';
// import Slider from 'react-slick';
// import { MdArrowOutward } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const items = [
//     {
//         id: 1,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599518/Adobe_Express_-_file_4_gp7kbf.png",
//         altText: "abs",
//         title: "ABS",
//         description: "Enhance your vehicle's braking efficiency with a high-quality Anti-lock Braking System (ABS), designed for better control and safety."
//     },
//     {
//         id: 2,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599552/Adobe_Express_-_file_5_geloci.png",
//         altText: "headlight",
//         title: "Headlight",
//         description: "Upgrade your visibility with a premium car headlight, offering bright illumination and improved safety for night driving."
//     },
//     {
//         id: 3,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599504/Adobe_Express_-_file_3_f0d1qm.png",
//         altText: "transfercase",
//         title: "Transfer Case",
//         description: "Ensure smooth power distribution between the front and rear wheels with a durable transfer case, perfect for 4WD and AWD vehicles."
//     },
//     {
//         id: 4,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599486/Adobe_Express_-_file_1_yk9qkq.png",
//         altText: "brakemastercylinder",
//         title: "Brake Master Cylinder",
//         description: "Maintain precise braking performance with a reliable brake master cylinder, essential for safe and responsive braking."
//     },
//     {
//         id: 5,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599465/Adobe_Express_-_file_5_zlvkw2.png",
//         altText: "powerbrakemaster",
//         title: "Power Brake Master",
//         description: "Improve stopping power with a power brake master cylinder, ensuring smooth and efficient braking in all driving conditions."
//     },
//     {
//         id: 6,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599446/Adobe_Express_-_file_6_bc1a9b.png",
//         altText: "alternator",
//         title: "Alternator",
//         description: "Keep your vehicle’s electrical system running smoothly with a high-performance alternator, delivering consistent power output."
//     },
//     {
//         id: 7,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599405/Adobe_Express_-_file_4_awjpls.png",
//         altText: "accompressor",
//         title: "AC Compressor",
//         description: "Stay cool on the road with a top-quality AC compressor, ensuring efficient cooling and climate control for your vehicle."
//     },
//     {
//         id: 8,
//         imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599390/Adobe_Express_-_file_4_eb7ay2.png",
//         altText: "condensor",
//         title: "Condensor",
//         description: "Optimize your vehicle’s air conditioning system with a high-efficiency condenser, providing excellent cooling performance."
//     }
// ];

// const BestSeller = () => {
//     const navigate = useNavigate();

//     const NextArrow = ({ onClick }) => (
//         <button
//             className="w-10 h-10 absolute top-1/2 -right-3 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
//             onClick={onClick}
//         >
//             &#8594;
//         </button>
//     );

//     const PrevArrow = ({ onClick }) => (
//         <button
//             className="w-10 h-10 absolute top-1/2 -left-3 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
//             onClick={onClick}
//         >
//             &#8592;
//         </button>
//     );


//     // const settings = {
//     //     dots: false,
//     //     infinite: true,
//     //     speed: 500,
//     //     slidesToShow: 3,
//     //     slidesToScroll: 1,
//     //     arrows: true,
//     //     autoplay: true,
//     //     autoplaySpeed: 3000,
//     //     nextArrow: <NextArrow />,
//     //     prevArrow: <PrevArrow />,
//     // };


//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,  // default desktop
//         slidesToScroll: 1,
//         arrows: true,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         responsive: [
//             {
//                 breakpoint: 1024,  // tablets and below
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     infinite: true,
//                 },
//             },
//             {
//                 breakpoint: 640,  // mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     infinite: true,
//                 },
//             },
//         ],
//     };


//     return (
//         <div className="2xl:px-72 2xl:py- md:p-32 p-8 mx-auto flex md:flex-row flex-col gap-6 bg-white">
//             {/* Left section */}
//             <div className="md:w-1/3 flex flex-col justify-center md:text-left text-center">
//                 <h1 className="text-4xl text-red-500 font-bold mb-4"><span className='text-black'>Best</span> Seller</h1>
//                 <p className="text-gray-700">
//                     Discover our top-quality auto parts that ensure performance and safety. Browse through our best sellers selected by customers.
//                 </p>
//             </div>

//             {/* Right section */}
//             <div className="md:w-2/3">
//                 <Slider {...settings}>
//                     {items.map((item) => (
//                         <div key={item.id} className="px-2">
//                             <div className="max-w-3/4 flex flex-col justify-center items-center border rounded-xl hover:shadow-md p-4">
//                                 <img
//                                     src={item.imageUrl}
//                                     alt={item.altText}
//                                     className="w-full h-48 object-contain rounded"
//                                 />
//                                 <div className="flex flex-col w-full">
//                                     <div className="w-full flex justify-between items-center">
//                                         <h3 className="w-4/5 text-lg text-red-500 font-semibold">{item.title}</h3>
//                                         <button
//                                             onClick={() => navigate(`/parts/${item.altText}`)}
//                                             className="w-min border border-red-500 hover:bg-red-500 hover:text-white p-1 rounded-full duration-300 flex justify-center items-center group"
//                                         >
//                                             <MdArrowOutward className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
//                                         </button>
//                                     </div>
//                                     <p className="text-gray-700 text-sm px-2 line-clamp-3">{item.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default BestSeller;