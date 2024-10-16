const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const Admission = require('../models/Admission');

// Create a new batch
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const newBatch = new Batch({ name });
    await newBatch.save();
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(500).json({ message: 'Error creating batch', error });
  }
});

// Get all batches
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find().populate('students');
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batches', error });
  }
});

// Add a student to a batch
router.post('/add-student', async (req, res) => {
  try {
    const { rollNumber, batchId } = req.body;

    // Find the student by rollNumber in the Admission model
    const student = await Admission.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the batch and add the student to the students array if not already added
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check if the student is already in the batch
    if (!batch.students.includes(student._id)) {
      batch.students.push(student._id);
      student.batch = batchId; // Assuming you have a field to store batch ID in the Admission model
      await batch.save();
      await student.save();
    }

    // Fetch the updated batch data with populated students
    const updatedBatch = await Batch.findById(batchId).populate('students');
    res.json({ message: 'Student added to batch', batch: updatedBatch });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student to batch', error });
  }
});

// Remove a student from a batch
router.post('/remove-student', async (req, res) => {
  try {
    const { rollNumber, batchId } = req.body;

    // Find the student by rollNumber in the Admission model
    const student = await Admission.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the batch and remove the student from the students array
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Remove student from batch
    batch.students = batch.students.filter(
      (studentId) => studentId.toString() !== student._id.toString()
    );
    student.batch = null; // Clear the batch reference from the student
    await batch.save();
    await student.save();

    // Fetch the updated batch data with populated students
    const updatedBatch = await Batch.findById(batchId).populate('students');
    res.json({ message: 'Student removed from batch', batch: updatedBatch });
  } catch (error) {
    res.status(500).json({ message: 'Error removing student from batch', error });
  }
});

// New route: Get students for a specific batch
router.get('/:id/students', async (req, res) => {
  try {
    const batchId = req.params.id;

    // Find the batch by ID and populate the students
    const batch = await Batch.findById(batchId).populate('students');
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Fetch the students associated with the batch
    res.json(batch.students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students for batch', error });
  }
});

// Delete a batch by ID
router.delete('/:id', async (req, res) => {
  try {
    const batchId = req.params.id;

    // Delete the batch
    const deletedBatch = await Batch.findByIdAndDelete(batchId);

    if (!deletedBatch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting batch', error });
  }
});

module.exports = router;
