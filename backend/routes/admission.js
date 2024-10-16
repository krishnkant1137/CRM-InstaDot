const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');

// POST route to handle form submission
router.post('/submit', async (req, res) => {
  const {
    serialNumber,
    rollNumber,
    admissionDate,
    fullName,
    fatherName,
    motherName,
    dob,
    mobileNumber,
    email,
    qualification,
    college,
    occupation,
    status,
    gender,
    presentAddress,
    permanentAddress,
    emergencyContact,
    courseName,
    totalFee,
    registrationFee,
    admissionType,
    paymentType,
    paymentMode,
    startDate,
    installments,
    paymentHistory,
    paymentReceived,
    paymentDate,
    aadhaarCardUrl, // Assuming this is the URL of the Aadhaar card image
    passportPhotoUrl, // Assuming this is the URL of the passport photo
    documentsSubmitted, // Object for document submission status
  } = req.body;

  try {
    // Create a new admission entry
    const newAdmission = new Admission({
      serialNumber,
      rollNumber,
      admissionDate,
      fullName,
      fatherName,
      motherName,
      dob,
      mobileNumber,
      email,
      qualification,
      college,
      occupation,
      status,
      gender,
      presentAddress,
      permanentAddress,
      emergencyContact, // Assuming it's an object with the emergency contact details
      courseName,
      totalFee,
      registrationFee,
      admissionType,
      paymentHistory,
      paymentType,
      paymentMode,
      startDate,
      installments,
      paymentReceived,
      paymentDate,
      aadhaarCard: aadhaarCardUrl, // Save the Cloudinary URL for Aadhaar card
      passportPhoto: passportPhotoUrl, // Save the Cloudinary URL for passport photo
      documentsSubmitted, // Save the document submission status
    });

    // Save the admission data to MongoDB
    await newAdmission.save();

    res.status(201).json({ message: 'Admission submitted successfully!' });
  } catch (error) {
    console.error('Error saving admission data:', error);
    res.status(500).json({ error: 'Failed to submit admission' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Admission.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
