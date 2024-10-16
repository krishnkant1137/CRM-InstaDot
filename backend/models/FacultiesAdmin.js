// models/FacultiesAdmin.js
const mongoose = require('mongoose');

const facultiesAdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('FacultiesAdmin', facultiesAdminSchema);
