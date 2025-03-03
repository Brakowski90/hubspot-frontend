// routes/deals.js

const express = require('express');
const Deal = require('../models/Deal'); // Import the Deal model
const router = express.Router();

// Get all deals
router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new deal
router.post('/', async (req, res) => {
  try {
    const { name, amount, dateCreated, stage } = req.body;
    const newDeal = new Deal({ 
      name, 
      amount, 
      dateCreated, 
      stage: stage || 'initiated' 
    });
    await newDeal.save();
    res.json(newDeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a deal
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedDeal = await Deal.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedDeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a deal
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Deal.findByIdAndDelete(id);
    res.json({ message: 'Deal deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

