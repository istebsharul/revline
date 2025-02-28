import React from 'react';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Banner from '../../Components/User/Banner';
import { useNavigate } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";


const categories = [
  {
    name: "Engine Components",
    parts: [
      { name: "Engine Blocks", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/dauoclx1zkezh9gks8cg.jpg" },
      { name: "Cylinder Heads", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863247/revline/parts/cmr08qjnglxbdyaafi4p.webp" },
      { name: "Pistons", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863248/revline/parts/m5puo1gyp62z9phc5rr0.jpg" },
      { name: "Crankshafts", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863248/revline/parts/nri2xnzvnli8qi79ewyv.jpg" },
      { name: "Camshafts", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863247/revline/parts/e9a8nr1mytp5shywup8w.jpg" },
      { name: "Timing Belts and Chains", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/vxaso1vchp7rrvoyqlgi.jpg" },
      { name: "Gaskets and Seals", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863248/revline/parts/co8mrzhvo1cmqkubed9o.jpg" },
      { name: "Oil Pumps", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/ffyhyrk54hgrpcam8pzn.jpg" },
      { name: "Water Pumps", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/qnnwz5ts8o7gf3ebqwpq.jpg" },
      { name: "Fuel Injectors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863248/revline/parts/qxdafczvao5ih4l9855e.jpg" },
      { name: "Turbochargers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863248/revline/parts/ezg2alapil1phnrresvr.jpg" }
    ]
  },
  {
    name: "Transmission and Drivetrain",
    parts: [
      { name: "Transmissions", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863257/revline/parts/g0jhcvu8revtyqoynjc4.jpg" },
      { name: "Clutch Kits", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863257/revline/parts/mnajklodjmmrfkmppkxo.webp" },
      { name: "Flywheels", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863257/revline/parts/vz5sodzqvhxwtt4vwdyj.jpg" },
      { name: "Differentials", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863257/revline/parts/ks2fixkafs95rik0cl6t.jpg" },
      { name: "Drive Shafts", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863258/revline/parts/r2fqf7bopqdulifrxvug.jpg" },
      { name: "Axles", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863258/revline/parts/zuciorxyv6yxa0mk5z2v.jpg" },
      { name: "CV Joints", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863258/revline/parts/xjtqsfkczrcmxpzajqh8.jpg" },
      { name: "Transfer Cases", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863258/revline/parts/ngyz0bxolze6cyyxcxin.jpg" }
    ]
  },
  {
    name: "Brakes and Suspension",
    parts: [
      { name: "Brake Pads", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/aci52ydwir7ayj5pz49f.jpg" },
      { name: "Brake Rotors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/zrlymnjtrdl0bwbfdnjo.jpg" },
      { name: "Brake Calipers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/zzfxkidkc1cws4uqyk61.jpg" },
      { name: "Shock Absorbers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/acffscpoe1qhpxkjtjfc.jpg" },
      { name: "Struts", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/ymlpr13xvhohlzqu8t1m.jpg" },
      { name: "Control Arms", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/e6i4rfabswlqnrnvdwyy.jpg" },
      { name: "Sway Bars", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/xskhlns0dolnabaltwpl.png" },
      { name: "Bushings", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/irmfmuv40edljwoynkn2.jpg" }
    ]
  },
  {
    name: "Electrical Components",
    parts: [
      { name: "Alternators", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/flrmtvks6eqqpteaqcqc.jpg" },
      { name: "Starters", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/gqmvknoactdhrkoizsfl.jpg" },
      { name: "Batteries", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863249/revline/parts/ry9pwyy1fmgwkhmhegbu.jpg" },
      { name: "Ignition Coils", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863250/revline/parts/uapoaem7pyh1qf4vflyx.jpg" },
      { name: "Sensors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863250/revline/parts/yfmecfyfgg4wzcdivjx0.jpg" },
      { name: "Wiring Harnesses", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863250/revline/parts/cxxpj5xzrsupflayma6r.jpg" },
      { name: "Relays", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863250/revline/parts/hotwlfpfvjngwfm4ryey.jpg" }
    ]
  },
  {
    name: "Cooling System",
    parts: [
      { name: "Radiators", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863247/revline/parts/nnq6vfb8rjmvraok3ysp.jpg" },
      { name: "Thermostats", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863259/revline/parts/mibhjtoonilakhhhng1u.jpg" },
      { name: "Cooling Fans", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863247/revline/parts/su0fde1xmewafjaabn7q.jpg" },
      { name: "Coolant Reservoirs", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863247/revline/parts/cgjdqd9srnssk2yew3nt.jpg" },
      { name: "Hoses", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863247/revline/parts/xjwzkpwhunmvgmnbmvyy.jpg" }
    ]
  },
  {
    name: "Exhaust System",
    parts: [
      { name: "Mufflers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863250/revline/parts/m8vloojje6nqvkmlmodj.jpg" },
      { name: "Exhaust Pipes", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863250/revline/parts/wly99hyyx5y9ulbqctal.jpg" },
      { name: "Catalytic Converters", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863251/revline/parts/eyjifg6i6t8ujcif7her.jpg" },
      { name: "Headers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863251/revline/parts/tzmzvzu3klq3uzwc3duj.jpg" }
    ]
  },
  {
    name: "Interior Components",
    parts: [
      { name: "Dashboard Panels", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863253/revline/parts/n1idqodbz0ccghrqcefu.jpg" },
      { name: "Seats", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863253/revline/parts/xhv7xtp5qr5tzpwvnzif.jpg" },
      { name: "Carpet", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863254/revline/parts/udnfrmmv8vvkhsqrcexl.jpg" },
      { name: "Headliners", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863254/revline/parts/osbtk5j38qyxfgftlc2l.jpg" },
      { name: "Door Panels", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863254/revline/parts/q1uncybyy4neabio9gek.jpg" }
    ]
  },
  {
    name: "Exterior Components",
    parts: [
      { name: "Bumpers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863251/revline/parts/ohf1rvkcehn9w40nqdmw.jpg" },
      { name: "Grilles", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863251/revline/parts/hsnnhb6zrcdnnv7hc9l7.jpg" },
      { name: "Fenders", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863252/revline/parts/hvdz8r1lcrt1th34iq1k.jpg" },
      { name: "Hoods", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863252/revline/parts/iwadqix2jn49gqxjdpgl.jpg" },
      { name: "Mirrors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863252/revline/parts/kc1ouadgyxrztdseingw.jpg" },
      { name: "Headlights", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863252/revline/parts/onqxprcnlxjllkfppqtw.jpg" },
      { name: "Tail Lights", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863252/revline/parts/youkbgzagchfwfuhuvem.jpg" }
    ]
  },
  {
    name: "Fuel System",
    parts: [
      { name: "Fuel Pumps", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863252/revline/parts/rzxza97zjem4kxt2ioor.jpg" },
      { name: "Fuel Tanks", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863253/revline/parts/nvqgbi4ttc8bkebhhdgm.jpg" },
      { name: "Fuel Filters", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863253/revline/parts/fm1uz3bwl4cutvbwnipu.jpg" },
      { name: "Fuel Rails", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863253/revline/parts/sc6xlpbail6bki0es3gs.jpg" },
      { name: "Fuel Lines", image: "" }
    ]
  },
  {
    name: "Air Conditioning System",
    parts: [
      { name: "AC Compressors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/ugamccdc5vvjpvh860sk.avif" },
      { name: "Condenser", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863245/revline/parts/t0zu29sf4diyfn1csrfy.jpg" },
      { name: "Evaporators", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863245/revline/parts/gzc1rbvskum1qi2f1qj4.jpg" },
      { name: "Expansion Valves", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863245/revline/parts/z0ejcl9xnckf6rxwzvml.jpg" },
      { name: "AC Clutches", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863245/revline/parts/jpwmwtht3gdwt2lfdngs.webp" }
    ]
  },
  {
    name: "Steering System",
    parts: [
      { name: "Steering Wheels", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863256/revline/parts/efhxvbxsv1lbvnr4ttms.jpg" },
      { name: "Power Steering Pumps", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863256/revline/parts/buchgb15tmaq1gerw1ik.jpg" },
      { name: "Steering Racks", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863256/revline/parts/qnds6icbie8rivx7w1ay.jpg" },
      { name: "Steering Columns", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863256/revline/parts/pmesir2rzwobziipisiw.jpg" },
      { name: "Tie Rod Ends", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863256/revline/parts/gvsmjbxkqxdmvmuvvyfl.jpg" }
    ]
  },
  {
    name: "Body and Trim",
    parts: [
      { name: "Spoilers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863245/revline/parts/kjhnzpcw3mc87d4jhqpz.jpg" },
      { name: "Side Skirts", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/cv0wzpj10i3omfwwjrsf.jpg" },
      { name: "Roof Racks", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/wm0xlpez2qcvpz3wqxfm.jpg" },
      { name: "Window Regulators", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/st6kkmurl8weksydbbew.jpg" },
      { name: "Wiper Blades", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863246/revline/parts/rfccbkq6i1n9nlh24ex5.jpg" }
    ]
  },
  {
    name: "Wheels and Tires",
    parts: [
      { name: "Tires", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863258/revline/parts/qg1pvx2oq5z5heg2dzoh.jpg" },
      { name: "Wheel Rims", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863259/revline/parts/q4nshagrivfv1tg2mb0k.jpg" },
      { name: "Hubcaps", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863259/revline/parts/w5gmkt7q4vqzyqmrnvk4.jpg" },
      { name: "Tire Pressure Monitors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863259/revline/parts/mibhjtoonilakhhhng1u.jpg" }
    ]
  },
  {
    name: "Safety and Sensors",
    parts: [
      { name: "Airbags", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863254/revline/parts/ymqmrtgvtivlahzsnxsa.jpg" },
      { name: "ABS Sensors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863254/revline/parts/sjv47kpnmbwaxgqoeirj.jpg" },
      { name: "Parking Sensors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863255/revline/parts/qhaibchrlhb9mzhilchi.avif" },
      { name: "Backup Cameras", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863255/revline/parts/aqp7fko5gmfekg8i601n.jpg" },
      { name: "Blind Spot Monitors", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863255/revline/parts/kscidcmed1fui1tvhtss.jpg" }
    ]
  },
  {
    name: "Accessories",
    parts: [
      { name: "Floor Mats", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/ugamccdc5vvjpvh860sk.avif" },
      { name: "Seat Covers", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/cevrimnfwgnlu3gisr4z.jpg" },
      { name: "Sunshades", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/u9u2iv5uhes3c378i65u.webp" },
      { name: "Cargo Liners", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863244/revline/parts/hnqlachtgui5kht227b0.jpg" },
      { name: "Roof Boxes", image: "https://res.cloudinary.com/drszvaldf/image/upload/v1724863245/revline/parts/nx2t0quk7vvhi2tdm08n.gif" }
    ]
  }
];


const items = [
  {
    id: 1,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599518/Adobe_Express_-_file_4_gp7kbf.png",
    altText: "abs",
    title: "ABS",
    description: "Enhance your vehicle's braking efficiency with a high-quality Anti-lock Braking System (ABS), designed for better control and safety."
  },
  {
    id: 2,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599552/Adobe_Express_-_file_5_geloci.png",
    altText: "headlight",
    title: "Headlight",
    description: "Upgrade your visibility with a premium car headlight, offering bright illumination and improved safety for night driving."
  },
  {
    id: 3,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599504/Adobe_Express_-_file_3_f0d1qm.png",
    altText: "transfercase",
    title: "Transfer Case",
    description: "Ensure smooth power distribution between the front and rear wheels with a durable transfer case, perfect for 4WD and AWD vehicles."
  },
  {
    id: 4,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599486/Adobe_Express_-_file_1_yk9qkq.png",
    altText: "brakemastercylinder",
    title: "Brake Master Cylinder",
    description: "Maintain precise braking performance with a reliable brake master cylinder, essential for safe and responsive braking."
  },
  {
    id: 5,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599465/Adobe_Express_-_file_5_zlvkw2.png",
    altText: "powerbrakemaster",
    title: "Power Brake Master",
    description: "Improve stopping power with a power brake master cylinder, ensuring smooth and efficient braking in all driving conditions."
  },
  {
    id: 6,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599446/Adobe_Express_-_file_6_bc1a9b.png",
    altText: "alternator",
    title: "Alternator",
    description: "Keep your vehicle’s electrical system running smoothly with a high-performance alternator, delivering consistent power output."
  },
  {
    id: 7,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599405/Adobe_Express_-_file_4_awjpls.png",
    altText: "accompressor",
    title: "AC Compressor",
    description: "Stay cool on the road with a top-quality AC compressor, ensuring efficient cooling and climate control for your vehicle."
  },
  {
    id: 8,
    imageUrl: "https://res.cloudinary.com/dp3xz2kbh/image/upload/v1740599390/Adobe_Express_-_file_4_eb7ay2.png",
    altText: "condensor",
    title: "Condensor",
    description: "Optimize your vehicle’s air conditioning system with a high-efficiency condenser, providing excellent cooling performance."
  }
];

const PartsPage = () => {
  const [openCategory, setOpenCategory] = useState(categories[0].name);
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (categoryName) => {
    setOpenCategory((prevCategory) =>
      prevCategory === categoryName ? null : categoryName
    );
  };

  const handlePartClick = () => {
    navigate('/#form')
  }

  return (
    <div className="w-full flex flex-col justify-center items-center md:pt-10 pt-16">
      <div className="relative">
        <Banner />
        <p className="absolute text-2xl md:text-4xl inset-0 flex justify-center items-center text-white font-inter">
          All Parts
        </p>
      </div>

      <div className='md:w-4/5 my-8'>
        {/* <PartCarousel title={'Best Seller'}/> */}
        <h1 className='text-3xl text-red-500 font-bold text-center my-8'> Best Seller</h1>
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {items.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="md:w-[250px] w-[150px] flex flex-col justify-center items-center border rounded-xl hover:shadow-md md:p-4 p-2"
              >
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="md:w-[250px] w-full md:h-[200px] object-contain rounded"
                />
                <div className="flex flex-col w-full ">

                  {/* Title */}
                  <div className="w-full flex justify-between items-center">
                    <h3 className="w-4/5 md:text-lg text-sm text-red-500 font-semibold m-2">{item.title}</h3>

                    {/* View More Button (Visible Only on Hover) */}
                    <button
                      onClick={() => navigate(`/parts/${item.altText}`)}
                      className="w-min border border-red-500 hover:bg-red-500 hover:text-white p-1 rounded-full duration-300 flex justify-center items-center group"
                    >
                      <MdArrowOutward className="md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </div>

                  {/* Description with Ellipsis and "Show More" */}
                  <p
                    className={`text-gray-700 md:text-sm text-xs px-2 ${isExpanded ?"" : "line-clamp-2 overflow-hidden"
                      }`}
                  >
                    {item.description}
                  </p>

                  {!isExpanded && (
                    <button
                      onClick={() => setExpandedId(item.id)}
                      className="text-black  md:text-sm text-xs font-semibold hover:underline self-start px-2"
                    >
                      Show More...
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div className="w-full py-10 md:py-20 flex flex-col justify-center items-center">
        <h1 className='text-3xl text-red-500 font-bold text-center my-8'> All Parts</h1>
        {categories.map((category) => (
          <div key={category.name} className="w-full md:w-3/5 my-4 px-4 md:px-0">
            <div
              className="flex items-center justify-between cursor-pointer px-4 md:px-8 py-3 md:py-4 bg-gray-50 rounded-lg hover:bg-gray-200"
              onClick={() => handleToggle(category.name)}
            >
              <h2 className="text-xl md:text-2xl text-[#f6251a] font-medium">{category.name}</h2>
              {openCategory === category.name ? (
                <FaChevronUp className="text-gray-600 transition-transform duration-300" />
              ) : (
                <FaChevronDown className="text-gray-600 transition-transform duration-300" />
              )}
            </div>
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openCategory === category.name ? 'max-h-screen' : 'max-h-0'}`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                {category.parts.map((part) => (
                  <div
                    onClick={handlePartClick}
                    key={part.name}
                    className="border p-2 md:p-4 rounded bg-white flex flex-col items-center hover:bg-gray-100 hover:shadow-lg cursor-pointer"
                  >
                    {part.image ? (
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-24 md:h-32 object-cover mb-2 rounded"
                      />
                    ) : (
                      <div className="w-full h-24 md:h-32 bg-gray-200 mb-2 rounded flex items-center justify-center">
                        <span className="text-gray-600">No Image Available</span>
                      </div>
                    )}
                    <h3 className="text-sm md:text-lg font-medium mt-2">{part.name}</h3>
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
