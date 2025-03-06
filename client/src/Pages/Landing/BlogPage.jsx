import React from 'react';
import Banner from '../../Components/User/Banner';

import Ford from '../../Assets/Company/ford.webp';
import Toyota from '../../Assets/Company/toyota.webp';
import Chevrolet from '../../Assets/Company/chevrolet.webp';
import Honda from '../../Assets/Company/honda.webp';
import Nissan from '../../Assets/Company/nissan.webp';
import Hyundai from '../../Assets/Company/hyundai.webp';
import Kia from '../../Assets/Company/kia.webp';
import Jeep from '../../Assets/Company/jeep.webp';
import Subaru from '../../Assets/Company/subaru.webp';
import Dodge from '../../Assets/Company/dodge.webp';
import GMC from '../../Assets/Company/gmc.webp';
import Volkswagen from '../../Assets/Company/volkswagen.webp';
import Mazda from '../../Assets/Company/mazda.webp';
import Ram from '../../Assets/Company/ram.webp';
import Buick from '../../Assets/Company/buick.webp';
import Chrysler from '../../Assets/Company/chrysler.webp';
import Mitsubishi from '../../Assets/Company/mitsubishi.webp';
import Fiat from '../../Assets/Company/fiat.webp';


const popularMakes = [
    {
        name: "Ford",
        url_slug: "ford",
        image_url: Ford,  // Assuming Ford logo import is defined
        description: "Explore a wide range of used Ford parts for sale. Reliable, high-quality components for your repair needs.",
        title: "Used Ford Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Browse quality used Ford parts for engine repairs, transmission replacements, suspension components, and more. Affordable and reliable options for all Ford models."
    },
    {
        name: "Toyota",
        url_slug: "toyota",
        image_url: Toyota,  // Assuming Toyota logo import is defined
        description: "Shop used Toyota parts for all models. Find engine components, transmission assemblies, and more.",
        title: "Used Toyota Parts for Sale - Engines, Transmissions & More | Revline Auto Parts",
        meta_description: "Find a wide selection of used Toyota parts for repairs. Engine components, transmission assemblies, and suspension parts for all Toyota vehicles."
    },
    {
        name: "Chevrolet",
        url_slug: "chevrolet",
        image_url: Chevrolet,  // Assuming Chevrolet logo import is defined
        description: "Get affordable used Chevrolet parts for engine repairs, drivetrain replacements, and more.",
        title: "Used Chevrolet Parts for Sale - Engine, Drivetrain & More | Revline Auto Parts",
        meta_description: "Shop for reliable used Chevrolet parts, including engines, transmissions, suspension, and more. Find quality components for all Chevrolet models."
    },
    {
        name: "Honda",
        url_slug: "honda",
        image_url: Honda,  // Assuming Honda logo import is defined
        description: "Find quality used Honda parts for sale. Engine components, drivetrain parts, and more for your vehicle.",
        title: "Used Honda Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Browse affordable used Honda parts for repairs. Find engine components, transmission parts, suspension, and more for all Honda vehicles."
    },
    {
        name: "Nissan",
        url_slug: "nissan",
        image_url: Nissan,  // Assuming Nissan logo import is defined
        description: "Explore reliable used Nissan parts. Engine, transmission, and suspension components available.",
        title: "Used Nissan Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Shop for used Nissan parts for your vehicle. Get engine components, drivetrain parts, suspension, and more at affordable prices."
    },
    {
        name: "Hyundai",
        url_slug: "hyundai",
        image_url: Hyundai,  // Assuming Hyundai logo import is defined
        description: "Shop used Hyundai parts for engine repairs, drivetrain replacements, and more. Affordable and reliable.",
        title: "Used Hyundai Parts for Sale - Engines, Transmissions & More | Revline Auto Parts",
        meta_description: "Get affordable used Hyundai parts for all models. Find engine, transmission, suspension components, and more for your Hyundai vehicle."
    },
    {
        name: "Kia",
        url_slug: "kia",
        image_url: Kia,  // Assuming Kia logo import is defined
        description: "Get used Kia parts for your vehicle repairs. Find engine, transmission, suspension parts, and more.",
        title: "Used Kia Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Browse used Kia parts for engine, transmission, suspension repairs, and more. Find quality components for all Kia models at affordable prices."
    },
    {
        name: "Jeep",
        url_slug: "jeep",
        image_url: Jeep,  // Assuming Jeep logo import is defined
        description: "Shop used Jeep parts for off-road performance. Engine, suspension, drivetrain, and more.",
        title: "Used Jeep Parts for Sale - Off-Road Engine, Suspension & More | Revline Auto Parts",
        meta_description: "Find used Jeep parts for your off-road vehicle. Get engine, suspension, drivetrain components, and more for all Jeep models."
    },
    {
        name: "Subaru",
        url_slug: "subaru",
        image_url: Subaru,  // Assuming Subaru logo import is defined
        description: "Explore used Subaru parts for repairs. Engine, transmission, and suspension components available.",
        title: "Used Subaru Parts for Sale - Engine, Suspension & More | Revline Auto Parts",
        meta_description: "Shop for used Subaru parts at Revline Auto Parts. Find reliable engine, suspension, transmission, and drivetrain components for Subaru vehicles."
    },
    {
        name: "Dodge",
        url_slug: "dodge",
        image_url: Dodge,  // Assuming Dodge logo import is defined
        description: "Find affordable Dodge parts for engine rebuilds, drivetrain repairs, and more.",
        title: "Used Dodge Parts for Sale - Engine, Drivetrain & More | Revline Auto Parts",
        meta_description: "Shop for reliable used Dodge parts including engine, drivetrain, suspension components, and more for all Dodge models."
    },
    {
        name: "GMC",
        url_slug: "gmc",
        image_url: GMC,  // Assuming GMC logo import is defined
        description: "Find quality used GMC parts for engine repairs, drivetrain replacements, and more.",
        title: "Used GMC Parts for Sale - Engine, Drivetrain & More | Revline Auto Parts",
        meta_description: "Browse reliable used GMC parts for engine rebuilds, transmission repairs, and other component replacements for GMC vehicles."
    },
    {
        name: "Volkswagen",
        url_slug: "volkswagen",
        image_url: Volkswagen,  // Assuming Volkswagen logo import is defined
        description: "Shop for used Volkswagen parts. Engine, transmission, and drivetrain components available.",
        title: "Used Volkswagen Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Find affordable used Volkswagen parts. Get quality engine, transmission, and suspension components for all Volkswagen models."
    },
    {
        name: "Mazda",
        url_slug: "mazda",
        image_url: Mazda,  // Assuming Mazda logo import is defined
        description: "Explore used Mazda parts for sale. Engine components, drivetrain parts, and more.",
        title: "Used Mazda Parts for Sale - Engines, Transmissions & More | Revline Auto Parts",
        meta_description: "Browse affordable used Mazda parts for repairs. Engine, transmission, suspension, and more for all Mazda vehicles."
    },
    {
        name: "Ram",
        url_slug: "ram",
        image_url: Ram,  // Assuming Ram logo import is defined
        description: "Get used Ram parts for engine rebuilds, suspension repairs, and more.",
        title: "Used Ram Parts for Sale - Engine, Drivetrain & More | Revline Auto Parts",
        meta_description: "Shop for affordable used Ram parts, including engine, drivetrain, suspension, and more for all Ram models."
    },
    {
        name: "Buick",
        url_slug: "buick",
        image_url: Buick,  // Assuming Buick logo import is defined
        description: "Find quality used Buick parts for engine, suspension, and drivetrain repairs.",
        title: "Used Buick Parts for Sale - Engine, Suspension & More | Revline Auto Parts",
        meta_description: "Shop for reliable used Buick parts. Get engine, suspension, drivetrain components, and more for Buick vehicles."
    },
    {
        name: "Chrysler",
        url_slug: "chrysler",
        image_url: Chrysler,  // Assuming Chrysler logo import is defined
        description: "Shop used Chrysler parts for engine and transmission repairs, drivetrain replacements, and more.",
        title: "Used Chrysler Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Browse for reliable used Chrysler parts. Find engine components, drivetrain, suspension, and more for Chrysler vehicles."
    },
    {
        name: "Mitsubishi",
        url_slug: "mitsubishi",
        image_url: Mitsubishi,  // Assuming Mitsubishi logo import is defined
        description: "Explore used Mitsubishi parts for your repairs. Engine, transmission, drivetrain parts, and more.",
        title: "Used Mitsubishi Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Shop for reliable used Mitsubishi parts. Find affordable engine, suspension, drivetrain, and transmission components for Mitsubishi vehicles."
    },
    {
        name: "Fiat",
        url_slug: "fiat",
        image_url: Fiat,  // Assuming Fiat logo import is defined
        description: "Find affordable used Fiat parts for engine, suspension, and transmission repairs.",
        title: "Used Fiat Parts for Sale - Engine, Transmission & More | Revline Auto Parts",
        meta_description: "Browse quality used Fiat parts. Get engine, drivetrain, suspension, and more for Fiat vehicles at affordable prices."
    }
];


