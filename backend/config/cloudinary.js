const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // your Cloudinary API secret
});

module.exports = cloudinary;

