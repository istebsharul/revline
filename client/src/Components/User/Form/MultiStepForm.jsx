import React, { useState, useCallback, useEffect } from 'react';
import VehicleInfoForm from './VehicleInfoForm';
import VariantTransmissionForm from './VariantTransmissionForm';
import UserInfoForm from './UserInfoForm';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { debounce } from 'lodash';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);

    const [vehicleData, setVehicleData] = useState({
        year: '',
        make: '',
        model: '',
        part: '',
        variant: '',
        transmission: '',
        vin: '',
        message: ''
    });

    const [transmission, setTransmission] = useState([]);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        zipcode: '',
        countryCode: '+1',
        smsConsent: true
    });

    const [errors, setErrors] = useState({});

    const validateStep1 = () => {
        const errors = {};
        if (!vehicleData.year) errors.year = 'Year is required';
        if (!vehicleData.make) errors.make = 'Make is required';
        if (!vehicleData.model) errors.model = 'Model is required';
        if (!vehicleData.part) errors.part = 'Part is required';
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

        // Check if the name is provided
        if (!userData.name) errors.name = 'Full Name is required';

        // Check if the email is provided and is in a valid format
        if (!userData.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            errors.email = 'Invalid email format';
        }

        // Check if the phone number is provided and is a valid 10-digit number
        if (!userData.phone) {
            errors.phone = 'Contact Number is required';
        } else if (!/^\d{10}$/.test(userData.phone)) {
            errors.phone = 'Contact Number must be exactly 10 digits';
        }

        // Check if the ZIP code is provided and is a valid 5-digit number
        if (!userData.zipcode) {
            errors.zipcode = 'Zip Code is required';
        } else if (!/^\d{5}$/.test(userData.zipcode)) {
            errors.zipcode = 'Zip Code must be exactly 5 digits';
        }

        return errors;
    };


    const handleNext = () => {
        // Implement validation or steps switching logic here
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
        // if (step < 3) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {

        // Trigger Google Ads conversion tracking
        try {
            if (typeof window.gtag === "function") {
                window.gtag("event", "conversion", {
                    send_to: "AW-11561633611/9tQfCMjphI0aEMuOgokr",
                });
                logger.info("Google Ads conversion event triggered");
            } else {
                logger.warn("Google Tag is not loaded yet.");
            }
        } catch (error) {
            logger.error("Error triggering Google Ads conversion:", error);
        }
        

        // Perform Step 3 validation
        const validationErrors = validateStep3();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set the errors to the state for display
            toast.error('Please fill all the required field.'); // Display a toast error message
            return; // Exit the function early if there are validation errors
        }
        setErrors({});

        const formData = {
            vehicleData,
            userData,
        };
        console.log(formData);

        // Destructure userData and vehicleData for cleaner code
        const { name, email, phone, zipcode } = userData;
        // console.log([vehicleData]);
        console.log(email);

        // Define the promise
        const postRequest = axios.post('https://server.revlineautoparts.com/api/v1/customer/create', {
            userData,
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

    const debouncedHandleSubmit = useCallback(debounce(handleSubmit, 1000), [userData, vehicleData]);

    return (
        <div className="w-full max-w-md mx-auto md:mt-10 rounded-lg ">
            <div className='flex justify-center items-center p-2 m-2'>
                <div className="w-4/5 flex items-center justify-center">
                    {[1, 2, 3].map((item, index) => (
                        <React.Fragment key={item}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step === item ? 'bg-[#f6251a] text-white' : 'bg-gray-200 text-gray-500 text-sm p-1'}`}
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
            <div className='bg-white p-4 rounded-lg shadow-lg border-black'>
                <div className=''>
                    <div>
                        <h2 className="text-2xl font-semibold text-left p-2 mb-1 text-black">
                            {step === 1 ? "Let's find your part!" :
                                step === 2 ? 'You are just 1 step away!' :
                                    "You're just a click away!"}
                        </h2>
                        <p>

                        </p>
                    </div>
                    {step === 1 && (
                        <VehicleInfoForm
                            setTransmission={setTransmission}
                            vehicleData={vehicleData}
                            setVehicleData={setVehicleData}
                            errors={errors}
                        // Add any other necessary props here
                        />
                    )}
                    {step === 2 && (
                        <VariantTransmissionForm
                            trims={transmission}
                            vehicleData={vehicleData}
                            setVehicleData={setVehicleData}
                            errors={errors}
                        // Add any other necessary props here
                        />
                    )}
                    {step === 3 && (
                        <UserInfoForm
                            userData={userData}
                            setUserData={setUserData}
                            errors={errors}
                        />
                    )}
                </div>

                <div className="flex justify-between py-4 space-x-2">
                    {step > 1 && (
                        <button onClick={handlePrevious} className="w-full bg-white hover:bg-gray-200 text-[#f6251a] font-bold py-2 px-4 rounded-lg border">
                            Back
                        </button>
                    )}
                    {step < 3 && (
                        <button onClick={handleNext} className="w-full bg-[#f6251a] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                            Next
                        </button>
                    )}
                    {step === 3 && (
                        <button onClick={debouncedHandleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                            Submit
                        </button>
                    )}
                </div>
            </div>
            {/* <div className='bg-gradient-to-r from-white to-red-500 rounded-lg 2xl:p-[0.05rem] md:p-[0.02rem]'>
                
            </div> */}
        </div>
    );
};

export default MultiStepForm;
