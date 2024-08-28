// src/App.jsx
import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './Components/User/Navbar';
import Footer from './Components/User/Footer';
import { Toaster } from 'react-hot-toast';
import UserRoutes from './Routes/userRoutes';

const App = () => {
  const location = useLocation();

  // Admin and user route checks
  const adminRoutes = ['/admin', '/admin/overview', '/admin/sales-management', '/admin/communication-center', '/admin/marketing-ads', '/admin/payments-invoicing'];
  const shouldShowNavbar = !adminRoutes.includes(location.pathname);
  const shouldShowFooter = !['/login', '/signup', '/reset-password', '/create-account', '/forgot-password', ...adminRoutes].includes(location.pathname);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
        
      {shouldShowNavbar && <Navbar />}
        <UserRoutes />      
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default App;
