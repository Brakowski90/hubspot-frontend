// //routes/company.js

const express = require('express');
const Company = require('../models/Company');

const router = express.Router();

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve companies', error: err.message });
  }
});

// Add a new company
router.post('/', async (req, res) => {
  const { name, email, phone, picture } = req.body;
  try {
    const newCompany = new Company({ name, email, phone, picture });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add company', error: err.message });
  }
});

// Update an existing company
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, picture } = req.body;

  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { name, email, phone, picture },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update company', error: err.message });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Company.findByIdAndDelete(id);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete company', error: err.message });
  }
});

module.exports = router;
