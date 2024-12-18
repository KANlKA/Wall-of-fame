const express = require('express');
const Entry = require('../models/entry');
const router = express.Router();

// Helper function for error handling
const handleError = (res, error, status = 500, message = 'An error occurred') => {
  console.error(error);
  res.status(status).json({ message, error: error.message });
};

// GET all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch (err) {
    handleError(res, err);
  }
});

// GET a single entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (err) {
    handleError(res, err, 500, 'Failed to fetch entry');
  }
});

// POST a new entry
router.post('/', async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    return res.status(400).json({ message: 'All fields (name, description, image) are required' });
  }

  const newEntry = new Entry({ name, description, image });

  try {
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    handleError(res, err, 400, 'Failed to create new entry');
  }
});

// PUT update an entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (err) {
    handleError(res, err, 400, 'Failed to update entry');
  }
});

// DELETE an entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(204).end(); // 204 No Content
  } catch (err) {
    handleError(res, err, 500, 'Failed to delete entry');
  }
});

module.exports = router;
