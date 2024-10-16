// src/Faculties.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { facultiesData } from "./data"; // Assuming you have a data file for faculties

const Faculties = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authenticatedFacility, setAuthenticatedFacility] = useState(null);

  // Default credentials for faculties
  const defaultCredentials = [
    { id: "faculty1", password: "password1" },
    { id: "faculty2", password: "password2" },
    { id: "faculty3", password: "password3" },
  ];

  const navigate = useNavigate();

  const handleFacilityClick = (facility) => {
    setAuthenticatedFacility(facility);
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = () => {
    const isAuthenticated = defaultCredentials.some(
      (cred) =>
        cred.id === credentials.id && cred.password === credentials.password
    );

    if (isAuthenticated) {
      setIsAuthModalOpen(false);
      navigate(`/AkshaySirDashboard`); // Redirect to Akshay Sir's Dashboard
    } else {
      alert("Invalid ID or Password");
    }
  };

  const renderTeachers = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {facultiesData.map((facility, index) => (
          <div
            key={index}
            className="transform transition-transform duration-500 hover:scale-105 rounded-lg p-6 cursor-pointer bg-gradient-to-br from-blue-400 to-blue-600 text-white"
            onClick={() => handleFacilityClick(facility)}
          >
            <h3 className="text-2xl font-bold mb-3 text-center">
              {facility.teacher}
            </h3>
            <p className="text-center mb-5">{facility.name}</p>
            <div className="flex justify-center">
              <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:-translate-y-1 hover:bg-blue-50">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 rounded-lg bg-gradient-to-tl from-gray-50 to-gray-200 relative">
      <h1 className="text-5xl font-bold mb-10 text-center text-blue-900 transition-opacity duration-500 opacity-90 hover:opacity-100">
        Faculties
      </h1>

      {renderTeachers()}

      {isAuthModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Faculty ID"
              value={credentials.id}
              onChange={(e) =>
                setCredentials({ ...credentials, id: e.target.value })
              }
              className="border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAuthSubmit}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="ml-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;
