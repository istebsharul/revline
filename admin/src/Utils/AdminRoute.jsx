import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);

  
  // if (!user || !user.isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  if(!user){
    return <Navigate to="/login" replace/>
  }

  return <Outlet />;
};

export default AdminRoute;
