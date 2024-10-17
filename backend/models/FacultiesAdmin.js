const mongoose = require('mongoose');

const facultiesAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Unique email for faculties
  password: { type: String, required: true }, // Password field
});

module.exports = mongoose.model('FacultiesAdmin', facultiesAdminSchema);
