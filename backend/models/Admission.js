const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String },
  mobileNumber: { type: Number }, 
  relation: { type: String },
  fatherNumber: { type: Number }, 
});

const documentsSubmittedSchema = new mongoose.Schema({
  aadhaar: { type: Boolean, default: false },
  voterCard: { type: Boolean, default: false },
  drivingLicense: { type: Boolean, default: false },
  other: { type: Boolean, default: false },
});

const paymentHistorySchema = new mongoose.Schema({
  installmentNumber: Number,
  amountPaid: Number,
  paymentDate: Date,
});

const admissionSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  rollNumber: { type: String, required: true, unique: true },
  admissionDate: { type: Date },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },
  mobileNumber: { type: Number, required: true }, 
  email: { type: String, required: true },
  qualification: { type: String },
  college: { type: String },
  occupation: { type: String },
  status: { type: String },
  gender: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  emergencyContact: emergencyContactSchema,
  courseName: { type: String },
  totalFee: { type: Number },
  registrationFee: { type: Number }, 
  admissionType: { type: String, default: 'Offline' },
  paymentType: { type: String, default: 'Full Payment' },
  paymentMode: { type: String, default: 'Cash' },
  startDate: { type: Date },
  installments: { type: Number },
  paymentHistory: [paymentHistorySchema],
  paymentReceived: { type: Number, default: 0 },
  paymentDate: { type: Date },
  passportPhoto: { type: String }, 
  aadhaarCard: { type: String }, 
  documentsSubmitted: documentsSubmittedSchema,
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  classification: { type: String, enum: ['Not Classified', 'Good', 'Average', 'Weak', 'Better'], default: 'Not Classified' }
});

const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);

module.exports = Admission;
