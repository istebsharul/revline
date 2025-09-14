// src/Pages/Landing/PartRedirect.tsx
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import PartsBlogsPage from "../Pages/Landing/PartsBlogsPage";

const PartRedirect = () => {
  const { part } = useParams();

  if (part === "abs") {
    // Redirect specifically for ABS
    return <Navigate to={`/auto-parts/${part}`} replace />;
  }

  // Default: render normal PartsBlogsPage
  return <PartsBlogsPage />;
};

export default PartRedirect;
