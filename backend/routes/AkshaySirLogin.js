const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty'); // Import your Faculty model
const jwt = require('jsonwebtoken');

// Login route for Akshay Sir
router.post('/akshay/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const faculty = await Faculty.findOne({ username, password });
    if (!faculty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: faculty._id, role: 'faculties' }, 'your_jwt_secret'); // Use your own secret
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add routes for other faculty members similarly...

module.exports = router;
