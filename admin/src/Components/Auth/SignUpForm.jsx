import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup,verifyOtp } from '../../Actions/adminActions'
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSentOtp = async (e) => {
    e.preventDefault();
    console.log("OTP Request Sent!");

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
      const result = await dispatch(signup(name, email, password)); // Assuming signup is a redux action
      if (result && result.success) {
        toast.success('Admin register request sent! Please ask for OTP to get verified.');
        setIsVerificationSent(true);
        console.log(isVerificationSent);
      }
    } catch (error) {
      console.error("Error sending OTP: ", error);
      toast.error("Error sending OTP.");
    }
  };

  const handleOtpVerification = async (e) => {
      e.preventDefault();
      const result = await dispatch(verifyOtp(email, verificationCode));
      console.log(email, verificationCode);
      if (result.success) {
        toast.success('OTP verified and Signup Successfull');
        console.log('OTP verified and signup successful:', result.message);
        navigate('/');
        setName('');
        setEmail('')
        setPassword('')
        setConfirmPassword('');
        setVerificationCode('');
        // Do something on success, like redirecting to another page or updating UI
      } else {
        console.log('OTP verification failed:', result.message);
        // Handle failure (e.g., show error message)
      }
  };

  return (
    <div className="w-4/5 h-full md:w-3/6 flex flex-wrap justify-center items-center">
      <div className="md:p-10 p-5 rounded-xl bg-white/90 flex justify-center items-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          className="md:w-11/12 space-y-1 md:space-y-2 items-center md:p-0"
        >
          <div className="text-center md:py-2 py-1">
            <h1 className="text-3xl md:text-4xl font-bold font-inter text-nowrap">
              Create Your Account!
            </h1>
            <h3 className="p-1 text-gray-600 text-xs">
              Join us today by creating your account.
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
          {isVerificationSent === true ?
            <div className="flex flex-col justify-between items-center space-y-2">
              <input
                type="text"
                placeholder="Enter OTP here"
                value={verificationCode}
                onChange={(e)=> setVerificationCode(e.target.value)}
                className={`w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500`}
              ></input>
              <button
                onClick={handleOtpVerification}
                className="w-full p-2 bg-red-700 hover:bg-red-600 text-white md:text-xl text-lg rounded-xl">Verify</button>
            </div>
            :
            <button
              onClick={handleSentOtp}
              className={`w-full shadow-xl rounded-2xl px-5 py-2 text-lg md:text-xl bg-red-700 text-white`}>Request OTP</button>
          }

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
