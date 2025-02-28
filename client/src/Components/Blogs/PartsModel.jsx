import React from "react";

const vehicleData = [
  {
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
    brand: "Kia",
    models: ["Kia Sorento", "Kia Optima (K5)", "Kia Forte", "Kia Sportage", "Kia Soul", "Kia Telluride"],
  },
  {
    brand: "Mitsubishi",
    models: ["Mitsubishi Outlander", "Mitsubishi Lancer", "Mitsubishi Eclipse Cross", "Mitsubishi Montero (Pajero)", "Mitsubishi Mirage", "Mitsubishi Galant"],
  },
  {
    brand: "Honda",
    models: ["Honda Accord", "Honda Civic", "Honda CR-V", "Honda Pilot", "Honda Odyssey", "Honda Ridgeline"],
  },
  {
    brand: "Hyundai",
    models: ["Hyundai Sonata", "Hyundai Elantra", "Hyundai Tucson", "Hyundai Santa Fe", "Hyundai Palisade", "Hyundai Kona"],
  },
];

const PartsModel = () => {
  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-3xl font-bold mb-6">Compatible Vehicles</h2>

      {/* List all Makes and Models */}
      <div className="flex flex-col bg-white rounded-lg">
        {vehicleData.map((brand, index) => (
          <div key={index} className="p-4">
            <h3 className="text-xl font-semibold text-red-600 mb-4">{brand.brand} Models</h3>
            <ul className="text-gray-700 flex flex-wrap gap-2">
              {brand.models.map((model, i) => (
                <li key={i} className="md:text-sm text-xs border p-2 rounded-lg bg-gray-100">{model}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsModel;
