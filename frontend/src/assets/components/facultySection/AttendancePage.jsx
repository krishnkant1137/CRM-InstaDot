import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        const response = await fetch("/api/attendance"); // Updated to match your route setup
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
  const handleBatchSelect = (batchId) => {
    setSelectedBatch(batchId);
    const selectedBatchData = batches.find((batch) => batch._id === batchId);
    setStudents(selectedBatchData ? selectedBatchData.students : []);
  };

  // Handle attendance checkbox change
  const handleAttendanceChange = (studentId) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: !prev[studentId], // Toggle attendance
    }));
  };

 // Submit attendance data
const handleSubmitAttendance = async () => {
  // Derive present and absent students with roll numbers
  const presentStudents = students
    .filter((student) => attendanceData[student._id])
    .map((student) => student.rollNumber);

  const absentStudents = students
    .filter((student) => !attendanceData[student._id])
    .map((student) => student.rollNumber);

  const attendanceToSubmit = {
    batchId: selectedBatch,
    date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"), // Format date to dd-mm-yyyy
    presentStudents,
    absentStudents,
  };

  try {
    setIsSubmitting(true);
    const response = await fetch("/api/attendance/submit-attendance", {
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
      setStudents([]);
      setSelectedBatch(null);
    } else {
      const errorData = await response.json();
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
    <div className="bg-gray-100 min-h-screen p-6">
      <button
        onClick={() => navigate("/facultiesDashboard")}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">Attendance</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex flex-col items-center">
          <select
            onChange={(e) => handleBatchSelect(e.target.value)}
            value={selectedBatch || ""}
            className="border border-gray-300 p-2 rounded mb-4 w-64 bg-white text-black"
          >
            <option value="" disabled className="text-gray-100">
              Select Batch
            </option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id} className="text-black-800 bg-white-800">
                {batch.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {students.length > 0 && selectedBatch && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2 text-center">
            Students in {batches.find((batch) => batch._id === selectedBatch)?.name}
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border border-gray-800 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2 text-center">Mark Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{student.rollNumber}</td>
                    <td className="border px-4 py-2">{student.fullName}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={attendanceData[student._id] || false}
                        onChange={() => handleAttendanceChange(student._id)}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleSubmitAttendance}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
