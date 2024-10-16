const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admission',  // Update this to reference Admission model
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
