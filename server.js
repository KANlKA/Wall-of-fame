require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const entriesRouter = require('./routes/entries');

const app = express();
const port = 5000;

// Correctly use the loaded environment variable
const mongoUri = process.env.MONGODB_URI;  // Correct this line

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add a root route for the homepage or general API testing
app.get('/', (req, res) => {
  res.send('Welcome to the Wall of Fame API!');
});

// API Routes
app.use('/entries', entriesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
