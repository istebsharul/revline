// src/Routes/UserRoutes.jsx
import React from 'react';
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
import OrderPage from '../Pages/User/OrderPage'
import PartsPage from '../Pages/Landing/PartsPage';
import ProtectedRoute from '../Utils/ProtectedRoute';
import PaymentSuccessfulPage from '../Pages/User/PaymentSuccessfulPage';
import PaymentCancel from '../Pages/User/PaymentCancel';

const UserRoutes = () => (
  <Routes>
    {/* User Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="parts" element={<PartsPage />} />
    <Route path="contact" element={<ContactUsPage />} />
    <Route path="about" element={<AboutUsPage />} />
    <Route path="warranty" element={<WarrantyReturnsPage />} />
    <Route path="faq" element={<FAQPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="reset-password/:token" element={<ResetPasswordPage />} />
    {/* <Route path="orders" element={<OrderPage/>}/> */}
    <Route
      path="orders"
      element={<ProtectedRoute><OrderPage /></ProtectedRoute>}
    />
    <Route path="return" element={<PaymentSuccessfulPage/>} />
    <Route path="cancel" element={<PaymentCancel/>}/>
    {/* Catch-all Route */}
    <Route path="*" element={<HomePage />} />
  </Routes>
);

export default UserRoutes;
