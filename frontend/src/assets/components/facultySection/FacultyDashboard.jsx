import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResourceSharing from './ResourceSharing'; // Import the ResourceSharing component

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access the location object
  const { selectedBatch } = location.state || {}; // Get selectedBatch from state

  const handleBatchesClick = () => {
    navigate("/facultiesDashboard/batch");
  };

  const handleAttendanceClick = () => {
    navigate("/facultiesDashboard/attendance"); 
  };

  const handlePerformanceClick = () => {
    navigate(`/facultiesDashboard/performance`); 
  };

  const handleProfileClick = () => {
    alert("Profile section is under development.");
  };

  const handleResourceSharingClick = () => {
    navigate("/facultiesDashboard/resourceSharing"); 
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/faculties/login');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 rounded-lg bg-gradient-to-tl from-gray-50 to-gray-200">
      <h1 className="text-5xl font-bold mb-10 text-center text-blue-900">
        Welcome to Faculty Dashboard
      </h1>

      {/* Buttons for batch, attendance, performance, profile, and resource sharing */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handleBatchesClick}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
        >
          Batches
        </button>
        <button
          onClick={handleAttendanceClick}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-green-700"
        >
          Attendance
        </button>
        <button
          onClick={handlePerformanceClick}
          className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-yellow-700"
        >
          Performance
        </button>
        <button
          onClick={handleProfileClick}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-purple-700"
        >
          Profile
        </button>
        <button
          onClick={handleResourceSharingClick}
          className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-teal-700"
        >
          Resource Sharing
        </button>
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

export default FacultyDashboard;
