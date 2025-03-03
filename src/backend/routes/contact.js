// //routes/contact.js

const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error: err.message });
  }
});

// Add a new contact
router.post('/', async (req, res) => {
  const { name, phone, email, picture } = req.body; // Include 'picture' in request body
  try {
    const newContact = new Contact({ name, phone, email, picture });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add contact', error: err.message });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete contact', error: err.message });
  }
});

module.exports = router;
