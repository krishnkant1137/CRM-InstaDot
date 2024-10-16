import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [newPayment, setNewPayment] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [remainingInstallments, setRemainingInstallments] = useState(3);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/enrolled-students/${studentId}`)
      .then(response => {
        const data = response.data;
        const amountPaid = Number(data.paymentReceived);
        const totalFee = Number(data.totalFee);
        const installments = data.installments;

        setStudent({
          ...data,
          amountPaid,
          totalFee,
        });
        setRemainingInstallments(installments);

        // Calculate installment amount
        const remainingAmount = totalFee - amountPaid;
        setInstallmentAmount((remainingAmount / installments).toFixed(2));
      })
      .catch(error => {
        console.error('Error fetching student profile:', error);
      });
  }, [studentId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setNewPayment(value);
    }
  };

  const addPayment = async () => {
    const paymentAmount = parseFloat(newPayment);

    if (paymentAmount <= 0 || isNaN(paymentAmount)) {
      alert('Please enter a valid payment amount greater than zero.');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/enrolled-students/${studentId}/payment`,
        {
          amountPaid: paymentAmount, // Change here to match backend
        }
      );

      // Update the student state with the new data
      setStudent(response.data);
      setNewPayment('');
      setNotification(`Payment of ₹${paymentAmount} has been recorded successfully!`);

      // Update remaining installments based on the new data
      setRemainingInstallments(response.data.installments);
    } catch (error) {
      console.error('Error updating payment:', error.response ? error.response.data : error);
      alert('Error updating payment: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  if (!student) {
    return <div>Loading student information...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r shadow-lg border mt-14 p-6">
      <button
        onClick={handleBack}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
      >
        Back to All Students
      </button>
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">Student Profile</h2>

      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 shadow-md">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{notification}</span>
          <span onClick={() => setNotification('')} className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M10 9l-5 5 1 1 4-4 4 4 1-1-5-5z" />
            </svg>
          </span>
        </div>
      )}

      <table className="min-w-full bg-white rounded-lg shadow-md mb-6 border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left">Field</th>
            <th className="py-3 px-4 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-3"><strong>Name:</strong></td>
            <td className="border px-4 py-3">{student.fullName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Roll Number:</strong></td>
            <td className="border px-4 py-3">{student.rollNumber}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Email:</strong></td>
            <td className="border px-4 py-3">{student.email}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Phone:</strong></td>
            <td className="border px-4 py-3">{student.mobileNumber}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Course:</strong></td>
            <td className="border px-4 py-3">{student.courseName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Total Fees:</strong></td>
            <td className="border px-4 py-3 text-blue-600 font-bold">₹{student.totalFee}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Amount Paid:</strong></td>
            <td className="border px-4 py-3 text-green-600 font-bold">₹{student.paymentReceived}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Remaining Amount:</strong></td>
            <td className="border px-4 py-3 text-red-600 font-bold">₹{(student.totalFee - student.paymentReceived).toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Installment Amount:</strong></td>
            <td className="border px-4 py-3 text-blue-600 font-bold">₹{installmentAmount}</td>
          </tr>
          <tr>
            <td className="border px-4 py-3"><strong>Remaining Installments:</strong></td>
            <td className="border px-4 py-3 text-red-600 font-bold">{remainingInstallments}</td>
          </tr>
        </tbody>
      </table>

      {remainingInstallments > 0 ? (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">Add Payment:</label>
          <input
            type="text"
            value={newPayment}
            onChange={handlePaymentChange}
            className="border rounded-lg p-3 w-full mb-4 text-lg"
            placeholder="Enter payment amount"
          />
          <button
            onClick={addPayment}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 w-full text-lg"
          >
            Add Payment
          </button>
        </div>
      ) : (
        <div className="text-green-700 text-xl font-semibold mb-6">
          All payments are complete!
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">Payment History:</h3>
        {student.paymentHistory && student.paymentHistory.length > 0 ? (
          <ul className="list-disc pl-5">
            {student.paymentHistory.map((payment, index) => (
              <li key={index} className="text-lg text-gray-700">
                Installment {payment.installmentNumber}: ₹{payment.amountPaid} - Paid on {new Date(payment.paymentDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">No payments have been made yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
