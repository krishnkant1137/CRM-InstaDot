const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Admission = require('../models/Admission');

// GET route for fetching performance data
router.get('/performance', async (req, res) => {
  console.log("Performance endpoint hit"); // Log to see if it's reached

  try {
    // Fetch all students
    const students = await Admission.find(); 
    const performanceData = await Promise.all(students.map(async (student) => {
      // Fetch attendance records for the current student
      const attendanceRecords = await Attendance.find({ "attendance.studentId": student._id });

      // Calculate total present and total absent
      const totalPresent = attendanceRecords.reduce((acc, record) => 
        acc + record.attendance.filter(att => att.studentId.equals(student._id) && att.isPresent).length, 0
      );

      const totalAbsent = attendanceRecords.reduce((acc, record) => 
        acc + record.attendance.filter(att => att.studentId.equals(student._id) && !att.isPresent).length, 0
      );

      // Calculate attendance percentage
      const attendancePercentage = totalPresent + totalAbsent > 0 ? 
        ((totalPresent / (totalPresent + totalAbsent)) * 100).toFixed(2) : 0;

      return {
        studentId: student._id,
        name: student.fullName, // Adjust according to your Admission model
        totalPresent,
        totalAbsent,
        attendancePercentage
      };
    }));

    res.json(performanceData); // Send performance data as response
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({ message: 'Error fetching performance data', error });
  }
});

module.exports = router;
