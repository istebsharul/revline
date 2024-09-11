import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import React Select
import data from '../../data/data.json';
import { TiTick } from "react-icons/ti";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [noOfParts, setNoOfParts] = useState();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        zipcode: '',
    });

    const [vehicleData, setVehicleData] = useState({
        year: '',
        make: '',
        model: '',
        carPart: '',
        variant: '',
        transmission: '',
        vin: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [years, setYears] = useState([]);
    const [filteredMakes, setFilteredMakes] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [filteredCarParts, setFilteredCarParts] = useState([]);
    const [filteredVariants, setFilteredVariants] = useState([]);
    const [filteredTransmission, setFilteredTransmission] = useState([]);

    // Extract unique years
    useEffect(() => {
        const uniqueYears = [...new Set(data.map(item => item.year))].sort((a, b) => b - a);
        setYears(uniqueYears);
    }, []);

    // Filter makes based on selected year
    useEffect(() => {
        if (vehicleData.year) {
            const makes = [...new Set(data
                .filter(item => item.year === Number(vehicleData.year))
                .map(item => item.make)
            )];
            setNoOfParts(makes.length);
            setFilteredMakes(makes.map(make => ({ value: make, label: make })));
            setFilteredModels([]);
            setFilteredCarParts([]);
            setFilteredVariants([]);
            setFilteredTransmission([]);
        }
    }, [vehicleData.year]);

    // Filter models based on selected make
    useEffect(() => {
        if (vehicleData.make) {
            const models = [...new Set(data
                .filter(item =>
                    item.year === Number(vehicleData.year) &&
                    item.make === vehicleData.make
                ).map(item => item.model)
            )];
            setNoOfParts(models.length);
            setFilteredModels(models.map(model => ({ value: model, label: model })));
            setFilteredCarParts([]);
            setFilteredVariants([]);
            setFilteredTransmission([]);
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
            setFilteredCarParts(carParts.map(part => ({ value: part, label: part })));
            setFilteredVariants([]);
            setFilteredTransmission([]);
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
            setFilteredVariants(variants.map(variant => ({ value: variant, label: variant })));
            setFilteredTransmission([]);
        }
    }, [vehicleData.carPart, vehicleData.model, vehicleData.make, vehicleData.year]);

    // Filter transmission based on selected variant
    useEffect(() => {
        if (vehicleData.variant) {
            const transmission = [...new Set(data
                .filter(item =>
                    item.year === Number(vehicleData.year) &&
                    item.make === vehicleData.make &&
                    item.model === vehicleData.model &&
                    item.carPart === vehicleData.carPart &&
                    item.variant === vehicleData.variant
                ).map(item => item.transmission)
            )];
            setNoOfParts(transmission.length);
            setFilteredTransmission(transmission.map(spec => ({ value: spec, label: spec })));
        }
    }, [vehicleData.variant, vehicleData.carPart, vehicleData.model, vehicleData.make, vehicleData.year]);

    const validateStep1 = () => {
        const errors = {};
        if (!vehicleData.year) errors.year = 'Year is required';
        if (!vehicleData.make) errors.make = 'Make is required';
        if (!vehicleData.model) errors.model = 'Model is required';
        if (!vehicleData.carPart) errors.carPart = 'Part is required';
        return errors;
    };

    const validateStep2 = () => {
        const errors = {};
        if (!vehicleData.variant) errors.variant = 'Variant is required';
        if (!vehicleData.transmission) errors.transmission = 'Specification is required';
        return errors;
    };

    const validateStep3 = () => {
        const errors = {};
        if (!userData.name) errors.name = 'Full Name is required';
        if (!userData.email) errors.email = 'Email is required';
        if (!userData.phone) errors.phone = 'Contact Number is required';
        if (!userData.zipcode) errors.zipcode = 'Zip Code is required';
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

    const handleSubmit = async () => {
        const formData = {
            vehicleData,
            userData,
        };
        console.log(formData);

        // Destructure userData and vehicleData for cleaner code
        const { name, email, phone, zipcode } = userData;
        console.log([vehicleData]);

        // Define the promise
        const postRequest = axios.post('/api/v1/customer/create', {
            name,
            email,
            phone,
            zipcode, // Include address as per the schema
            vehicleData: vehicleData, // Corrected: Send vehicleData as an array
        });

        // Use toast.promise to handle the promise states
        toast.promise(postRequest, {
            loading: 'Submitting your request...',
            success: 'Success! Your quotation request has been sent. Check your email for the details.',
            error: 'Failed to create customer and vehicle data. Please try again.',
        })
            .then((response) => {
                // Handle success response
                console.log('Success:', response.data);

                // Clear the form by resetting the state to initial values
                setUserData({
                    name: '',
                    email: '',
                    phone: '',
                    zipcode: '',
                });

                setVehicleData({
                    year: '',
                    make: '',
                    model: '',
                    carPart: '',
                    variant: '',
                    transmission: '',
                    vin: '',
                    message: ''
                });

                setStep(1);  // Update the step after successful submission
            })
            .catch((error) => {
                // Handle errors (axios will throw for HTTP errors as well)
                if (error.response) {
                    console.error('Error Response:', error.response.data);
                    toast.error(`Error: ${error.response.data.message}`);  // Show error toast with response message
                } else if (error.request) {
                    console.error('Error Request:', error.request);
                    toast.error('No response from server. Please try again.');  // Show error toast for no response
                } else {
                    console.error('Error:', error.message);
                    toast.error(`Error: ${error.message}`);  // Show error toast for any other errors
                }
            });
    };

    return (
        <div className="w-full max-w-md mx-auto md:mt-10 p-2 rounded-lg">
            <div className='flex justify-center items-center p-2 m-2'>
                <div className="w-4/5 flex items-center justify-center">
                    {[1, 2, 3].map((item, index) => (
                        <React.Fragment key={item}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step === item ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-200 text-sm p-1'}`}
                            >
                                {item}
                            </div>
                            {index < 2 && (
                                <div className="w-2/6 h-1 bg-gray-300"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className='bg-gradient-to-r from-white to-red-500 rounded-lg 2xl:p-[0.05rem] md:p-[0.02rem]'>
                <div className='bg-black backdrop-blur p-4 shadow-lg rounded-lg'>
                    <div>
                        <h2 className="text-2xl font-semibold text-left p-2 mb-1 text-white">
                            {step === 1 ? "Let's find your part!" :
                                step === 2 ? 'You are just 1 step away!' :
                                    "You're just a click away!"}
                        </h2>
                        <p>

                        </p>
                    </div>
                    {step === 1 && (
                        <div>
                            {!noOfParts && <div className='p-1 text-red-600 text-lg font-semibold mb-1'>Search from {data.length} Parts Available</div>}
                            {noOfParts ? <div className='flex justify-between items-center p-1'><p className='p-1 text-red-600 text-lg font-semibold mb-1'>Parts in stock</p><p className='w-1/4 p-1 bg-red-600 text-white font-bold rounded-md text-center'>{noOfParts}</p></div> : <div></div>}
                            <div className='space-y-2'>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Year*</label>
                                    <Select
                                        className="w-full"
                                        value={vehicleData.year ? { value: vehicleData.year, label: vehicleData.year } : null}
                                        onChange={option => setVehicleData({ ...vehicleData, year: option ? option.value : '' })}
                                        options={years.map(year => ({ value: year, label: year }))}
                                        placeholder="Select Year"
                                    />
                                    {errors.year && <p className="text-xs text-red-600">{errors.year}</p>}
                                </div>

                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Make*</label>
                                    <Select
                                        className="w-full"
                                        value={vehicleData.make ? { value: vehicleData.make, label: vehicleData.make } : null}
                                        onChange={option => setVehicleData({ ...vehicleData, make: option.value })}
                                        options={filteredMakes}
                                        isDisabled={!vehicleData.year}
                                        placeholder="Select Make"
                                    />
                                    {errors.make && <p className="text-xs text-red-600">{errors.make}</p>}
                                </div>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Model*</label>
                                    <Select
                                        className="w-full"
                                        value={vehicleData.model ? { value: vehicleData.model, label: vehicleData.model } : null}
                                        onChange={option => setVehicleData({ ...vehicleData, model: option.value })}
                                        options={filteredModels}
                                        isDisabled={!vehicleData.make}
                                        placeholder="Select Model"
                                    />
                                    {errors.model && <p className="text-xs text-red-600">{errors.model}</p>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-200 text-sm p-1">Part*</label>
                                    <Select
                                        className="w-full"
                                        value={vehicleData.carPart ? { value: vehicleData.carPart, label: vehicleData.carPart } : null}
                                        onChange={option => setVehicleData({ ...vehicleData, carPart: option.value })}
                                        options={filteredCarParts}
                                        isDisabled={!vehicleData.model}
                                        placeholder="Select Part"
                                    />
                                    {errors.carPart && <p className="text-xs text-red-600">{errors.carPart}</p>}
                                </div>
                            </div>
                        </div>

                    )}

                    {step === 2 && (
                        <div>
                            {noOfParts ? <div className='flex justify-between items-center p-1'><p className='p-1 text-red-600 text-lg font-semibold mb-1'>Parts in stock</p><p className='w-1/4 p-1 bg-red-600 text-white font-bold rounded-md text-center'>{noOfParts}</p></div> : <div></div>}
                            <div className='space-y-2'>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Variant*</label>
                                    <Select
                                        className="w-full"
                                        value={vehicleData.variant ? { value: vehicleData.variant, label: vehicleData.variant } : null}
                                        onChange={option => setVehicleData({ ...vehicleData, variant: option.value })}
                                        options={filteredVariants}
                                        isDisabled={!vehicleData.carPart}
                                        placeholder="Select Variant"
                                    />
                                    {errors.variant && <p className="text-xs text-red-600">{errors.variant}</p>}
                                </div>

                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Specification*</label>
                                    <Select
                                        className="w-full"
                                        value={vehicleData.transmission ? { value: vehicleData.transmission, label: vehicleData.transmission } : null}
                                        onChange={option => setVehicleData({ ...vehicleData, transmission: option.value })}
                                        options={filteredTransmission}
                                        isDisabled={!vehicleData.variant}
                                        placeholder="Select Specification"
                                    />
                                    {errors.transmission && <p className="text-xs text-red-600">{errors.transmission}</p>}
                                </div>

                                <div >
                                    <label className="block text-gray-100 text-xs flex justify-between"><p>Vehicle Information Number (VIN)</p>  <p>*Optional</p></label>
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
                                    <label className="block text-gray-200 text-sm p-1">Message</label>
                                    <textarea
                                        className="w-full p-2 border rounded"
                                        placeholder='Enter a message'
                                        value={vehicleData.message}
                                        onChange={e => setVehicleData({ ...vehicleData, message: e.target.value })}
                                    />
                                    {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                                </div>
                            </div>
                        </div>

                    )}


                    {step === 3 && (
                        <div>
                            {noOfParts ? <div className='flex justify-center items-start p-1 text-red-500 text-lg font-semibold mb-1'><div>{vehicleData.year} {vehicleData.make} {vehicleData.model} {vehicleData.carPart} {vehicleData.variant} {vehicleData.transmission}</div> <div className='h-min flex justify-center items-center text-md text-nowrap bg-red-600 text-white pl-2 pr-3 rounded ml-2'><TiTick className='mr-2' />In Stock</div></div> : <div></div>}
                            <div className='space-y-2'>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Full Name*</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder='Enter Name'
                                        value={userData.name}
                                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                                    />
                                    {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                                </div>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Email* </label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border rounded"
                                        placeholder='Enter Email'
                                        value={userData.email}
                                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                                    />
                                    {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                                </div>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Contact Number*</label>
                                    <input
                                        type="tel"
                                        className="w-full p-2 border rounded"
                                        placeholder='Enter Contact Number'
                                        value={userData.phone}
                                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                                    />
                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                                </div>
                                <div >
                                    <label className="block text-gray-200 text-sm p-1">Zip Code*</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder='Enter your ZIP Code'
                                        value={userData.zipcode}
                                        onChange={e => setUserData({ ...userData, zipcode: e.target.value })}
                                    />
                                    {errors.zipcode && <p className="text-xs text-red-600">{errors.zipcode}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between py-4 space-x-2">
                        {step > 1 && (
                            <button onClick={handlePrevious} className="w-full bg-white hover:bg-gray-200 text-red-600 font-bold py-2 px-4 rounded-lg">
                                Back
                            </button>
                        )}
                        {step < 3 && (
                            <button onClick={handleNext} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                Next
                            </button>
                        )}
                        {step === 3 && (
                            <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
