const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const enquiryRoutes = require('./routes/enquiry');
const studentRoutes = require('./routes/student');
const demoRoutes = require('./routes/demo');
const salesRoutes = require('./routes/sales');
const facultiesRoutes = require('./routes/faculties');
const admissionRoutes = require('./routes/admission');
const enrolledStudentsRoutes = require('./routes/enrolledStudents');
const batchRoutes = require('./routes/batchRoutes');
const attendanceRoutes = require('./routes/attendance');
const performanceRoutes = require('./routes/performance');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/demo', demoRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/faculties', facultiesRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/enrolled-students', enrolledStudentsRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/performance', performanceRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI,).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Placeholder route
app.get('/', (req, res) => res.send('API is running...'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
