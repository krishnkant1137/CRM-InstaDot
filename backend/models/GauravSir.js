const mongoose = require('mongoose');

const GauravSirSchema = new mongoose.Schema({
  // Add faculty-specific fields
  field1: String,
  field2: String,
});

const GauravSir = mongoose.model('GauravSir', GauravSirSchema);
module.exports = GauravSir;
