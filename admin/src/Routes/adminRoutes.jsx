import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOverviewPage from '../Pages/Admin/AdminOverviewPage';
import CommunicationCenterPage from '../Pages/Admin/CommunicationCenterPage';
import MarketingAdsPage from '../Pages/Admin/MarketingAdsPage';
import PaymentsInvoicing from '../Components/Admin/PaymentsInvoicing';
import LoginPage from '../Pages/AuthenticationPage/LoginPage';
import SignupPage from '../Pages/AuthenticationPage/SignupPage';
import ForgotPasswordPage from '../Pages/AuthenticationPage/ForgotPasswordPage';
import ResetPasswordPage from '../Pages/AuthenticationPage/ResetPasswordPage';
import ProtectedRoute from '../Utils/ProtectedRoute';
import CustomerManagement from '../Pages/Admin/CustomerManagement';
import ProductManagement from '../Pages/Admin/ProductManagement';
import SalesManagement from '../Pages/Admin/SalesManagement';
import OrderOverview from '../Components/OrderManagement/Overview/OrderOverview';

const AdminRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="reset-password/:token" element={<ResetPasswordPage />} />

    {/* Admin Routes */}
    <Route path="/" element={<ProtectedRoute />}>
      <Route index element={<AdminOverviewPage />} />
      <Route path='sales-management'>
        <Route index element={<SalesManagement />} />
        <Route path='overview/:orderId' element={<OrderOverview />} />
      </Route>
      <Route path="customer-management" element={<CustomerManagement />} />
      <Route path="communication-center" element={<CommunicationCenterPage />} />
      <Route path="marketing-ads" element={<MarketingAdsPage />} />
      <Route path="payments-invoicing" element={<PaymentsInvoicing />} />
      <Route path="product-management" element={<ProductManagement />} />
    </Route>

    {/* Catch-all Route for non-admin paths */}
    <Route path="*" element={<LoginPage />} />
  </Routes>
);

export default AdminRoutes;