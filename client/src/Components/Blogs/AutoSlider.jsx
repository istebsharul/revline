import { useState, useEffect } from "react";

const AutoSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      {/* Images */}
      <div
        className="w-full flex transition-transform duration-700 ease-in-out justify-start items-center"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((item, index) => (
          <img
            key={item.id}
            src={item.imageUrl}
            alt={item.altText}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

    </div>
  );
};

export default AutoSlider;

