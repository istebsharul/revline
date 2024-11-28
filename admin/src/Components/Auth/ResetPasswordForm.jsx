import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from '../../Actions/adminActions';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import {useParams} from 'react-router-dom';

function ResetPassword({ match }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();
    const {token} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        dispatch(resetPassword(password,token))
            .then(() => {
                setPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                console.error("Reset Password error:", error);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        <div className="w-4/5 h-full md:w-3/6 flex flex-wrap justify-center items-center">
            <div className="md:py-8 md:px-12 p-4 rounded-xl bg-white/90 flex flex-col justify-center items-center">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form
                    onSubmit={handleSubmit}
                    className="w-full space-y-1 md:space-y-3 items-center md:p-0"
                >
                    <div className="text-center md:py-2 py-1">
                        <h1 className="text-3xl md:text-4xl font-bold font-inter">
                            Reset Your Password
                        </h1>
                        <h3 className="p-1 text-gray-600 text-xs">
                            Please enter your new password.
                        </h3>
                    </div>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="relative w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full shadow-xl rounded-2xl px-5 py-2 bg-red-700 text-white text-lg md:text-xl"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="w-full flex items-center justify-center md:py-2 py-1">
                    <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
                </div>
                <div className="flex items-center justify-center">
                    <a
                        href="/login"
                        className="text-black font-medium text-sm md:text-sm"
                    >
                        Already have an account? <span className="text-[#f6251a]">Login</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
