const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, updateEnquiryResponse } = require('../controllers/enquiry');

router.post('/', createEnquiry);
router.get('/', getEnquiries);
router.put('/enquiry/:id', updateEnquiryResponse);



module.exports = router;