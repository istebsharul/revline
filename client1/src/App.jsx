import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// User Pages
import HomePage from './Pages/Landing/HomePage';
import ContactUsPage from './Pages/Landing/ContactUsPage';
import AboutUsPage from './Pages/Landing/AboutUsPage';
import WarrantyReturnsPage from './Pages/Landing/WarrantyReturnsPage';
import FAQPage from './Pages/Landing/FAQPage';
import StaticProductPage from './Pages/Landing/StaticProductPage';
import LoginPage from './Pages/User/LoginPage';
import SignupPage from './Pages/User/SignupPage';
import ResetPasswordPage from './Pages/User/ResetPasswordPage';
import CreateAccountPage from './Pages/User/CreateAccountPage';
import OrderPage from './Pages/User/OrderPage';

// Admin Pages
import AdminOverviewPage from './Pages/Admin/AdminOverviewPage';
import SalesManagementPage from './Pages/Admin/SalesManagementPage';
import CommunicationCenterPage from './Pages/Admin/CommunicationCenterPage';
import MarketingAdsPage from './Pages/Admin/MarketingAdsPage';

import ProtectedRoute from './Utils/ProtectedRoute';
import AdminRoute from './Utils/AdminRoute';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="contact-us" element={<ContactUsPage />} />
      <Route path="about-us" element={<AboutUsPage />} />
      <Route path="warranty-returns" element={<WarrantyReturnsPage />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="static-product" element={<StaticProductPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="create-account" element={<CreateAccountPage />} />
      <Route
        path="order"
        element={<ProtectedRoute><OrderPage /></ProtectedRoute>}
      />

      {/* Admin Routes */}
      <Route
        path="admin/overview"
        element={<AdminRoute><AdminOverviewPage /></AdminRoute>}
      />
      <Route
        path="admin/sales-management"
        element={<AdminRoute><SalesManagementPage /></AdminRoute>}
      />
      <Route
        path="admin/communication-center"
        element={<AdminRoute><CommunicationCenterPage /></AdminRoute>}
      />
      <Route
        path="admin/marketing-ads"
        element={<AdminRoute><MarketingAdsPage /></AdminRoute>}
      />

      {/* Catch-all Route */}
      <Route path="*" element={<HomePage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
