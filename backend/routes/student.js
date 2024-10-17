const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const Enquiry = require('../models/Enquiry');
const Student = require('../models/Student');

// Create a new student
router.post('/create', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});

// Search Enquiry by Phone Number
router.get('/search', async (req, res) => {
  const phoneNumber = req.query.phone;

  try {
    const enquiry = await Enquiry.findOne({ mobileNumber: phoneNumber });
    if (enquiry) {
      return res.status(200).json(enquiry);
    }
    return res.status(404).json({ message: 'No enquiry found with this phone number.' });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update response by mobile number
router.put('/enquiry/update-response', async (req, res) => {
  const { phoneNumber, response } = req.body;

  try {
    // Find and update the enquiry based on mobile number
    const updatedEnquiry = await Enquiry.findOneAndUpdate(
      { mobileNumber: phoneNumber },
      { response },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({
      message: 'Response updated successfully',
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
  
// Update a student's details
router.put('/:id', async (req, res) => {
  console.log('Updating student with ID:', req.params.id);
  console.log('Request body:', req.body);
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
});

// Delete a student by roll number
router.delete('/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
});

module.exports = router;
