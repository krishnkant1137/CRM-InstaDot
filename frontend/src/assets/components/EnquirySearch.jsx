import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnquirySearch = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/students/search?phone=${phoneNumber}`);
      setStudentData(res.data);
      setResponse(res.data.response || '');
    } catch (error) {
      console.error('Error fetching student data:', error);
      alert('Error fetching student data');
    } finally {
      setLoading(false);
    }
  };

  // Update the enquiry response
  const handleUpdateResponse = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await axios.put('http://localhost:5000/api/students/enquiry/update-response', {
        phoneNumber,
        response,
      });
      console.log('Response updated successfully:', res.data);
      alert('Response updated successfully!');
    } catch (error) {
      console.error('Error updating enquiry:', error);
      alert('Error updating the response.');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Student Enquiry Section</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => navigate('/sales')}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back to Sales Section
        </button>
      </div>

      {/* Search Section */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex justify-center">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            className="border border-gray-300 p-3 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="ml-2 bg-blue-600 text-white p-3 rounded-lg transition duration-200 hover:bg-blue-700"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Display Student Data */}
      {studentData && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Student Details:</h2>
          <p><strong>Full Name:</strong> {studentData.fullName}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Address:</strong> {studentData.address}</p>
          <p><strong>Course:</strong> {studentData.courseName}</p>
          <p><strong>College Name:</strong> {studentData.collegeName}</p>
          <p><strong>Response:</strong> {studentData.response}</p>

          {/* Update Response Section */}
          <form onSubmit={handleUpdateResponse} className="mt-4">
            <textarea
              placeholder="Enter new response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              {updateLoading ? 'Updating...' : 'Update Response'}
            </button>
          </form>
        </div>
      )}

      {!studentData && !loading && <p className="text-center mt-4 text-gray-500">No student found. Please search again.</p>}
    </div>
  );
};

export default EnquirySearch;
