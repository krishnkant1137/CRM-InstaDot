import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classification, setClassification] = useState({}); // To hold classification for each student
  const [isUpdating, setIsUpdating] = useState(false); // For submit button state

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get('/api/performance');
        setPerformanceData(response.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setError('Failed to load performance data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  const handleClassificationChange = (studentId, value) => {
    setClassification((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleUpdateClassification = async () => {
    setIsUpdating(true);
    try {
      await Promise.all(
        Object.keys(classification).map((studentId) => 
          axios.put(`/api/performance/${studentId}`, { classification: classification[studentId] })
        )
      );
      alert('Performance classification updated successfully!');
    } catch (error) {
      console.error('Error updating classifications:', error);
      alert('Failed to update classifications. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Performance Section</h1>

      {performanceData.length > 0 ? (
        <div>
          <h2 className="text-2xl mb-2">Attendance Records</h2>
          <ul className="list-disc pl-5">
            {performanceData.map((student) => (
              <li key={student.studentId} className="mb-4">
                <div>
                  <strong>Name:</strong> {student.fullName} <br />
                  <strong>Total Present:</strong> {student.totalPresent} <br />
                  <strong>Total Absent:</strong> {student.totalAbsent} <br />
                  <strong>Attendance Percentage:</strong> {student.attendancePercentage}% <br />
                  <label className="block mt-2">Performance Classification:</label>
                  <select
                    value={classification[student.studentId] || ""}
                    onChange={(e) => handleClassificationChange(student.studentId, e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-2"
                  >
                    <option value="" disabled>Select Classification</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Weak">Weak</option>
                    <option value="Better">Better</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpdateClassification}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Classifications"}
          </button>
        </div>
      ) : (
        <p>No performance records found.</p>
      )}
    </div>
  );
};

export default PerformancePage;
