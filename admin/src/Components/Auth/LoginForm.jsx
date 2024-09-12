import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../Actions/adminActions';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email){
      toast.error("Email is required!");
      return
    }
    if(!password){
      toast.error("Password is required!");
      return 
    }
    dispatch(login(email, password))
      .then((result) => {
        if (result && result.isLoggedIn) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-4/5 h-full md:w-3/6 flex flex-wrap justify-center items-center">
      <div className="md:py-8 md:px-12 p-4 rounded-xl bg-white/90 flex justify-center items-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="md:w-full space-y-1 md:space-y-2 items-center md:p-0"
        >
          <div className="text-center md:py-2 py-1">
            <h1 className="text-3xl md:text-4xl font-bold font-inter">
              Welcome Back!
            </h1>
            <h3 className="p-1 text-gray-600 text-xs">
              We are happy to see you back. Enter your registered email and
              password.
            </h3>
          </div>
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
          <button
            type="submit"
            className="w-full shadow-xl rounded-2xl px-5 py-2 bg-red-700 text-white text-lg md:text-xl"
          >
            Login
          </button>

          <a
            href="/forgot-password"
            className="text-center font-medium hover:underline m-auto flex justify-center"
          >
            Forgot Password?
          </a>
          <div className="flex items-center justify-center">
            <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
          </div>
          <div className="flex items-center justify-center">
            <a
              href="/signup"
              className="border rounded-xl px-8 md:px-10 py-2 focus:outline-none bg-gray-900 hover:bg-white hover:text-black hover:border-1 hover:border-black text-white text-sm md:text-lg shadow-lg"
            >
              Register with us
            </a>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
