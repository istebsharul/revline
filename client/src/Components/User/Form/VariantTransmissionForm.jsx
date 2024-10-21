import { useEffect, useState } from 'react';
import React from 'react';
import Select from 'react-select';

const VariantTransmissionForm = ({ trims,vehicleData, setVehicleData, errors }) => {
    // const [transmission, setTransmission] = useState([]);


    const transmissionOptions = trims
        ? [...trims?.map(trim => ({ value: trim, label: trim })), { value: 'I\'m not sure', label: 'I\'m not sure' }]
        : [{ value: 'I\'m not sure', label: 'I\'m not sure' }];

    // Define static options for Variant
    const variantOptions = [
        { value: '2 Wheel Drive, Automatic', label: '2 Wheel Drive, Automatic' },
        { value: '4 Wheel Drive, Automatic', label: '4 Wheel Drive, Automatic' },
        { value: '2 Wheel Drive, Manual', label: '2 Wheel Drive, Manual' },
        { value: '4 Wheel Drive, Manual', label: '4 Wheel Drive, Manual' },
        { value: 'Other, Not listed here', label: 'Other, Not listed here' },
        { value: 'I\'m not sure', label: 'I\'m not sure' }
    ];

    return (
        <div className='space-y-2'>
            <div>
                <label className="block text-gray-800 text-sm p-1">Transmission*</label>
                <Select
                    className="w-full"
                    value={vehicleData.transmission ? { value: vehicleData.transmission, label: vehicleData.transmission } : null}
                    onChange={option => setVehicleData({ ...vehicleData, transmission: option.value })}
                    options={transmissionOptions}
                    placeholder="Select Transmission"
                />
                {errors.transmission && <p className="text-xs text-red-600">{errors.transmission}</p>}
            </div>
            <div>
                <label className="block text-gray-800 text-sm p-1">Variant*</label>
                <Select
                    className="w-full"
                    value={vehicleData.variant ? { value: vehicleData.variant, label: vehicleData.variant } : null}
                    onChange={option => setVehicleData({ ...vehicleData, variant: option.value })}
                    options={variantOptions} // Use the static variant options
                    placeholder="Select Variant"
                />
                {errors.variant && <p className="text-xs text-red-600">{errors.variant}</p>}
            </div>
            <div >
                <label className="block text-gray-800 text-xs flex justify-between"><p>Vehicle Information Number (VIN)</p>  <p>*Optional</p></label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder='Enter VIN'
                    value={vehicleData.vin}
                    onChange={e => setVehicleData({ ...vehicleData, vin: e.target.value })}
                />
                {errors.vin && <p className="text-xs text-red-600">{errors.vin}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-800 text-sm p-1">Message</label>
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder='Enter a message'
                    value={vehicleData.message}
                    onChange={e => setVehicleData({ ...vehicleData, message: e.target.value })}
                />
                {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
            </div>
        </div>
    );
};

export default VariantTransmissionForm;
