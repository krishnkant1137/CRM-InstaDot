import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BatchPage = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [newBatchName, setNewBatchName] = useState("");
  const [isConfirmingRemoveBatch, setIsConfirmingRemoveBatch] = useState(null);
  const [isConfirmingRemoveStudent, setIsConfirmingRemoveStudent] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      try {
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

  const handleBatchSelect = (batch) => setSelectedBatch(batch);

  const handleAddBatch = async () => {
    if (newBatchName) {
      try {
        const response = await fetch("/api/batches/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newBatchName }),
        });
        if (!response.ok) throw new Error("Error creating batch");
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
      const studentExists = selectedBatch.students.some(
        (student) => student.rollNumber === rollNumber
      );

      if (studentExists) {
        alert("This student is already added to the batch.");
        return;
      }

      try {
        const response = await fetch(`/api/batches/add-student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNumber, batchId: selectedBatch._id }),
        });
        if (!response.ok) throw new Error("Error adding student to batch");
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

  const handleRemoveStudent = (student) =>
    setIsConfirmingRemoveStudent(student);

  const confirmRemoveStudent = async () => {
    if (selectedBatch && isConfirmingRemoveStudent) {
      try {
        const response = await fetch(`/api/batches/remove-student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rollNumber: isConfirmingRemoveStudent.rollNumber,
            batchId: selectedBatch._id,
          }),
        });
        if (!response.ok) throw new Error("Error removing student from batch");
        const updatedBatch = await response.json();

        const updatedBatches = batches.map((batch) =>
          batch._id === updatedBatch.batch._id ? updatedBatch.batch : batch
        );
        setBatches(updatedBatches);
        setSelectedBatch(updatedBatch.batch);
      } catch (error) {
        console.error("Error removing student from batch:", error);
      } finally {
        setIsConfirmingRemoveStudent(null);
      }
    }
  };

  const handleRemoveBatch = (batchId) => setIsConfirmingRemoveBatch(batchId);

  const confirmRemoveBatch = async (batchId) => {
    try {
      const response = await fetch(`/api/batches/${batchId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error removing batch");
      setBatches(batches.filter((batch) => batch._id !== batchId));
      setSelectedBatch(null);
      setIsConfirmingRemoveBatch(null);
    } catch (error) {
      console.error("Error removing batch:", error);
    }
  };

  const cancelRemoveBatch = () => setIsConfirmingRemoveBatch(null);
  const cancelRemoveStudent = () => setIsConfirmingRemoveStudent(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-200">
      <div className="container mx-auto py-8">
        <button
          onClick={() => navigate("/facultiesDashboard")}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 mb-6"
        >
          Back to Dashboard
        </button>
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Manage Batches
          </h1>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter Batch Name"
              value={newBatchName}
              onChange={(e) => setNewBatchName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 flex-grow"
            />
            <button
              onClick={handleAddBatch}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Batch
            </button>
          </div>

          {loading ? (
            <p className="text-center">Loading batches...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {batches.map((batch) => (
                <div
                  key={batch._id}
                  className={`p-4 rounded-md shadow-lg cursor-pointer flex justify-between items-center transition-colors ${
                    selectedBatch?._id === batch._id
                      ? "bg-blue-100 border-blue-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => handleBatchSelect(batch)}
                >
                  <div className="font-semibold">{batch.name}</div>
                  <button
                    onClick={() => handleRemoveBatch(batch._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          {isConfirmingRemoveBatch && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md text-center">
              <p>Are you sure you want to delete this batch?</p>
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={() => confirmRemoveBatch(isConfirmingRemoveBatch)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelRemoveBatch}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {selectedBatch && (
            <div className="mt-8 bg-white p-4 rounded-md shadow">
              <h2 className="text-2xl font-semibold mb-4">
                Selected Batch: {selectedBatch.name}
              </h2>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Enter Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 flex-grow"
                />
                <button
                  onClick={handleAddStudent}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Student
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">Roll No</th>
                      <th className="py-2 px-4 border">Name</th>
                      <th className="py-2 px-4 border">Mobile</th>
                      <th className="py-2 px-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBatch.students.map((student) => (
                      <tr key={student.rollNumber} className="hover:bg-gray-50">
                        {" "}
                        <td className="py-2 px-4 border">
                          {student.rollNumber}
                        </td>{" "}
                        <td className="py-2 px-4 border">{student.name}</td>{" "}
                        <td className="py-2 px-4 border">
                          {student.phoneNumber}
                        </td>{" "}
                        <td className="py-2 px-4 border text-center">
                          {" "}
                          <button
                            onClick={() => handleRemoveStudent(student)}
                            className="text-red-500 hover
"
                          >
                            {" "}
                            Remove{" "}
                          </button>{" "}
                        </td>{" "}
                      </tr>
                    ))}{" "}
                  </tbody>{" "}
                </table>{" "}
              </div>{" "}
            </div>
          )}
          {isConfirmingRemoveStudent && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md text-center">
              <p>Are you sure you want to remove this student?</p>
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={confirmRemoveStudent}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelRemoveStudent}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchPage;
