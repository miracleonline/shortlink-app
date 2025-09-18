// Imports
const generateId = require('../utils/generateId');
const urlDatabase = require('../db');
const { BASE_URL } = require('../config');

// Encode logic
function createShortUrl(longUrl) {
  const shortId = generateId();
  const shortUrl = `${BASE_URL}/${shortId}`;

  // Store in memory
  urlDatabase.set(shortId, {
    longUrl,
    createdAt: new Date().toISOString(),
    visits: 0,
    visitLogs: []
  });

  return { shortUrl, shortId };
}

// Decode logic
function findLongUrlFromShort(shortUrl) {
  // Extract shortId from the full short URL
  const shortId = shortUrl.split('/').pop();
  if (!shortId) return null;

  // Retrieve from memory
  const entry = urlDatabase.get(shortId);
  if (!entry) return null;

  return entry.longUrl;
}

// Redirect Logic
function getRedirectEntry(shortId, userAgent = 'Unknown') {
  const entry = urlDatabase.get(shortId);

  if (!entry) return null;

  // Increment visit and log browser info
  entry.visits += 1;
  entry.visitLogs.push({
    timestamp: new Date().toISOString(),
    browser: userAgent
  });

  return entry;
}

// Listing Logic
function getAllUrls() {
  const results = [];

  urlDatabase.forEach((value, key) => {
    results.push({
      shortId: key,
      longUrl: value.longUrl,
      createdAt: value.createdAt,
      visits: value.visits,
      shortUrl: `${BASE_URL}/${key}`,
      visitLogs: value.visitLogs
    });
  });

  return results;
}

// Search Logic
function searchUrls(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();

  urlDatabase.forEach((value, key) => {
    if (
      value.longUrl.toLowerCase().includes(lowerQuery) ||
      key.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        shortId: key,
        longUrl: value.longUrl,
        createdAt: value.createdAt,
        visits: value.visits,
        shortUrl: `${BASE_URL}/${key}`,
        visitLogs: value.visitLogs
      });
    }
  });

  return results;
}

// Statistics Logic
function getStatsById(shortId) {
  const entry = urlDatabase.get(shortId);
  if (!entry) return null;

  return {
    shortId,
    longUrl: entry.longUrl,
    visits: entry.visits,
    createdAt: entry.createdAt
  };
}

module.exports = {
  createShortUrl,
  findLongUrlFromShort,
  getRedirectEntry,
  getAllUrls,
  searchUrls,
  getStatsById
};
