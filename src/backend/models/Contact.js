//models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String, // URL of the contact's picture
    default: '',  // Optional: Default to an empty string
  },
});

module.exports = mongoose.model('Contact', contactSchema);
