import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const BatchPage = () => {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [newBatchName, setNewBatchName] = useState("");
  const [isConfirmingRemoveBatch, setIsConfirmingRemoveBatch] = useState(null);
  const [isConfirmingRemoveStudent, setIsConfirmingRemoveStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch batches from the server on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/batches");
        if (!response.ok) {
          throw new Error("Failed to fetch batches");
        }
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

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
  };

  const handleAddBatch = async () => {
    if (newBatchName) {
      try {
        const response = await fetch("/api/batches/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newBatchName }),
        });
        if (!response.ok) {
          throw new Error("Error creating batch");
        }
        const newBatch = await response.json();
        setBatches([...batches, newBatch]);
        setNewBatchName("");
      } catch (error) {
        console.error("Error creating batch:", error);
      }
    }
  };

  const handleAddStudent = async () => {
    if (rollNumber && selectedBatch) {
      try {
        const response = await fetch(`/api/batches/add-student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rollNumber, batchId: selectedBatch._id }),
        });
        if (!response.ok) {
          throw new Error("Error adding student to batch");
        }
        const updatedBatch = await response.json();

        const updatedBatches = batches.map((batch) =>
          batch._id === updatedBatch.batch._id ? updatedBatch.batch : batch
        );
        setBatches(updatedBatches);
        setSelectedBatch(updatedBatch.batch);
        setRollNumber("");
      } catch (error) {
        console.error("Error adding student to batch:", error);
      }
    }
  };

  const handleRemoveStudent = (student) => {
    setIsConfirmingRemoveStudent(student);
  };

  const confirmRemoveStudent = async () => {
    if (selectedBatch && isConfirmingRemoveStudent) {
      try {
        const response = await fetch(`/api/batches/remove-student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rollNumber: isConfirmingRemoveStudent.rollNumber,
            batchId: selectedBatch._id,
          }),
        });
        if (!response.ok) {
          throw new Error("Error removing student from batch");
        }
        const updatedBatch = await response.json();

        const updatedBatches = batches.map((batch) =>
          batch._id === updatedBatch.batch._id ? updatedBatch.batch : batch
        );
        setBatches(updatedBatches);
        setSelectedBatch(updatedBatch.batch);
      } catch (error) {
        console.error("Error removing student from batch:", error);
      } finally {
        setIsConfirmingRemoveStudent(null); // Reset confirmation state
      }
    }
  };

  const handleRemoveBatch = (batchId) => {
    setIsConfirmingRemoveBatch(batchId);
  };

  const confirmRemoveBatch = async (batchId) => {
    try {
      const response = await fetch(`/api/batches/${batchId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error removing batch");
      }
      setBatches(batches.filter((batch) => batch._id !== batchId));
      setSelectedBatch(null);
      setIsConfirmingRemoveBatch(null);
    } catch (error) {
      console.error("Error removing batch:", error);
    }
  };

  const cancelRemoveBatch = () => {
    setIsConfirmingRemoveBatch(null);
  };

  const cancelRemoveStudent = () => {
    setIsConfirmingRemoveStudent(null);
  };

  return (<>  <button
    onClick={() => navigate('/AkshaySirDashboard')}
    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
  >
    Back
  </button>
    <div className="max-w-6xl mx-auto p-8 rounded-lg bg-gradient-to-tl from-gray-50 to-gray-200 shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Batches</h1>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter Batch Name"
          value={newBatchName}
          onChange={(e) => setNewBatchName(e.target.value)}
          className="border border-gray-300 p-2 rounded flex-grow"
        />
        <button
          onClick={handleAddBatch}
          className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Batch
        </button>
      </div>

      {loading ? (
        <p>Loading batches...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch._id} className="relative flex items-center">
              <button
                className={`py-4 rounded-lg transition duration-300 ${
                  selectedBatch?._id === batch._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-800 opacity-80 hover:opacity-100"
                } flex-grow`}
                onClick={() => handleBatchSelect(batch)}
              >
                {batch.name}
              </button>
              <span
                onClick={() => handleRemoveBatch(batch._id)}
                className="absolute right-2 top-2 cursor-pointer text-red-600 text-2xl hover:text-red-800 transition duration-300"
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      )}

      {isConfirmingRemoveBatch && (
        <div className="mt-4 p-4 border border-red-600 rounded bg-red-100">
          <p>Are you sure you want to remove this batch?</p>
          <button
            onClick={() => confirmRemoveBatch(isConfirmingRemoveBatch)}
            className="mr-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={cancelRemoveBatch}
            className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 transition duration-300"
          >
            Cancel
          </button>
        </div>
      )}

      {selectedBatch && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Selected Batch: {selectedBatch.name}</h2>

          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="border border-gray-300 p-2 mb-4 rounded"
          />
          <button
            onClick={handleAddStudent}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add Student
          </button>

          {selectedBatch.students && selectedBatch.students.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Students:</h3>
              <table className="min-w-full mt-2 border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Roll No</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Mobile</th>
                    <th className="border border-gray-300 p-2">Course</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBatch.students.map((student) => (
                    <tr key={student.rollNumber}>
                      <td className="border border-gray-300 p-2">{student.rollNumber}</td>
                      <td className="border border-gray-300 p-2">{student.fullName}</td>
                      <td className="border border-gray-300 p-2">{student.mobileNumber}</td>
                      <td className="border border-gray-300 p-2">{student.courseName}</td>
                      <td className="border border-gray-300 p-2">
                        <span
                          onClick={() => handleRemoveStudent(student)}
                          className="text-red-600 cursor-pointer hover:text-red-800 transition duration-300"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isConfirmingRemoveStudent && (
            <div className="mt-4 p-4 border border-red-600 rounded bg-red-100">
              <p>Are you sure you want to remove {isConfirmingRemoveStudent.fullName}?</p>
              <button
                onClick={confirmRemoveStudent}
                className="mr-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={cancelRemoveStudent}
                className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </>);
};

export default BatchPage;
