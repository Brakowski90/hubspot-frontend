// models/Deal.js

const mongoose = require('mongoose');

// Define Deal Schema
const dealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dateCreated: { type: Date, required: true },
  stage: { type: String, required: true, default: 'initiated' },
});

// Create Deal Model
const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
