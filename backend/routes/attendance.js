const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Batch = require('../models/Batch');
const Admission = require('../models/Admission');

router.post('/submit-attendance', async (req, res) => {
  const { date, batchId, presentStudents, absentStudents } = req.body;

  try {
      // Check if attendance for this date and batch already exists
      const existingRecord = await Attendance.findOne({ date, batchId });
      if (existingRecord) {
          return res.status(400).json({ message: 'Attendance has already been submitted for this date and batch.' });
      }

      // Create a new attendance record
      const newAttendance = new Attendance({
          date,
          batchId,
          presentStudents,
          absentStudents
      });

      await newAttendance.save();
      res.status(201).json({ message: 'Attendance submitted successfully.', attendance: newAttendance });
  } catch (error) {
    console.error("Error submitting attendance:", error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error });
  }
});

// GET route for fetching attendance records for the performance section
router.get('/:batchId', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ batchId: req.params.batchId });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this batch.' });
    }

    // Format the response to include only necessary fields
    const formattedRecords = attendanceRecords.map(record => ({
      date: record.date,
      attendance: record.attendance.map(student => ({
        studentId: student.studentId,
        isPresent: student.isPresent
      }))
    }));

    res.json(formattedRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
});

// GET route for fetching all batches (added for frontend use)
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find().populate('students');
    
    if (batches.length === 0) {
      return res.status(404).json({ message: 'No batches found.' });
    }

    // Format the response
    const formattedBatches = batches.map(batch => ({
      _id: batch._id,
      name: batch.fullName, // Adjust according to your batch schema
      students: batch.students // You might want to format this further if needed
    }));

    res.json(formattedBatches);
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ message: 'Error fetching batches', error });
  }
});

module.exports = router;
