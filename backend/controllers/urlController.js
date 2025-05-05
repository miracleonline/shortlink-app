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
    visitLogs: []
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


// Redirect Logic
exports.redirect = (req, res) => {
  const { shortId } = req.params;
  const entry = urlDatabase.get(shortId);

  if (!entry) {
    return res.status(404).send('URL not found');
  }

  const userAgent = req.headers['user-agent'] || 'Unknown';

  // Increment visit and log browser info
  entry.visits += 1;
  entry.visitLogs.push({
    timestamp: new Date().toISOString(),
    browser: userAgent
  });

  res.redirect(entry.longUrl);
};

// Listing Logic
exports.listUrls = (req, res) => {
  const results = [];

  urlDatabase.forEach((value, key) => {
    results.push({
      shortId: key,
      longUrl: value.longUrl,
      createdAt: value.createdAt,
      visits: value.visits,
      shortUrl: `${BASE_URL}/${key}`, // use BASE_URL
      visitLogs: value.visitLogs
    });
  });

  res.json(results);
};

// Search logic
exports.searchUrls = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const results = [];
  urlDatabase.forEach((value, key) => {
    if (value.longUrl.includes(query) || key.includes(query)) {
      results.push({
        shortId: key,
        longUrl: value.longUrl,
        createdAt: value.createdAt,
        visits: value.visits,
        shortUrl: `${BASE_URL}/${key}`,
      });
    }
  });

  if (results.length === 0) {
    return res.status(404).json({ message: 'No matching URLs found' });
  }

  res.json(results);
};

// Statistics logic
exports.getUrlStats = (req, res) => {
  const { shortId } = req.params;

  const entry = urlDatabase.get(shortId);

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json({
    shortId,
    longUrl: entry.longUrl,
    visits: entry.visits,
    createdAt: entry.createdAt,
  });
};

