import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceChart from './AttendanceChart'; // Ensure you have this component

const PerformancePage = () => {
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch performance data on component mount
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/performance/attendance-performance');
        if (!response.ok) throw new Error('Failed to fetch performance data');
        const data = await response.json();
        setPerformanceData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformanceData();
  }, []);

  const handleClassificationChange = async (rollNumber, newClassification) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`http://localhost:5000/api/performance/${rollNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classification: newClassification }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // Show success message
      setSuccessMessage('Classification updated successfully!');

      // Update the performance data state
      setPerformanceData((prevData) =>
        prevData.map((student) =>
          student.rollNumber === rollNumber
            ? { ...student, classification: newClassification }
            : student
        )
      );
    } catch (error) {
      console.error('Error updating classification:', error);
      setError('Failed to update classification. Please try again.');
    } finally {
      setIsUpdating(false);
      setTimeout(() => setSuccessMessage(''), 1500); // Clear message after 3 seconds
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <button
        onClick={() => navigate('/facultiesDashboard')}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">Performance</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded shadow-md">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <AttendanceChart /> {/* Include your chart component */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Total Present</th>
                  <th className="border px-4 py-2">Total Absent</th>
                  <th className="border px-4 py-2">Attendance %</th>
                  <th className="border px-4 py-2">Total Class</th> {/* New Column */}
                  <th className="border px-4 py-2">Classification</th>
                  <th className="border px-4 py-2">Update</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.length > 0 ? (
                  performanceData.map((student) => (
                    <tr key={student.rollNumber} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{student.rollNumber}</td>
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.totalPresent}</td>
                      <td className="border px-4 py-2">{student.totalAbsent}</td>
                      <td className="border px-4 py-2">{student.attendancePercentage}%</td>
                      <td className="border px-4 py-2">{student.totalClasses || 0}</td> {/* Display Total Class */}
                      <td className="border px-4 py-2">
                        <select
                          value={student.classification || "Not Classified"} // Default value if undefined
                          onChange={(e) =>
                            handleClassificationChange(student.rollNumber, e.target.value)
                          }
                          className="border border-gray-300 p-2 rounded"
                          disabled={isUpdating}
                        >
                          <option value="Not Classified">Not Classified</option>
                          <option value="Good">Good</option>
                          <option value="Average">Average</option>
                          <option value="Weak">Weak</option>
                          <option value="Better">Better</option>
                        </select>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {isUpdating && (
                          <span className="text-blue-500">Updating...</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="border text-center p-4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformancePage;   
