//server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing the routes for contacts, deals, and companies
const contactRoutes = require('./routes/contact');
const dealRoutes = require('./routes/deal');
const companyRoutes = require('./routes/company'); // Import the companies route

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/contacts', contactRoutes); // Contacts route
app.use('/api/deals', dealRoutes); // Deals route
app.use('/api/companies', companyRoutes); // Companies route

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
