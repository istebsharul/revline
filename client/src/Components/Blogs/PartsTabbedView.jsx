import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

const partsData = [
    {
        partName: "ABS",
        part: "abs",
        parts: [
            "Used OEM ABS Control Module",
            "Used ABS Wheel Speed Sensor",
            "Used ABS Hydraulic Unit",
            "Used ABS Actuator",
            "Used ABS Pump Motor",
            "Used ABS Relay",
            "Used ABS Fuse Box",
            "Used ABS Valve Block",
            "Used Front ABS Sensor",
            "Used Rear ABS Sensor",
            "Used ABS Brake Fluid Reservoir",
            "Used ABS Electronic Stability Control Module",
            "Used ABS Wiring Harness",
            "Used ABS Pressure Sensor",
            "Used ABS Warning Light Reset Tool",
        ],
    },
    {
        partName: "Headlight",
        part: "headlight",
        parts: [
            "Used OEM Headlight Assembly",
            "Used LED Headlight Bulbs",
            "Used HID (Xenon) Headlight Kit",
            "Used Halogen Headlight Assembly",
            "Used Projector Headlights",
            "Used Adaptive Headlights",
            "Used Fog Lights",
            "Used Smoked Headlight Assemblies",
            "Used Chrome Headlight Assemblies",
            "Used High Beam and Low Beam Headlights",
            "Used Bi-Xenon HID Headlights",
            "Used Daytime Running Lights (DRL)",
            "Used Sealed Beam Headlights",
            "Used Automatic Headlight Leveling Sensors",
            "Used Headlight Wiring Harness",
        ],
    },
    {
        partName: "Transfer Case",
        part: "transfercase",
        parts: [
            "Used OEM Transfer Case",
            "Used Heavy-Duty Transfer Case",
            "Used Electronic Shift Transfer Case",
            "Used Manual Shift Transfer Case",
            "Used Remanufactured Transfer Case",
            "Used Transfer Case Motor",
            "Used Transfer Case Control Module",
            "Used Transfer Case Seal Kit",
            "Used Transfer Case Chain",
            "Used Transfer Case Fluid Pump",
            "Used Transfer Case Shift Fork",
            "Used Transfer Case Gear Set",
            "Used Transfer Case Oil Pump",
            "Used Transfer Case Gasket Set",
            "Used Transfer Case Output Shaft",
        ],
    },
    {
        partName: "Brake Master Cylinder",
        part: "brakemastercylinder",
        parts: [
            "Used OEM Brake Master Cylinder",
            "Used Dual Reservoir Brake Master Cylinder",
            "Used Single Reservoir Brake Master Cylinder",
            "Used ABS-Compatible Brake Master Cylinder",
            "Used Brake Master Cylinder with Booster",
            "Used High-Performance Brake Master Cylinder",
            "Used Heavy-Duty Brake Master Cylinder",
            "Used Hydraulic Brake Master Cylinder",
            "Used Manual Brake Master Cylinder",
            "Used Performance Racing Brake Master Cylinder",
            "Used Brake Fluid Reservoir with Cap",
            "Used Aluminum Brake Master Cylinder",
            "Used Cast Iron Brake Master Cylinder",
            "Used Brake Master Cylinder Repair Kit",
            "Used Brake Master Cylinder Push Rod",
        ],
    },
    {
        partName: "Power Brake Booster",
        part: "powerbrakebooster",
        parts: [
            "Used OEM Power Brake Booster",
            "Used Vacuum Power Brake Booster",
            "Used Hydraulic Power Brake Booster",
            "Used Dual-Diaphragm Brake Booster",
            "Used Single-Diaphragm Brake Booster",
            "Used Heavy-Duty Brake Booster",
            "Used Brake Booster with Master Cylinder",
            "Used ABS-Compatible Brake Booster",
            "Used Universal Power Brake Booster",
            "Used Diesel Vehicle Brake Booster",
            "Used Electric Power Brake Booster",
            "Used Brake Booster Check Valve",
            "Used Brake Booster Vacuum Hose",
            "Used Brake Booster Mounting Brackets",
            "Used Brake Booster Repair Kit",
        ],
    },
    {
        partName: "Alternator",
        part: "alternator",
        parts: [
            "Used OEM Alternator",
            "Used High-Output Alternator",
            "Used Heavy-Duty Alternator",
            "Used Performance Racing Alternator",
            "Used Truck & SUV Alternator",
            "Used Alternator with Voltage Regulator",
            "Used One-Wire Alternator",
            "Used Dual Alternator Kit",
            "Used Marine Alternator",
            "Used Compact Alternator for Small Cars",
            "Used Alternator Pulley Assembly",
            "Used Alternator Rectifier Diode",
            "Used Alternator Wiring Harness",
            "Used Alternator Brush Kit",
            "Used Alternator Bearing Kit",
        ],
    },
    {
        partName: "A/C Compressor",
        part: "accompressor",
        parts: [
            "Used OEM A/C Compressor",
            "Used Heavy-Duty A/C Compressor",
            "Used Clutchless A/C Compressor",
            "Used A/C Compressor with Clutch",
            "Used Variable Displacement A/C Compressor",
            "Used Rotary A/C Compressor",
            "Used Scroll A/C Compressor",
            "Used Electric A/C Compressor",
            "Used Universal A/C Compressor",
            "Used A/C Compressor Seal Kit",
            "Used A/C Compressor Oil",
            "Used A/C Compressor Pulley Kit",
            "Used A/C Compressor Belt",
            "Used A/C Compressor Control Valve",
            "Used A/C Compressor Mounting Brackets",
        ],
    },
    {
        partName: "Condenser",
        part: "condenser",
        parts: [
            "Used OEM A/C Condenser",
            "Used Heavy-Duty A/C Condenser",
            "Used Aluminum A/C Condenser",
            "Used Universal A/C Condenser",
            "Used Dual-Fan A/C Condenser",
            "Used A/C Condenser with Integrated Receiver Drier",
            "Used Parallel Flow A/C Condenser",
            "Used Serpentine A/C Condenser",
            "Used Micro-Channel A/C Condenser",
            "Used A/C Condenser Cooling Fan Assembly",
            "Used A/C Condenser Tube & Fin Kit",
            "Used A/C Condenser Mounting Kit",
            "Used A/C Condenser Coil Cleaner",
            "Used A/C Condenser Replacement Hose Kit",
            "Used A/C Condenser Bracket & Hardware",
        ],
    },
];

