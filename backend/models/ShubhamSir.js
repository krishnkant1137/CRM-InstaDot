const mongoose = require('mongoose');

const ShubhamSirSchema = new mongoose.Schema({
  // Add faculty-specific fields
  field1: String,
  field2: String,
});

const ShubhamSir = mongoose.model('ShubhamSir', ShubhamSirSchema);
module.exports = ShubhamSir;