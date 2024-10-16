const mongoose = require('mongoose');

const VishalSirSchema = new mongoose.Schema({
  // Add faculty-specific fields
  field1: String,
  field2: String,
});

const VishalSir = mongoose.model('VishalSir', VishalSirSchema);
module.exports = VishalSir;