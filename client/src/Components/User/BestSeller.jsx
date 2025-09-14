
import React, { useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Helmet } from "react-helmet-async"; // ✅ for SEO injection

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
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);

  // ✅ JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Seller Auto Parts",
    url: "https://revlineautoparts.com/best-sellers",
    description:
      "Discover top-quality auto parts including ABS, headlights, alternators, and more. Trusted by Revline Auto Parts customers.",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "Product",
      position: index + 1,
      name: item.title,
      image: item.imageUrl,
      description: item.description,
      sku: item.altText,
      brand: {
        "@type": "Brand",
        name: "Revline Auto Parts",
      },
      url: `https://revlineautoparts.com/parts/${item.altText}`,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        // you can add price dynamically if you have it
        price: "0.00",
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="2xl:px-72 md:py-20 md:px-40 p-8 mx-auto flex md:flex-row flex-col gap-6 bg-white">
        {/* Left section */}
        <div className="md:w-1/3 flex flex-col justify-center md:text-left text-center">
          <h1 className="text-4xl text-red-500 font-bold mb-4">
            <span className="text-black">Best</span> Sellers
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
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
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

          {/* Custom Buttons (now use class selectors) */}
          <button
            className="custom-prev w-10 h-10 flex justify-center items-center absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 hover:shadow-lg border bg-[#f6251a] text-white rounded-full transition"
          >
            &#8592;
          </button>
          <button
            className="custom-next w-10 h-10 flex justify-center items-center absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 hover:shadow-lg border bg-[#f6251a] text-white rounded-full transition"
          >
            &#8594;
          </button>

        </div>
      </div>
    </>
  );
};

export default BestSeller;