import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sales = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-4xl font-bold text-blue-800 mb-6">Sales Dashboard</h1>
      <div className="flex justify-center space-x-8">
        <Link to="/sales/student-enquiry" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Student Enquiry Section
        </Link>
        <Link to="/sales/search-student" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Search Student
        </Link>
        <Link to="/sales/all-enquiry" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          All Enquiry Section
        </Link>
        <Link to="/sales/demo" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Demo
        </Link>
        <Link to="/sales/all-demo" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          All Demo
        </Link>
        <Link to="/sales/enrolled-students" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Enrolled Students
        </Link>
        <Link to="/sales/all-enrolled-students" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          See All Enrolled Students
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sales;
