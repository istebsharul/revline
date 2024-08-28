// src/Routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../Components/Admin/DashboardLayout';
import AdminOverviewPage from '../Pages/Admin/AdminOverviewPage';
import SalesManagementPage from '../Pages/Admin/SalesManagementPage';
import CommunicationCenterPage from '../Pages/Admin/CommunicationCenterPage';
import MarketingAdsPage from '../Pages/Admin/MarketingAdsPage';
import PaymentsInvoicing from '../Components/Admin/PaymentsInvoicing';
import AdminRoute from '../Utils/AdminRoute';

const AdminRoutes = () => (
  <Routes>
    <Route path='admin' element={<AdminRoute><DashboardLayout /></AdminRoute>}>
      <Route index element={<AdminOverviewPage />} />
      <Route path="sales-management" element={<SalesManagementPage />} />
      <Route path="communication-center" element={<CommunicationCenterPage />} />
      <Route path="marketing-ads" element={<MarketingAdsPage />} />
      <Route path="payments-invoicing" element={<PaymentsInvoicing />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
