import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const AttendancePage = () => {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch batches when component mounts
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/batches");
        if (!response.ok) throw new Error("Failed to fetch batches");
        const data = await response.json();
        setBatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  // Handle batch selection
  const handleBatchSelect = async (batchId) => {
    setSelectedBatch(batchId);
    try {
      setLoading(true);
      const response = await fetch(`/api/batches/${batchId}/students`);
      if (!response.ok) throw new Error("Failed to fetch students for this batch");
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle attendance checkbox change
  const handleAttendanceChange = (rollNumber) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNumber]: !prev[rollNumber], // Toggle attendance
    }));
  };

  // Submit attendance data
  const handleSubmitAttendance = async () => {
    const attendanceToSubmit = {
      batchId: selectedBatch,
      date: new Date().toISOString().split('T')[0], // Format date to YYYY-MM-DD
      presentStudents: Object.keys(attendanceData).filter(
        (rollNumber) => attendanceData[rollNumber]
      ),
    };

    console.log("Submitting attendance data:", attendanceToSubmit);

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceToSubmit),
      });

      if (response.ok) {
        alert("Attendance submitted successfully!");

        // Clear attendance data after successful submission
        setAttendanceData({});
        setStudents([]); // Optionally clear the student list
        setSelectedBatch(null); // Optionally reset the selected batch
      } else {
        const errorData = await response.json(); // Capture the error message from the response
        throw new Error(errorData.message || "Failed to submit attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/AkshaySirDashboard')}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Attendance</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          onChange={(e) => handleBatchSelect(e.target.value)}
          value={selectedBatch || ""}
          className="border border-gray-300 p-2 rounded mb-4"
        >
          <option value="" disabled>Select Batch</option>
          {batches.map((batch) => (
            <option key={batch._id} value={batch._id}>{batch.name}</option>
          ))}
        </select>
      )}

      {students.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Students in {selectedBatch}</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Roll No</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Mark Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.rollNumber}>
                  <td className="border px-4 py-2">{student.rollNumber}</td>
                  <td className="border px-4 py-2">{student.fullName}</td>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={attendanceData[student.rollNumber] || false}
                      onChange={() => handleAttendanceChange(student.rollNumber)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmitAttendance}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
