import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../Actions/userActions';
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // To get URL parameters

    useEffect(() => {
        const paramName = searchParams.get('name');
        const paramEmail = searchParams.get('email');

        if (paramName) {
            setName(paramName);
        }
        if (paramEmail) {
            setEmail(paramEmail);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Name is required!");
            return;
        }
        if (!email) {
            toast.error("Email is required!");
            return;
        }
        if (!password) {
            toast.error("Password can't be empty!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const result = dispatch(signup(name, email, password));
            if (result && result.success) {
                toast.success("Signup successful!");
            } else {
                toast.error(result.message || "Signup failed.");
            }
        } catch (error) {
            toast.error("An error occurred during signup.");
            console.error("Signup error:", error);
        }
        navigate('/');
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        <div className="w-4/5 h-full md:w-3/6 flex flex-wrap justify-center items-center">
            <div className="md:p-10 p-5 rounded-xl bg-white/90 flex justify-center items-center">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form
                    onSubmit={handleSubmit}
                    className="md:w-11/12 space-y-1 md:space-y-2 items-center md:p-0"
                >
                    <div className="text-center md:py-2 py-1">
                        <h1 className="text-3xl md:text-4xl font-bold font-inter text-nowrap">
                            Create Your Account!
                        </h1>
                        <h3 className="p-1 text-gray-600 text-xs">
                            Register yourself to track your order details.
                        </h3>
                    </div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
                    />
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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
                            placeholder="Confirm Password"
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
                        Signup
                    </button>

                    <div className="flex items-center justify-center">
                        <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
                        <span className="mx-4 text-gray-500">or</span>
                        <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
                    </div>
                    <div className="flex items-center justify-center">
                        <a
                            href="/login"
                            className="text-black font-medium text-sm md:text-sm"
                        >
                            Already have an account? <span className="text-red-600">Login</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
