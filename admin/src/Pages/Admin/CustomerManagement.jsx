// src/pages/CustomerManagement.js

import React, { useState, useEffect } from 'react';
import CustomerList from '../../Components/CustomerManagement/CustomerList';
import AddCustomerForm from '../../Components/CustomerManagement/AddCustomerForm';
import { Outlet} from 'react-router-dom';

const CustomerManagement = () => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default CustomerManagement;
