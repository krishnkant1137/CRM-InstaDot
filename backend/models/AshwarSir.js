const mongoose = require('mongoose');

const AshwarSirSchema = new mongoose.Schema({
  // Add faculty-specific fields
  field1: String,
  field2: String,
});

const AshwarSir = mongoose.model('AshwarSir', AshwarSirSchema);
module.exports = AshwarSir;
