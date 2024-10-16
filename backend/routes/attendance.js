const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Batch = require('../models/Batch');
const Admission = require('../models/Admission');

// POST route for submitting attendance
router.post('/', async (req, res) => {
  const { batchId, date, presentStudents } = req.body;

  try {
    // Check if attendance for this batch and date already exists
    const existingAttendance = await Attendance.findOne({ batchId, date });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance for this batch already submitted for today.' });
    }

    // Fetch students in the batch
    const batch = await Batch.findById(batchId).populate('students');

    // Create attendance records for each student
    const attendanceRecords = batch.students.map(student => ({
      studentId: student._id,
      isPresent: presentStudents.includes(student._id.toString())
    }));

    // Create a new attendance record
    const attendance = new Attendance({
      batchId,
      date,
      attendance: attendanceRecords,
    });
    await attendance.save();

    // Update total attendance for each student
    for (const student of attendanceRecords) {
      const update = student.isPresent ? 
        { $inc: { totalAttendance: 1 } } : 
        { $inc: { totalAbsent: 1 } }; // Assuming `totalAbsent` is a field in your Admission model

      await Admission.findByIdAndUpdate(
        student.studentId,
        update
      );
    }

    res.status(201).json(attendance);
  } catch (error) {
    console.error("Error submitting attendance:", error);
    res.status(500).json({ message: 'Error submitting attendance', error });
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

// GET route for fetching performance data
router.get('/performance', async (req, res) => {
  console.log("Performance endpoint hit"); // Log to see if it's reached

  try {
    const students = await Admission.find();
    const performanceData = await Promise.all(students.map(async (student) => {
      const attendanceRecords = await Attendance.find({ "attendance.studentId": student._id });
      const totalPresent = attendanceRecords.reduce((acc, record) =>
        acc + record.attendance.filter(att => att.studentId.equals(student._id) && att.isPresent).length, 0);
      const totalAbsent = attendanceRecords.reduce((acc, record) =>
        acc + record.attendance.filter(att => att.studentId.equals(student._id) && !att.isPresent).length, 0);

      const attendancePercentage = totalPresent + totalAbsent > 0 ? (totalPresent / (totalPresent + totalAbsent) * 100).toFixed(2) : 0;

      return {
        studentId: student._id,
        name: student.fullName, // Adjust according to your Admission model
        totalPresent,
        totalAbsent,
        attendancePercentage
      };
    }));

    res.json(performanceData);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({ message: 'Error fetching performance data', error });
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
