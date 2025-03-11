import React from "react";



const vehicleData = [
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1741687039/revlineautoparts/Company/cvj7rw1ubik4cc7t0omv.png",
    brand: "Chrysler",
    models: [
      "Chrysler 200",
      "Chrysler 300",
      "Chrysler Pacifica",
      "Chrysler Town & Country",
      "Chrysler Sebring",
      "Chrysler Aspen",
      "Chrysler PT Cruiser",
    ],
  },
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1729154055/revlineautoparts/Company/afbqwqcybi09hvkokmux.png",
    brand: "Ford",
    models: [
      "Ford F-150",
      "Ford F-250",
      "Ford F-350",
      "Ford Explorer",
      "Ford Escape",
      "Ford Mustang",
      "Ford Focus",
      "Ford Edge",
    ],
  },
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1741687252/revlineautoparts/Company/bqngewpepdxaafez0iiy.png",
    brand: "Dodge",
    models: [
      "Dodge Ram 1500",
      "Dodge Ram 2500",
      "Dodge Ram 3500",
      "Dodge Charger",
      "Dodge Challenger",
      "Dodge Durango",
      "Dodge Grand Caravan",
      "Dodge Journey",
    ],
  },
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1729154056/revlineautoparts/Company/jrvx9iiedjjwpu5emisg.png",
    brand: "Kia",
    models: ["Kia Sorento", "Kia Optima (K5)", "Kia Forte", "Kia Sportage", "Kia Soul", "Kia Telluride"],
  },
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1729154057/revlineautoparts/Company/vzjkayx45uai1cv5w73a.png",
    brand: "Mitsubishi",
    models: ["Mitsubishi Outlander", "Mitsubishi Lancer", "Mitsubishi Eclipse Cross", "Mitsubishi Montero (Pajero)", "Mitsubishi Mirage", "Mitsubishi Galant"],
  },
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1729154055/revlineautoparts/Company/c1rkjrunihzfcybwatac.webp",
    brand: "Honda",
    models: ["Honda Accord", "Honda Civic", "Honda CR-V", "Honda Pilot", "Honda Odyssey", "Honda Ridgeline"],
  },
  {
    logoUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1729154055/revlineautoparts/Company/hfg0axcxr6bxgd9eliii.png",
    brand: "Hyundai",
    models: ["Hyundai Sonata", "Hyundai Elantra", "Hyundai Tucson", "Hyundai Santa Fe", "Hyundai Palisade", "Hyundai Kona"],
  },
];

const PartsModel = () => {
  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-3xl font-bold mb-6">Popular Compatible Vehicles</h2>

      {/* List all Makes and Models */}
      <div className="flex flex-col bg-white rounded-lg p-2">
        {vehicleData.map((brand, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row px-2 py-4 gap-4 ${index === vehicleData?.length - 1 ? '' : 'border-b'}`}
          >
            <div className="md:w-1/4 flex justify-center items-center">
              <img src={brand?.logoUrl} className="w-36 h-full object-contain"></img>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex ">{brand?.brand} Models</h3>
              <ul className="text-gray-700 flex flex-wrap gap-2">
                {brand.models.map((model, i) => (
                  <li key={i} className="md:text-sm text-xs border p-2 rounded-lg bg-gray-100">{model}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsModel;
