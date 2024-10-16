const mongoose = require('mongoose');

const NipurSirSchema = new mongoose.Schema({
  // Add faculty-specific fields
  field1: String,
  field2: String,
});

const NipurSir = mongoose.model('NipurSir', NipurSirSchema);
module.exports = NipurSir;