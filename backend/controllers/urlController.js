//Imports
const generateId = require('../utils/generateId');
const urlDatabase = require('../db');

const BASE_URL = 'http://localhost:5000';

// Encode logic
exports.encode = (req, res) => {
  const { longUrl } = req.body;

  // Validation
  if (!longUrl || typeof longUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortId = generateId();
  const shortUrl = `${BASE_URL}/${shortId}`;

  // Store in memory
  urlDatabase.set(shortId, {
    longUrl,
    createdAt: new Date().toISOString(),
    visits: 0,
  });

  res.json({ shortUrl, shortId });
};

// Decode logic
exports.decode = (req, res) => {
  const { shortUrl } = req.body;

  // Validation
  if (!shortUrl || typeof shortUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Extract shortId from the full short URL
  const shortId = shortUrl.split('/').pop();
  if (!shortId) {
    return res.status(400).json({ error: 'Short ID missing from URL' });
  }

  // Retrieve from memory
  const entry = urlDatabase.get(shortId);
  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json({ longUrl: entry.longUrl });
};


exports.redirect = (req, res) => {
  const { shortId } = req.params;
  const entry = urlDatabase.get(shortId);

  if (!entry) {
    return res.status(404).send('URL not found');
  }

  entry.visits += 1;
  res.redirect(entry.longUrl);
};
