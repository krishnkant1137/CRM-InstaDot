const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const Enquiry = require('../models/Enquiry'); // Correct import for Enquiry model
const Student = require('../models/Student'); // Assuming this is your student model

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
  const phoneNumber = req.query.phone; // Get the phone number from the query parameters

  try {
    const enquiry = await Enquiry.findOne({ mobileNumber: phoneNumber }); // Search for the enquiry
    if (enquiry) {
      return res.status(200).json(enquiry); // Return the found enquiry
    }
    return res.status(404).json({ message: 'No enquiry found with this phone number.' }); // Handle not found
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return res.status(500).json({ message: 'Server error' }); // Handle server error
  }
});

router.put('/api/enquiries/enquiry/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { response } = req.body;

      const enquiry = await Enquiry.findById(id);
      if (enquiry) {
        return res.status(200).json({
            ...enquiry.toObject(), // Spread the enquiry object
            enquiryId: enquiry._id // Add enquiryId to the response
        });
    }

      enquiry.response = response; // Update the response field
      await enquiry.save(); // Save the updated enquiry

      res.status(200).send('Response updated successfully');
  } catch (error) {
      console.error('Error updating enquiry:', error);
      res.status(500).send('Server error');
  }
});


// Get a student by roll number
router.get('/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
});

// Update a student's details
router.put('/:id', async (req, res) => {
  console.log('Updating student with ID:', req.params.id); // Log the ID
  console.log('Request body:', req.body); // Log the request body
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id }, // Change here to match by id
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