const BlogsPage = () => {
    return (
        <div className='flex flex-col justify-center items-center md:pt-10 pt-16 bg-gray-100 relative'>
            <div className='relative'>
                <Banner />
                <p className='absolute text-4xl inset-0 flex justify-center items-center text-white font-inter'>
                    Blogs
                </p>
            </div>
            <section className="flex flex-col justify-center items-center p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center">Popular Makes</h2>
                <div className="flex flex-col gap-6 w-full">
                    {popularMakes.map((make) => (
                        <div
                            key={make.url_slug}
                            className="flex flex-col md:flex-row border rounded-lg p-4 gap-4 md:gap-6 items-center md:items-start w-full md:w-4/5 mx-auto"
                        >
                            <div className="w-full md:w-1/3 flex justify-center items-center">
                                <img
                                    src={make.image_url}
                                    alt={make.name}
                                    className="w-32 md:w-[14rem] object-contain mb-4 md:mb-0"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-2">
                                <h3 className="text-lg md:text-2xl font-semibold text-gray-700">{make.name}</h3>
                                <h1 className="text-base md:text-lg">{make.title}</h1>
                                <h2 className="text-sm md:text-base">{make.meta_description}</h2>
                                <p className="text-sm md:text-base text-gray-600">{make.description}</p>
                                <a href={`/blogs/${make.url_slug}`} className="text-blue-500 hover:underline">Learn More</a>
                                {/* Meta Data (for SEO purposes) */}
                                <div className="meta-data hidden">
                                    <h1>{make.title}</h1>
                                    <meta name="description" content={make.meta_description} />
                                    <meta property="og:title" content={make.title} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogsPage;
