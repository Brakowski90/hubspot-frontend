// //routes/company.js

// const express = require('express');
// const Company = require('../models/Company');

// const router = express.Router();


// // Add a new company
// router.post('/', async (req, res) => {
//   const { name, email, phone } = req.body;
//   try {
//     const newCompany = new Company({ name, email, phone });
//     await newCompany.save();
//     res.status(201).json(newCompany);
//   } catch (err) {
//     res.status(400).json({ message: 'Failed to add company', error: err.message });
//   }
// });

// // Delete a company
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Company.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Company deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ message: 'Failed to delete company', error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const Company = require('../models/Company');

const router = express.Router();

// Fetch all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch companies', error: err.message });
  }
});

// Fetch a single company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching company', error: err.message });
  }
});

// Add a new company
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newCompany = new Company({ name, email, phone });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add company', error: err.message });
  }
});

// Update a company
router.put('/:id', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update company', error: err.message });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete company', error: err.message });
  }
});

module.exports = router;
