const express = require('express');
const router = express.Router();
const FacultiesAdmin = require('../models/FacultiesAdmin'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST route for Faculty login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const faculty = await FacultiesAdmin.findOne({ username });
    if (!faculty) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username }); // Send token and faculty name
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
