import React from 'react';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Banner from '../../Components/User/Banner';

const categories = [
  {
    name: "Engine Components",
    parts: [
      { name: "Engine Blocks", image: "" },
      { name: "Cylinder Heads", image: "" },
      { name: "Pistons", image: "" },
      { name: "Crankshafts", image: "" },
      { name: "Camshafts", image: "" },
      { name: "Timing Belts and Chains", image: "" },
      { name: "Gaskets and Seals", image: "" },
      { name: "Oil Pumps", image: "" },
      { name: "Water Pumps", image: "" },
      { name: "Fuel Injectors", image: "" },
      { name: "Turbochargers", image: "" }
    ]
  },
  {
    name: "Transmission and Drivetrain",
    parts: [
      { name: "Transmissions", image: "" },
      { name: "Clutch Kits", image: "" },
      { name: "Flywheels", image: "" },
      { name: "Differentials", image: "" },
      { name: "Drive Shafts", image: "" },
      { name: "Axles", image: "" },
      { name: "CV Joints", image: "" },
      { name: "Transfer Cases", image: "" }
    ]
  },
  {
    name: "Brakes and Suspension",
    parts: [
      { name: "Brake Pads", image: "" },
      { name: "Brake Rotors", image: "" },
      { name: "Brake Calipers", image: "" },
      { name: "Shock Absorbers", image: "" },
      { name: "Struts", image: "" },
      { name: "Control Arms", image: "" },
      { name: "Sway Bars", image: "" },
      { name: "Bushings", image: "" }
    ]
  },
  {
    name: "Electrical Components",
    parts: [
      { name: "Alternators", image: "" },
      { name: "Starters", image: "" },
      { name: "Batteries", image: "" },
      { name: "Ignition Coils", image: "" },
      { name: "Sensors", image: "" },
      { name: "Wiring Harnesses", image: "" },
      { name: "Relays", image: "" }
    ]
  },
  {
    name: "Cooling System",
    parts: [
      { name: "Radiators", image: "" },
      { name: "Thermostats", image: "" },
      { name: "Cooling Fans", image: "" },
      { name: "Coolant Reservoirs", image: "" },
      { name: "Hoses", image: "" }
    ]
  },
  {
    name: "Exhaust System",
    parts: [
      { name: "Mufflers", image: "" },
      { name: "Exhaust Pipes", image: "" },
      { name: "Catalytic Converters", image: "" },
      { name: "Headers", image: "" }
    ]
  },
  {
    name: "Interior Components",
    parts: [
      { name: "Dashboard Panels", image: "" },
      { name: "Seats", image: "" },
      { name: "Carpet", image: "" },
      { name: "Headliners", image: "" },
      { name: "Door Panels", image: "" }
    ]
  },
  {
    name: "Exterior Components",
    parts: [
      { name: "Bumpers", image: "" },
      { name: "Grilles", image: "" },
      { name: "Fenders", image: "" },
      { name: "Hoods", image: "" },
      { name: "Mirrors", image: "" },
      { name: "Headlights", image: "" },
      { name: "Tail Lights", image: "" }
    ]
  },
  {
    name: "Fuel System",
    parts: [
      { name: "Fuel Pumps", image: "" },
      { name: "Fuel Tanks", image: "" },
      { name: "Fuel Filters", image: "" },
      { name: "Fuel Rails", image: "" },
      { name: "Fuel Lines", image: "" }
    ]
  },
  {
    name: "Air Conditioning System",
    parts: [
      { name: "AC Compressors", image: "" },
      { name: "Condenser", image: "" },
      { name: "Evaporators", image: "" },
      { name: "Expansion Valves", image: "" },
      { name: "AC Clutches", image: "" }
    ]
  },
  {
    name: "Steering System",
    parts: [
      { name: "Steering Wheels", image: "" },
      { name: "Power Steering Pumps", image: "" },
      { name: "Steering Racks", image: "" },
      { name: "Steering Columns", image: "" },
      { name: "Tie Rod Ends", image: "" }
    ]
  },
  {
    name: "Body and Trim",
    parts: [
      { name: "Spoilers", image: "" },
      { name: "Side Skirts", image: "" },
      { name: "Roof Racks", image: "" },
      { name: "Window Regulators", image: "" },
      { name: "Wiper Blades", image: "" }
    ]
  },
  {
    name: "Wheels and Tires",
    parts: [
      { name: "Tires", image: "" },
      { name: "Wheel Rims", image: "" },
      { name: "Hubcaps", image: "" },
      { name: "Tire Pressure Monitors", image: "" }
    ]
  },
  {
    name: "Safety and Sensors",
    parts: [
      { name: "Airbags", image: "" },
      { name: "ABS Sensors", image: "" },
      { name: "Parking Sensors", image: "" },
      { name: "Backup Cameras", image: "" },
      { name: "Blind Spot Monitors", image: "" }
    ]
  },
  {
    name: "Accessories",
    parts: [
      { name: "Floor Mats", image: "" },
      { name: "Seat Covers", image: "" },
      { name: "Sunshades", image: "" },
      { name: "Cargo Liners", image: "" },
      { name: "Roof Boxes", image: "" }
    ]
  }
];

const PartsPage = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const handleToggle = (categoryName) => {
    setOpenCategory((prevCategory) =>
      prevCategory === categoryName ? null : categoryName
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center md:pt-10 pt-16">
      <div className="relative">
        <Banner />
        <p className="absolute text-4xl inset-0 flex justify-center items-center text-white font-inter">
          All Parts
        </p>
      </div>
      <div className="w-full py-20 flex flex-col justify-center items-center">
        {categories.map((category) => (
          <div key={category.name} className="w-3/5 my-4">
            <div
              className="flex items-center justify-between cursor-pointer px-8 py-4 bg-gray-50 rounded-lg hover:bg-gray-200"
              onClick={() => handleToggle(category.name)}
            >
              <h2 className="text-2xl text-red-600 font-medium">{category.name}</h2>
              {openCategory === category.name ? (
                <FaChevronUp className="text-gray-600 transition-transform duration-300" />
              ) : (
                <FaChevronDown className="text-gray-600 transition-transform duration-300" />
              )}
            </div>
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openCategory === category.name ? 'max-h-screen' : 'max-h-0'
                }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                {category.parts.map((part) => (
                  <div
                    key={part.name}
                    className="border p-4 rounded bg-white flex flex-col items-center"
                  >
                    {part.image ? (
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-32 object-cover mb-2 rounded"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 mb-2 rounded flex items-center justify-center">
                        <span className="text-gray-600">No Image Available</span>
                      </div>
                    )}
                    <h3 className="text-lg font-medium mt-2">{part.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default PartsPage;
