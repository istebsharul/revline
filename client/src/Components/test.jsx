import React, { useState, useEffect } from 'react';
import data from '../../src/data/data.json';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [noOfParts,setNoOfParts] = useState(0);

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        zipCode: '',
        captcha: ''
    });

    const [vehicleData, setVehicleData] = useState({
        year: '',
        make: '',
        model: '',
        carPart: '',
        variant: '',
        specification: ''
    });

    const [errors, setErrors] = useState({});
    const [years, setYears] = useState([]);
    const [filteredMakes, setFilteredMakes] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [filteredCarParts, setFilteredCarParts] = useState([]);
    const [filteredVariants, setFilteredVariants] = useState([]);
    const [filteredSpecifications, setFilteredSpecifications] = useState([]);

    // Extract unique years
    useEffect(() => {
        const uniqueYears = [...new Set(data.map(item => item.year))].sort((a, b) => b - a);
        setYears(uniqueYears);
    }, []);

    // Filter makes based on selected year
    useEffect(() => {
        if (vehicleData.year) {
            // console.log("Before", data);
            const makes = [...new Set(data
                .filter(item => item.year === Number(vehicleData.year))  // Filter by year first
                .map(item => item.make)                          // Then map to make
            )];
            setNoOfParts(makes.length);
            // console.log("After", makes); // This should now correctly show the makes
            setFilteredMakes(makes);
            setFilteredModels([]);
            setFilteredCarParts([]);
            setFilteredVariants([]);
            setFilteredSpecifications([]);
        }
    }, [vehicleData.year]);


    // Filter models based on selected make
    useEffect(() => {
        // console.log(vehicleData.make);
        if (vehicleData.make) {
            const models = [...new Set(data
                .filter(item =>
                    item.year === Number(vehicleData.year) &&
                    item.make === vehicleData.make
                ).map(item => item.model)
            )];
            setNoOfParts(models.length);

            setFilteredModels(models);
            setFilteredCarParts([]);
            setFilteredVariants([]);
            setFilteredSpecifications([]);
        }
    }, [vehicleData.make, vehicleData.year]);

    // Filter car parts based on selected model
    useEffect(() => {
        if (vehicleData.model) {
            const carParts = [...new Set(data
                .filter(item =>
                    item.year === Number(vehicleData.year) &&
                    item.make === vehicleData.make &&
                    item.model === vehicleData.model
                ).map(item => item.carPart)
            )];
            setNoOfParts(carParts.length);

            setFilteredCarParts(carParts);
            setFilteredVariants([]);
            setFilteredSpecifications([]);
        }
    }, [vehicleData.model, vehicleData.make, vehicleData.year]);

    // Filter variants based on selected car part
    useEffect(() => {
        if (vehicleData.carPart) {
            const variants = [...new Set(data
                .filter(item =>
                    item.year === Number(vehicleData.year) &&
                    item.make === vehicleData.make &&
                    item.model === vehicleData.model &&
                    item.carPart === vehicleData.carPart
                ).map(item => item.variant)
            )];
            setNoOfParts(variants.length);

            setFilteredVariants(variants);
            setFilteredSpecifications([]);
        }
    }, [vehicleData.carPart, vehicleData.model, vehicleData.make, vehicleData.year]);

    // Filter specifications based on selected variant
    useEffect(() => {
        if (vehicleData.variant) {
            const specifications = [...new Set(data
                .filter(item =>
                    item.year === Number(vehicleData.year) &&
                    item.make === vehicleData.make &&
                    item.model === vehicleData.model &&
                    item.carPart === vehicleData.carPart &&
                    item.variant === vehicleData.variant
                ).map(item => item.specification)
            )];
            setNoOfParts(specifications.length);

            setFilteredSpecifications(specifications);
        }
    }, [vehicleData.variant, vehicleData.carPart, vehicleData.model, vehicleData.make, vehicleData.year]);

    const validateStep1 = () => {
        const errors = {};
        if (!vehicleData.year) errors.year = 'Year is required';
        if (!vehicleData.make) errors.make = 'Make is required';
        if (!vehicleData.model) errors.model = 'Model is required';
        if (!vehicleData.carPart) errors.carPart = 'Car Part is required';
        return errors;
    };

    const validateStep2 = () => {
        const errors = {};
        if (!vehicleData.variant) errors.variant = 'Variant is required';
        if (!vehicleData.specification) errors.specification = 'Specification is required';
        return errors;
    };

    const validateStep3 = () => {
        const errors = {};
        if (!userData.fullName) errors.fullName = 'Full Name is required';
        if (!userData.email) errors.email = 'Email is required';
        if (!userData.contactNumber) errors.contactNumber = 'Contact Number is required';
        if (!userData.zipCode) errors.zipCode = 'Zip Code is required';
        if (!userData.captcha) errors.captcha = 'Captcha is required';
        return errors;
    };

    const handleNext = () => {
        let validationErrors = {};
        if (step === 1) {
            validationErrors = validateStep1();
        } else if (step === 2) {
            validationErrors = validateStep2();
        } else if (step === 3) {
            validationErrors = validateStep3();
        }
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            setStep(prevStep => prevStep + 1);
        } else {
            setErrors(validationErrors);
        }
    };

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = () => {
        const formData = {
            vehicleData,
            userData
        };

        fetch('/api/form-submission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            {noOfParts && <div>{noOfParts}</div>}
            <h2 className="text-2xl font-semibold text-center mb-6">
                {step === 1 ? 'Vehicle Information - Part 1' :
                    step === 2 ? 'Vehicle Information - Part 2' :
                        'User Information & Captcha'}
            </h2>

            {step === 1 && (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Year</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={vehicleData.year}
                            onChange={e => setVehicleData({ ...vehicleData, year: e.target.value })}
                        >
                            <option value="">Select Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {errors.year && <p className="text-red-500">{errors.year}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Make</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={vehicleData.make}
                            onChange={e => setVehicleData({ ...vehicleData, make: e.target.value })}
                            disabled={!vehicleData.year}
                        >
                            <option value="">Select Make</option>
                            {filteredMakes.map(make => (
                                <option key={make} value={make}>{make}</option>
                            ))}
                        </select>
                        {errors.make && <p className="text-red-500">{errors.make}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Model</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={vehicleData.model}
                            onChange={e => setVehicleData({ ...vehicleData, model: e.target.value })}
                            disabled={!vehicleData.make}
                        >
                            <option value="">Select Model</option>
                            {filteredModels.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                        {errors.model && <p className="text-red-500">{errors.model}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Car Part</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={vehicleData.carPart}
                            onChange={e => setVehicleData({ ...vehicleData, carPart: e.target.value })}
                            disabled={!vehicleData.model}
                        >
                            <option value="">Select Car Part</option>
                            {filteredCarParts.map(part => (
                                <option key={part} value={part}>{part}</option>
                            ))}
                        </select>
                        {errors.carPart && <p className="text-red-500">{errors.carPart}</p>}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Variant</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={vehicleData.variant}
                            onChange={e => setVehicleData({ ...vehicleData, variant: e.target.value })}
                        >
                            <option value="">Select Variant</option>
                            {filteredVariants.map(variant => (
                                <option key={variant} value={variant}>{variant}</option>
                            ))}
                        </select>
                        {errors.variant && <p className="text-red-500">{errors.variant}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Specification</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={vehicleData.specification}
                            onChange={e => setVehicleData({ ...vehicleData, specification: e.target.value })}
                        >
                            <option value="">Select Specification</option>
                            {filteredSpecifications.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                        {errors.specification && <p className="text-red-500">{errors.specification}</p>}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            type="text"
                            value={userData.fullName}
                            onChange={e => setUserData({ ...userData, fullName: e.target.value })}
                        />
                        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contact Number</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            type="text"
                            value={userData.contactNumber}
                            onChange={e => setUserData({ ...userData, contactNumber: e.target.value })}
                        />
                        {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Zip Code</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            type="text"
                            value={userData.zipCode}
                            onChange={e => setUserData({ ...userData, zipCode: e.target.value })}
                        />
                        {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Captcha</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            type="text"
                            value={userData.captcha}
                            onChange={e => setUserData({ ...userData, captcha: e.target.value })}
                        />
                        {errors.captcha && <p className="text-red-500">{errors.captcha}</p>}
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                {step > 1 && (
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>
                )}
                {step < 3 ? (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
