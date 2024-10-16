import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllEnrolledStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the enrolled students from the backend
    axios.get('http://localhost:5000/api/enrolled-students') // Replace with your actual endpoint
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching enrolled students:', error);
      });
  }, []);

  const handleViewProfile = (studentId) => {
    // Navigate to the student profile page
    navigate(`/students/${studentId}`); // Replace with the actual route for student profiles
  };

  return (<>
    <button
    onClick={() => navigate('/sales')}
    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
  >
    Back to Sales
  </button>
    <div className="mt-8">
      <h1 className="text-center text-4xl font-bold text-blue-800 mb-6">All Enrolled Students</h1>
      <div className="flex flex-col items-center space-y-4">
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold">{student.fullName}</h2>
              <p>Admission Date: {new Date(student.admissionDate).toLocaleDateString()}</p> {/* Format the date */}
              <p>Roll Number: {student.rollNumber}</p>
              <p>Email: {student.email}</p>
              <p>Phone: {student.mobileNumber}</p>
              <p>Course: {student.courseName}</p> {/* Add course information */}
              <button 
                onClick={() => handleViewProfile(student._id)} 
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No enrolled students found.</p>
        )}
      </div>
    </div>
 </> );
};

export default AllEnrolledStudents;
