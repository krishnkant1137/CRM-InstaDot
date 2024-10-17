const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    date: { type: String, required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
    presentStudents: [{ type: String }],
    absentStudents: [{ type: String }],
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
