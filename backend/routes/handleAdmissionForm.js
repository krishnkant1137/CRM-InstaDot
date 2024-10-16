const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Admission = require('../models/Admission');
const streamifier = require('streamifier');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

router.post('/admission', upload.fields([{ name: 'passportPhoto' }, { name: 'aadhaarCard' }]), async (req, res) => {
  try {
    const { body, files } = req;

    console.log('Incoming body:', body);
    console.log('Incoming files:', files);

    // Validate file uploads
    if (!files['passportPhoto'] || !files['aadhaarCard']) {
      return res.status(400).json({ error: 'Passport photo and Aadhaar card are required.' });
    }

    const passportPhotoUploadResult = await uploadToCloudinary(files['passportPhoto'][0].buffer);
    const aadhaarCardUploadResult = await uploadToCloudinary(files['aadhaarCard'][0].buffer);

    const newAdmission = new Admission({
      serialNumber: body.serialNumber,
      fullName: body.fullName,
      fatherName: body.fatherName,
      motherName: body.motherName,
      dob: body.dob,
      mobileNumber: body.mobileNumber,
      email: body.email,
      qualification: body.qualification,
      college: body.college,
      occupation: body.occupation,
      status: body.status,
      gender: body.gender,
      presentAddress: body.presentAddress,
      permanentAddress: body.permanentAddress,
      emergencyContact: {
        name: body.emergencyName,
        mobileNumber: body.emergencyMobileNumber,
        relation: body.emergencyRelation,
        fatherNumber: body.emergencyFatherNumber,
      },
      courseName: body.courseName,
      totalFee: body.totalFee,
      registrationFee: body.registrationFee,
      admissionType: body.admissionType,
      paymentType: body.paymentType,
      paymentMode: body.paymentMode,
      startDate: body.startDate,
      installments: body.installments,
      paymentReceived: body.paymentReceived,
      paymentDate: body.paymentDate,
      passportPhoto: passportPhotoUploadResult.secure_url,
      aadhaarCard: aadhaarCardUploadResult.secure_url,
      documentsSubmitted: {
        aadhaar: body.aadhaar === 'true',
        voterCard: body.voterCard === 'true',
        drivingLicense: body.drivingLicense === 'true',
        other: body.other === 'true',
      },
    });

    // const newAdmission = new Admission(req.body);
    await newAdmission.save();

    res.status(201).json({ message: 'Admission form submitted successfully', admission: newAdmission });
  } catch (error) {
    console.error('Error saving admission form:', error);
    res.status(500).json({ error: 'Failed to submit the form', details: error.message });
  }
});

module.exports = router;


