import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/Landing/HomePage';
import ContactUsPage from '../Pages/Landing/ContactUsPage';
import AboutUsPage from '../Pages/Landing/AboutUsPage';
import WarrantyReturnsPage from '../Pages/Landing/WarrantyReturnsPage';
import FAQPage from '../Pages/Landing/FAQPage';
import LoginPage from '../Pages/User/LoginPage';
import SignupPage from '../Pages/User/SignupPage';
import ResetPasswordPage from '../Pages/User/ResetPasswordPage';
import ForgotPasswordPage from '../Pages/User/ForgotPasswordPage';
import OrderPage from '../Pages/User/OrderPage';
import PartsPage from '../Pages/Landing/PartsPage';
import ProtectedRoute from '../Utils/ProtectedRoute';
import PaymentSuccessfulPage from '../Pages/User/PaymentSuccessfulPage';
import PaymentCancel from '../Pages/User/PaymentCancel';
import OrderDetailsPage from '../Pages/User/OrderDetailsPage';
import ShippingHandlingPage from '../Pages/Landing/ShippingHandlingPage';
import OptInPage from '../Pages/Landing/Opt-InPage';
import BlogsPage from '../Pages/Landing/BlogsPage';
import BlogPage from '../Pages/Landing/BlogPage';

function UserRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="parts" element={<PartsPage />} />
      <Route path="contact" element={<ContactUsPage />} />
      <Route path="about" element={<AboutUsPage />} />
      <Route path="warranty" element={<WarrantyReturnsPage />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="shipping" element={<ShippingHandlingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      <Route path='opt-in' element={<OptInPage />} />
      <Route path='blogs/:make' element={<BlogsPage/>} />
      <Route path='blogs' element={<BlogPage/>} />
      
      {/* Protected Routes */}
      <Route
        path="orders"
      >
        {/* Nested route for order details */}
        <Route index element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="details/:id" element={<OrderDetailsPage />} />
      </Route>
      
      <Route path="payment/success" element={<PaymentSuccessfulPage />} />
      <Route path="payment/cancel" element={<PaymentCancel />} />
  
      {/* Catch-all Route (404) */}
      <Route path="*" element={<HomePage />} /> {/* Or HomePage if desired */}
    </Routes>
  );
}

export default UserRoutes;
