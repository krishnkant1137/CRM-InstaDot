const mongoose = require('mongoose');

const AkshaySirSchema = new mongoose.Schema({
  // Add faculty-specific fields
  field1: String,
  field2: String,
});

const AkshaySir = mongoose.model('AkshaySir', AkshaySirSchema);
module.exports = AkshaySir;
