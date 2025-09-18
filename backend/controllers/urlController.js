//Imports
const {
  createShortUrl,
  findLongUrlFromShort,
  getRedirectEntry,
  getAllUrls,
  searchUrls,
  getStatsById
} = require('../services/urlService');

// Encode 
exports.encode = (req, res) => {
  const { longUrl } = req.body;

  // Validation
  if (!longUrl || typeof longUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const urlRegex = /^(https?:\/\/)?([a-z0-9]+[.-])*[a-z0-9]+\.[a-z]{2,6}(\/[^\s]*)?$/i;

  if (!urlRegex.test(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL please enter a valid url e.g https://google.com' });
  }

  const { shortUrl, shortId } = createShortUrl(longUrl);
  res.json({ shortUrl, shortId });
};

// Decode 
exports.decode = (req, res) => {
  const { shortUrl } = req.body;

  // Validation
  if (!shortUrl || typeof shortUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const longUrl = findLongUrlFromShort(shortUrl);
  if (!longUrl) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json({ longUrl });
};

// Redirect 
exports.redirect = (req, res) => {
  const { shortId } = req.params;
  const userAgent = req.headers['user-agent'] || 'Unknown';

  const entry = getRedirectEntry(shortId, userAgent);
  if (!entry) {
    return res.status(404).send('URL not found');
  }

  res.redirect(entry.longUrl);
};

// Listing 
exports.listUrls = (req, res) => {
  const results = getAllUrls();
  res.json(results);
};

// Search 
exports.searchUrls = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const results = searchUrls(query);

  if (results.length === 0) {
    return res.status(404).json({ message: 'No matching URLs found' });
  }

  res.json(results);
};

// Statistics 
exports.getUrlStats = (req, res) => {
  const { shortId } = req.params;

  const stats = getStatsById(shortId);
  if (!stats) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json(stats);
};
