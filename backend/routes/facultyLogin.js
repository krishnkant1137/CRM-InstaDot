const express = require('express');
const router = express.Router();
const FacultiesAdmin = require('../models/FacultiesAdmin'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST route for Faculty login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Use email to find faculty
    const faculty = await FacultiesAdmin.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token for the faculty
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, email }); // Respond with token and email
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;  
