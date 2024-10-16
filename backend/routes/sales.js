const express = require('express');
const router = express.Router();
const SalesAdmin = require('../models/SalesAdmin'); 
const salesAuthMiddleware = require('../middleware/salesAuthMiddleware'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

// Sales Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await SalesAdmin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.SALES_JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example protected route for sales
router.get('/protected-route', salesAuthMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route for sales admin.' });
});

module.exports = router;
