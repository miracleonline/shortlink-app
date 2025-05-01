// Imports
const express = require('express');
const router = express.Router();
const generateId = require('../utils/generateId');

// In-memory database
const urlDatabase = new Map();

const BASE_URL = 'http://localhost:5000';

// URL Routes
router.post('/encode', (req, res) => {
  // Encode logic
  const { longUrl } = req.body;

  if (!longUrl || typeof longUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortId = generateId();
  const shortUrl = `${BASE_URL}/${shortId}`;

  urlDatabase.set(shortId, {
    longUrl,
    createdAt: new Date().toISOString(),
    visits: 0,
  });

  res.json({ shortUrl, shortId });
});

router.post('/decode', (req, res) => {
  // Decode logic
  const { shortId } = req.body;

  if (!shortId || typeof shortId !== 'string') {
    return res.status(400).json({ error: 'Short ID required' });
  }

  const entry = urlDatabase.get(shortId);
  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json({ longUrl: entry.longUrl });
});

module.exports = router;
