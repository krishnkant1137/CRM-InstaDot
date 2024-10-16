import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllDemo = () => {
  const [demos, setDemos] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch demo data when component loads
    const fetchDemoData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/demo'); // Fetching from backend API
        setDemos(response.data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching demo data:', error);
        alert('Error fetching demo data');
      }
    };

    fetchDemoData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for DD/MM/YYYY format
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-3xl font-bold text-gray-800">All Demos</h1>

      {/* Back to Sales Section Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate('/sales')}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back to Sales Section
        </button>
      </div>

      <div className="mt-6">
        {demos.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Number</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Demo By</th>
                <th className="border border-gray-300 p-2">Time</th>
                <th className="border border-gray-300 p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {demos.map((demo) => (
                <tr key={demo._id}>
                  <td className="border border-gray-300 p-2">{demo.name}</td>
                  <td className="border border-gray-300 p-2">{demo.number}</td>
                  <td className="border border-gray-300 p-2">{demo.course}</td>
                  <td className="border border-gray-300 p-2">{demo.demoBy}</td>
                  <td className="border border-gray-300 p-2">{demo.time}</td>
                  <td className="border border-gray-300 p-2">
                    {formatDate(demo.createdAt)} {/* Only formatted date */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4">No demo data found</p>
        )}
      </div>
      
    </div>
  );
};

export default AllDemo;
