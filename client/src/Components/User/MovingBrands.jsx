import React from "react";

// Dynamically import 15 images
import brand1 from '../../Assets/Company/audi.webp';
import brand2 from '../../Assets/Company/bentley.webp';
import brand3 from '../../Assets/Company/bmw.webp';
import brand4 from '../../Assets/Company/chevrolet.webp';
import brand5 from '../../Assets/Company/ford.webp';
import brand6 from '../../Assets/Company/honda.webp';
import brand7 from '../../Assets/Company/hyundai.webp';
import brand8 from '../../Assets/Company/jaguar.webp';
import brand9 from '../../Assets/Company/jeep.webp';
import brand10 from '../../Assets/Company/kia.webp';
import brand11 from '../../Assets/Company/lamborghini.webp';
import brand12 from '../../Assets/Company/mclaren.webp';
import brand13 from '../../Assets/Company/mercedes.webp';
import brand14 from '../../Assets/Company/mitsubishi.webp';
import brand15 from '../../Assets/Company/toyota.webp';

// Array of brand images
const brandImages = [
  { src: brand1, alt: 'Brand 1' },
  { src: brand2, alt: 'Brand 2' },
  { src: brand3, alt: 'Brand 3' },
  { src: brand4, alt: 'Brand 4' },
  { src: brand5, alt: 'Brand 5' },
  { src: brand6, alt: 'Brand 6' },
  { src: brand7, alt: 'Brand 7' },
  { src: brand8, alt: 'Brand 8' },
  { src: brand9, alt: 'Brand 9' },
  { src: brand10, alt: 'Brand 10' },
  { src: brand11, alt: 'Brand 11' },
  { src: brand12, alt: 'Brand 12' },
  { src: brand13, alt: 'Brand 13' },
  { src: brand14, alt: 'Brand 14' },
  { src: brand15, alt: 'Brand 15' }
];

const MovingBrands = () => {
  return (
    <div className="w-full h-fit relative md:my-10 my-5 flex">
      <div className="w-full overflow-hidden whitespace-nowrap p-2 rounded-full">
        <div className="inline-block animate-marquee flex justify-between items-center space-x-4">
          {/* Duplicate logos for infinite scrolling effect */}
          {[...Array(3)].map((_, i) =>
            brandImages.map((brand, index) => (
              <span
                key={`${i}-${index}`}
                className="text-lg font-bold flex-shrink-0"
              >
                <img src={brand.src} alt={brand.alt} className="h-10 w-auto" />
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovingBrands;