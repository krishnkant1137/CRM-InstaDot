const Enquiry = require('../models/Enquiry');

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry created successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: 'Error creating enquiry', error });
  }
};

// Get all enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching enquiries', error });
  }
};

// Update an enquiry's response
exports.updateEnquiryResponse = async (req, res) => {
  const { id } = req.params; // Extract id from params
  const { response } = req.body; // Extract response from request body

  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { response }, // Update the response field
      { new: true } // Return the updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({ message: 'Enquiry updated successfully', enquiry: updatedEnquiry });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(400).json({ message: 'Error updating enquiry', error });
  }
};
