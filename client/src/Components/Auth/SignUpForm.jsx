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
    const [smsConsent, setSmsConsent] = useState(false);
    const [errors, setErrors] = useState({});
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
        const newErrors = {}; // Create a fresh errors object
    
        if (!name) {
            toast.error("Name is required!");
            newErrors.name = "Name is required!";
        }
        if (!email) {
            toast.error("Email is required!");
            newErrors.email = "Email is required!";
        }
        if (!password) {
            toast.error("Password can't be empty!");
            newErrors.password = "Password can't be empty!";
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            newErrors.confirmPassword = "Passwords do not match!";
        }
        if (!smsConsent) {
            toast.error("Please agree to receive SMS updates.");
            newErrors.smsConsent = "Please agree to receive SMS updates.";
        }
    
        // Update errors state
        setErrors(newErrors);
    
        // If any errors exist, stop submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        try {
            const result = await dispatch(signup(name, email, password, smsConsent));
            if (result && result.success) {
                navigate('/');
            }
        } catch (error) {
            console.error("SignUp Error: ", error);
        }
    
        // Clear form fields and errors if successful
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSmsConsent(false);
        setErrors({});
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        <div className="w-4/5 h-full md:w-3/6 max-w-xl flex flex-wrap justify-center items-center pt-20">
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
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
                    />
                    {errors.name && <p className=" text-xs text-red-600 px-1">{errors.name}</p>}
                    <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
                    />
                    {errors.email && <p className=" text-xs text-red-600 px-1">{errors.email}</p>}
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
                    {errors.password && <p className=" text-xs text-red-600 px-1">{errors.password}</p>}
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
                    {errors.confirmPassword && <p className=" text-xs text-red-600 px-1">{errors.confirmPassword}</p>}
                    <div className='p-1 text-xs text-gray-600 space-y-1'>
                        <div className='flex justify-start md:items-center items-start space-x-1'>
                            <input
                                type="checkbox"
                                className='md:w-4 md:h-4 accent-blue-700'
                                checked={smsConsent}
                                onChange={(e=>setSmsConsent(e.target.checked))}
                            />
                            <label>I agree to receive order updates and promotional messages via SMS.</label>
                        </div>
                        {errors.smsConsent && <p className=" text-xs text-red-600 px-1">{errors.smsConsent}</p>}
                        <div className='p-1 text-gray-500'>By checking this box, you agree to receive SMS order updates and promotional messages. Msg & data rates apply. Reply STOP to opt out anytime.</div>
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
                            Already have an account? <span className="text-[#f6251a]">Login</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
