const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Admission = require('../models/Admission');

// GET route for fetching performance data
router.get('/attendance-performance', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        const studentAttendance = {};

        // Aggregate attendance data
        attendanceRecords.forEach((record) => {
            record.presentStudents.forEach((rollNumber) => {
                if (!studentAttendance[rollNumber]) {
                    studentAttendance[rollNumber] = {
                        rollNumber,
                        name: '', // Placeholder for the student's name
                        totalPresent: 0,
                        totalAbsent: 0,
                        classification: '', // Placeholder for classification
                    };
                }
                studentAttendance[rollNumber].totalPresent += 1;
            });

            record.absentStudents.forEach((rollNumber) => {
                if (!studentAttendance[rollNumber]) {
                    studentAttendance[rollNumber] = {
                        rollNumber,
                        name: '', // Placeholder for the student's name
                        totalPresent: 0,
                        totalAbsent: 0,
                        classification: '', // Placeholder for classification
                    };
                }
                studentAttendance[rollNumber].totalAbsent += 1;
            });
        });

        // Fetch additional data from Admission schema
        const admissions = await Admission.find();
        admissions.forEach(admission => {
            if (studentAttendance[admission.rollNumber]) {
                studentAttendance[admission.rollNumber].name = admission.fullName;
                studentAttendance[admission.rollNumber].classification = admission.classification || ''; // Get classification if available
            }
        });

        // Calculate attendance percentage
        const performanceData = Object.values(studentAttendance).map(data => {
            const totalDays = data.totalPresent + data.totalAbsent;
            data.attendancePercentage = totalDays > 0 ? (data.totalPresent / totalDays) * 100 : 0;
            return data;
        });

        res.json(performanceData);
    } catch (error) {
        console.error('Error fetching performance data:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// PUT route for updating student classification
router.put('/:rollNumber', async (req, res) => {
    const { rollNumber } = req.params;
    const { classification } = req.body; // Get new classification from request body

    try {
        // Update classification directly in the Admission collection
        const updatedRecord = await Admission.updateOne(
            { rollNumber: rollNumber }, // Match by rollNumber
            { $set: { classification: classification } } // Update classification
        );

        if (updatedRecord.nModified === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Classification updated successfully' });
    } catch (error) {
        console.error('Error updating classification:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
