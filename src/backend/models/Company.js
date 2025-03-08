// //models/Company.js

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  picture: {
    type: String,  
    default: '', 
  },
});

module.exports = mongoose.model('Company', companySchema);
