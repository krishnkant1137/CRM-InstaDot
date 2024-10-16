import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  // Retrieve the token and user role from localStorage
  const salesToken = localStorage.getItem('salesAuthToken');
  const facultiesToken = localStorage.getItem('facultiesAuthToken');
  const userRole = localStorage.getItem('userRole'); // Ensure this is set upon login

  // Check if the user has a token
  if (!salesToken && !facultiesToken) {
    return <Navigate to="/sales/login" />; // Redirect to sales login if no token
  }

  // Check if the user role is allowed to access the route
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page if not allowed
  }

  // If authorized, render the children
  return children;
};

export default PrivateRoute;
