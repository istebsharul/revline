import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../Components/Admin/DashboardLayout'; // Import your layout here

const ProtectedRoute = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Include the layout here, so it wraps the Outlet
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default ProtectedRoute;
