import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/students/search?phone=${phoneNumber}`);
      console.log(res.data); // Log the response to debug
      setStudentData(res.data); // Store the student data
      setResponse(res.data.response || ''); // Set initial response from data
    } catch (error) {
      console.error('Error fetching student data:', error);
      alert('Error fetching student data');
    } finally {
      setLoading(false);
    }
  };

  // Handle response update
  const handleUpdateResponse = async (e) => {
    e.preventDefault();
    if (studentData) {
      try {
        // Use the student's enquiry _id to update the response
        await axios.put(`http://localhost:5000/api/enquiries/enquiry/${studentData._id}`, { response });
        alert('Response updated successfully!');
      } catch (error) {
        console.error('Error updating response:', error);
        alert('Error updating response');
      }
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-3xl font-bold text-gray-800">Student Section</h1>

      {/* Back to Sales Section Link */}
      <div className="flex justify-center mt-4">
        <button onClick={() => navigate('/sales')} className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200">
          Back to Sales Section
        </button>
      </div>

      {/* Search Section */}
      <form onSubmit={handleSearch} className="mt-6">
        <div className="flex justify-center">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            className="border border-gray-300 p-2 rounded-lg"
            required
          />
          <button type="submit" className="ml-2 bg-blue-600 text-white p-2 rounded-lg">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Display Student Data */}
      {studentData && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold">Student Details:</h2>
          <p><strong>Full Name:</strong> {studentData.fullName}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Address:</strong> {studentData.address}</p>
          <p><strong>Course:</strong> {studentData.courseName}</p>
          <p><strong>Batch:</strong> {studentData.batch}</p>
          
          {/* Update Response Section */}
          <form onSubmit={handleUpdateResponse} className="mt-4">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Update Response"
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <button type="submit" className="mt-2 bg-green-600 text-white p-2 rounded-lg">
              Update Response
            </button>
          </form>
        </div>
      )}

      {!studentData && !loading && <p className="text-center mt-4">No student found. Please search again.</p>}
    </div>
  );
};

export default Student;
