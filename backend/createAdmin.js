require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const SalesAdmin = require('./models/SalesAdmin'); 
const FacultiesAdmin = require('./models/FacultiesAdmin')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('facultiespassword', 10); // Replace 'yourpassword' with the desired password
  const newAdmin = new FacultiesAdmin({ username: 'admin', password: hashedPassword });
  await newAdmin.save();
  console.log('FacultiesAdmin created!');
};

createAdmin();
