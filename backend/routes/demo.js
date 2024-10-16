// routes/demo.js
const express = require('express');
const router = express.Router();
const Demo = require('../models/Demo'); // Import the Demo model

// POST route to handle demo form submission
router.post('/', async (req, res) => {
  const { name, number,time, course, demoBy } = req.body;

  try {
    // Create a new demo record
    const newDemo = new Demo({
      name,
      number,
      time,
      course,
      demoBy,
    });

    // Save the new demo in the database
    const savedDemo = await newDemo.save();

    res.status(201).json({ message: 'Demo successfully recorded!', demo: savedDemo });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting demo', error });
  }
});

// GET route to fetch all demos
router.get('/', async (req, res) => {
    try {
      const demos = await Demo.find(); // Fetch all demos
      res.json(demos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching demos', error });
    }
  });

module.exports = router;
