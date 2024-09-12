import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from '../../Actions/adminActions';
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter email to continue")
      return
    }
    if (!isValidEmail(email)) {
      toast.error("Write your email in correct format")
      return
    }
    try {
      const result = await dispatch(forgotPassword( email ));
      console.log(result);
      if (result && result.success) {
        // toast.success("Please check your email and click on the link to Reset Password!");
      } else {
        toast.error(result.message || "Email sent failed!");
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.error("Forgot Password Error:", error);
    }
  };

  return (
    <div className="w-4/5 h-full md:w-3/6 flex flex-wrap justify-center items-center">
      <div className="md:py-8 md:px-12 p-4 rounded-xl bg-white/90 flex flex-col justify-center items-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form
          onSubmit={handleSubmit}
          className="md:w-full space-y-1 md:space-y-3 items-center md:p-0"
        >
          <div className="text-center md:py-2 py-1">
            <h1 className="text-3xl md:text-4xl font-bold font-inter">
              Forgot Password?
            </h1>
            <h3 className="p-1 text-gray-600 text-xs tracking-tighter">
              Don’t worry! It happens. Please enter the email address linked with your Account.
            </h3>
          </div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border bg-transparent border-gray-400 rounded-xl px-5 py-2 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="w-full shadow-xl rounded-2xl px-5 py-2 bg-red-700 text-white text-lg md:text-xl"
          >
            Send Reset Link
          </button>
        </form>
        <div className="w-full flex items-center justify-center md:py-2 py-1">
          <hr className="w-1/4 md:w-1/6 border-gray-900 border-solid border-t-2" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="w-1/4 md:w-1/6 border-gray-500 border-solid border-t-1" />
        </div>
        <div className="flex items-center justify-center">
          <a
            href="/login"
            className="text-black font-medium text-sm md:text-sm"
          >
            Already have an account? <span className="text-red-600 hover:underline">Login</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
