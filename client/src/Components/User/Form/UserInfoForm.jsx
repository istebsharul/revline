import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Example usage:
// const state = getStateFromZipCode("90210"); // Returns "California"

const UserInfoForm = ({ userData, setUserData, errors }) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            const getLocation = async () => {
                if (userData.zipcode.length === 5) {
                    try {
                        const response = await axios.get(`https://api.zippopotam.us/us/${userData.zipcode}`);
                        if (response.data) {
                            setLocation(response.data.places[0]['place name'] + ', ' + response.data.places[0].state + ', ' + response.data.country);
                        }
                    } catch (error) {
                        console.error(error);
                        setLocation('Invalid ZIP code');
                    }
                } else {
                    setLocation('Enter 5 digit ZIP code only');
                }
            }
            getLocation();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [userData.zipcode]);

    return (
        <div className='space-y-2'>
            <div >
                <label className="block text-gray-800 text-sm p-1">Full Name*</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder='Enter Name'
                    id="name"
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                />
                {errors.name && <p className="text-xs text-[#f6251a]">{errors.name}</p>}
            </div>
            <div >
                <label className="block text-gray-800 text-sm p-1">Email* </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded"
                    placeholder='Enter Email'
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-[#f6251a]">{errors.email}</p>}
            </div>
            <div>
                <label className="block text-gray-800 text-sm p-1">Contact Number*</label>
                <div className="flex items-center gap-1">
                    {/* Country Code Dropdown */}
                    <select
                        id="countryCode"
                        className="w-1/4 p-2 bg-gray-100 text-md border rounded appearance-none"
                        value={userData.countryCode || "+1"} // Default country code
                        onChange={e => setUserData({...userData,countryCode: e.target.value})}
                    >
                        <option value="+1">+1 (USA)</option>
                        <option value="">We are operating in USA only.</option>
                        {/* Add more country codes as needed */}
                    </select>

                    {/* Phone Number Input */}
                    <input
                        type="tel"
                        id="phone"
                        className="w-3/4 p-2 text-md border rounded"
                        placeholder="Enter Contact Number"
                        value={userData.phone}
                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                    />
                </div>
                {errors.phone && <p className="text-xs text-[#f6251a]">{errors.phone}</p>}
            </div>
            <div >
                <label className="block text-gray-800 text-sm p-1">Zip Code*</label>
                <input
                    type="text"
                    id="pincode"
                    className="w-full p-2 border rounded"
                    placeholder='Enter your ZIP Code'
                    value={userData.zipcode}
                    onChange={e => setUserData({ ...userData, zipcode: e.target.value })}
                />
                {errors.zipcode && <p className="text-xs text-[#f6251a]">{errors.zipcode}</p>}
                {location && <p className='text-xs text-red-600 p-1'>{location}</p>}
            </div>

            <div className='p-1 text-xs text-gray-600 space-y-1'>
                <div className='flex justify-start md:items-center items-start space-x-1'>
                    <input
                        type="checkbox"
                        className='md:w-4 md:h-4 accent-blue-700'
                        checked={userData.smsConsent}
                        onChange={e => setUserData({
                            ...userData,
                            smsConsent: e.target.checked,
                        })}
                    />
                    <label>I agree to receive order updates and promotional messages via SMS.</label>
                </div>
                {errors.smsConsent && <p className="text-xs text-[#f6251a]">{errors.smsConsent}</p>}
                <div className='p-1 text-gray-500'>By checking this box, you agree to receive SMS order updates and promotional messages. Msg & data rates apply. Reply STOP to opt out anytime.</div>
            </div>
        </div>
    );
};

export default UserInfoForm;
