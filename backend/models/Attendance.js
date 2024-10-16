const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  date: { type: Date, required: true },
  attendance: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission' },
    isPresent: { type: Boolean, required: true }
  }]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
