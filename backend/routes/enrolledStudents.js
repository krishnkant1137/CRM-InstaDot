const express = require('express');
const router = express.Router();
const EnrolledStudent = require('../models/Admission'); // Adjust the path as needed

// GET all enrolled students
router.get('/', async (req, res) => {
  try {
    const students = await EnrolledStudent.find(); // Fetch all enrolled students
    res.json(students);
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    res.status(500).json({ message: 'Error fetching enrolled students' });
  }
});

// GET a specific enrolled student by ID
router.get('/:id', async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student ID from the request parameters
    const student = await EnrolledStudent.findById(studentId); // Fetch the student by ID

    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // Handle not found case
    }

    res.json(student); // Return the student's details
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// PATCH to update payment for a specific student
router.patch('/:id/payment', async (req, res) => {
  const studentId = req.params.id; // Get the student ID from the request parameters
  const { amountPaid } = req.body; // Get the payment amount from the request body

  try {
    const student = await EnrolledStudent.findById(studentId); // Fetch the student by ID

    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // Handle not found case
    }

    // Ensure paymentHistory is initialized as an array
    if (!student.paymentHistory) {
      student.paymentHistory = []; // Initialize paymentHistory if undefined
    }

    // Create a new payment record
    const installmentNumber = student.paymentHistory.length + 1; // Next installment number
    const newPayment = {
      installmentNumber,
      amountPaid,
      paymentDate: new Date(),
    };

    // Push the new payment to the paymentHistory
    student.paymentHistory.push(newPayment); // Make sure this line is working correctly
    student.paymentReceived += amountPaid; // Update total payment received

    // Check if the total amount paid is greater than or equal to the total fee
    if (student.paymentReceived >= student.totalFee) {
      student.paymentReceived = student.totalFee; // Cap the amount paid to total fee
      student.installments = 0; // Mark installments as completed
    } else {
      // Calculate remaining installments if not fully paid
      const remainingInstallments = Math.ceil((student.totalFee - student.paymentReceived) / (student.totalFee / student.installments));
      student.installments = remainingInstallments;
    }

    // Save the updated student record
    await student.save();
    res.status(200).json(student); // Return the updated student details
  } catch (error) {
    console.error('Error updating payment:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating payment', error: error.message }); // Return error message
  }
});

module.exports = router;