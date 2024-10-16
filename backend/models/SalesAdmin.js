// models/SalesAdmin.js
const mongoose = require('mongoose');

const salesAdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('SalesAdmin', salesAdminSchema);
