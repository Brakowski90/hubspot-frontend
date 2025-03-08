// routes/contact.js

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
  const { name, phone, email, picture } = req.body;
  try {
    const newContact = new Contact({ name, phone, email, picture });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add contact', error: err.message });
  }
});

// Update an existing contact
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, picture } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, phone, email, picture }, 
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update contact', error: err.message });
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
