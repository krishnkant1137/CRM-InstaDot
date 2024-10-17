import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const salesToken = localStorage.getItem('salesAuthToken');
  const facultiesToken = localStorage.getItem('facultiesAuthToken');
  const userRole = localStorage.getItem('userRole');

  // Check if the user has a token
  if (!salesToken && !facultiesToken) {
    return <Navigate to="/sales/login" />; // Redirect to sales login if no token
  }

  // If a sales token is present, set userRole to 'sales'
  if (salesToken) {
    localStorage.setItem('userRole', 'sales'); 
  }

  // If a faculty token is present, set userRole to 'faculty'
  if (facultiesToken) {
    localStorage.setItem('userRole', 'faculty'); 
  }



  // Check if the user role is allowed to access the route
  if (userRole && !allowedRoles.includes(userRole)) {
    console.log('Unauthorized access attempt detected. User Role:', userRole);
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page if not allowed
  }

  // If authorized, render the children
  return children;
};

export default PrivateRoute;



 
