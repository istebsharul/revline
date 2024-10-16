// src/App.jsx
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import AdminRoutes from './Routes/adminRoutes.jsx';
import { loadAdmin } from './Actions/adminActions.js';

const App = () => {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.auth.admin); // Adjust according to your state shape

  useEffect(() => {
    console.log(adminData);
    const fetchAdminData = () => {
      // Check if admin data already exists in the Redux state
      if (!adminData) {
        dispatch(loadAdmin());
      }
    };

    fetchAdminData();
  }, [adminData, dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AdminRoutes />
    </>
  );
};

export default App;
