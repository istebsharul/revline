import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Banner from '../../Components/User/Banner';
import axios from 'axios';

function OptInPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [consent, setConsent] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const smsOtp = useRef(''); // Use useRef to persist the OTP value

    const generateOtp = (length = 6) => {
        return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
    };

    const handleSendOtp = async () => {
        if (!phoneNumber) {
            toast.error('Phone number is required.');
            return;
        }

        smsOtp.current = generateOtp();
        const otpSms = `Your verification code is: ${smsOtp.current}. This code is valid for the next 10 minutes. By entering this code, you consent to receive SMS order updates and promotional messages from us. Please do not share this code with anyone. If you did not request this code, please ignore this message.`;

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/twilio/sms-send`, {
                to: phoneNumber,
                message: otpSms,
            });
            toast.success('Verification code sent!');
            setIsCodeSent(true);
        } catch (error) {
            console.error('Error sending code:', error);
            toast.error('Failed to send verification code. Please try again.');
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            toast.error('Verification code is required.');
            return;
        }

        if (verificationCode === smsOtp.current) {
            toast.success('Phone number verified!');
            setIsVerified(true);
        } else {
            toast.error('Invalid verification code.');
        }
    };

    const handleSubmit = async () => {
        if (!isVerified) {
            toast.error('Please verify your phone number before opting in.');
            return;
        }

        if (!consent) {
            toast.error('You must agree to receive SMS updates.');
            return;
        }

        toast.success('You have successfully opted in for SMS updates!');
        navigate('/')
        // Additional logic for storing consent (e.g., backend API call)
    };

    return (
        <div className="w-full flex flex-col justify-start items-center md:pt-10 pt-16">
            <div className="relative">
                <Banner />
                <p className="absolute text-2xl md:text-4xl inset-0 flex justify-center items-center text-white font-inter">
                    Consent for SMS
                </p>
            </div>
            <div className="max-w-lg mx-auto p-6 m-6 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Opt-In for SMS Updates</h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter your phone number, verify it, and opt-in to receive order updates and promotional messages via SMS.
                </p>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <div className="flex items-center justify-between">
                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder="+1 123-456-7890"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-1 focus:outline-red-500"
                        />
                        <button
                            onClick={handleSendOtp}
                            className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 text-nowrap"
                        >
                            Send OTP
                        </button>
                    </div>
                </div>

                {isCodeSent && (
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                id="verificationCode"
                                placeholder="Enter the code sent to your phone"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-1 focus:outline-red-500"
                            />
                        </div>
                        {!isVerified && (
                            <button
                                onClick={handleVerifyCode}
                                className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 text-nowrap"
                            >
                                Verify Code
                            </button>
                        )}
                    </div>
                )}

                <div className='text-xs pl-6 mb-2'>By providing my phone number, I agree to receive SMS updates about my orders and delivery status from Revline Auto Parts. I understand that I can opt out at any time by replying STOP to any message. Standard message and data rates may apply.</div>
                {/* Always show the consent checkbox */}
                <div className="mb-4 space-y-1">
                    <label className="flex items-start text-xs">
                        <input
                            type="checkbox"
                            className="mr-2 m-1"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                        />
                        By checking the box, I agree to receive SMS promotional offers from Revline Auto Parts. Opting in is optional and will not affect my ability to use any services or place orders. / understand that / can opt out at any time by replying STOP to any message. Standard message and data rates may apply.                    </label>
                </div>

                {isVerified && (
                    <button
                        onClick={handleSubmit}
                        disabled={!consent}
                        className={`w-full py-2 rounded-md shadow ${consent ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                    >
                        Opt-In
                    </button>
                )}
            </div>
        </div>
    );
}

export default OptInPage;