const PartsTabbedView = ({ part }) => {
    const containerRef = useRef(null);
    const selectedRef = useRef(null);

    const [selectedPart, setSelectedPart] = useState(
        partsData.find(p => p.part === part) || partsData[0]
    );

    useEffect(() => {
        const foundPart = partsData.find(p => p.part === part);
        if (foundPart) {
            setSelectedPart(foundPart);
        }
    }, [part]);

    // Smooth horizontal scroll when the selected part changes
    useEffect(() => {
        if (containerRef.current && selectedRef.current) {
            const container = containerRef.current;
            const selectedButton = selectedRef.current;

            // Calculate scroll position
            const scrollAmount =
                selectedButton.offsetLeft - container.offsetWidth / 2 + selectedButton.offsetWidth / 2;

            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    }, [selectedPart]);

    const capitalizedPart = selectedPart.partName;

    return (
        <div className="container mx-auto p-2">
            <Helmet>
                <title>{`Used ${capitalizedPart} Parts | OEM & Replacement Options Available`}</title>
                <meta
                    name="description"
                    content={`Shop high-quality used ${capitalizedPart} parts including ${selectedPart.parts.slice(0, 5).join(", ")} and more. Affordable OEM replacements with warranty.`}
                />
                <meta
                    name="keywords"
                    content={`used ${capitalizedPart} parts, OEM ${capitalizedPart}, replacement ${capitalizedPart}, affordable ${capitalizedPart}, recycled ${capitalizedPart}, second hand ${capitalizedPart}`}
                />
                <meta property="og:title" content={`Used ${capitalizedPart} Parts | Affordable OEM Replacements`} />
                <meta property="og:description" content={`Buy used ${capitalizedPart} parts including ${selectedPart.parts[0]}, ${selectedPart.parts[1]}, and more. OEM-tested & affordable.`} />
                <meta property="og:type" content="website" />
            </Helmet>

            <h2 className="md:text-3xl text-xl font-bold mb-6">Top Auto Parts Trusted by Customers</h2>

            {/* Horizontal Scrollable Tabs */}
            <div
                ref={containerRef}
                className="w-full overflow-x-auto whitespace-nowrap flex justify-start gap-3 border-b py-3 scrollbar-hide scroll-smooth"
            >
                {partsData.map((p, index) => (
                    <button
                        key={index}
                        ref={selectedPart.part === p.part ? selectedRef : null} // Attach ref to selected part
                        className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPart.part === p.part
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        onClick={() => setSelectedPart(p)}
                    >
                        {p.partName}
                    </button>
                ))}
            </div>

            {/* Display Selected Part's Subparts */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-red-600 mb-4">
                    {selectedPart.partName} Subparts
                </h3>
                <ul className="text-gray-700 flex flex-wrap gap-2">
                    {selectedPart.parts.map((subpart, i) => (
                        <li key={i} className="md:text-sm text-xs border p-2 rounded-lg bg-gray-100">
                            {subpart}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default PartsTabbedView;
