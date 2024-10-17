const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  enquiryDate: { type: Date, required: true, default: Date.now },
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  collegeName: { type: String, required: true },
  stream: { type: String, required: true },
  passingYear: { type: String, required: true },
  courseName: { type: String, required: true },
  source: { type: String, required: true },
  otherSource: { type: String }, 
  response: { type: String, default: '' },
  query: String,
});

module.exports = mongoose.model('Enquiry', enquirySchema);
