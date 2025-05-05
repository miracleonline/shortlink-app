// Imports
const express = require('express');
const router = express.Router();
const {
  encode,
  decode,
  listUrls,
  searchUrls,
  getUrlStats
} = require('../controllers/urlController');

// API endpoints
router.post('/encode', encode);
router.post('/decode', decode);
router.get('/list', listUrls);
router.get('/search', searchUrls); 
router.get('/stats/:shortId', getUrlStats);


module.exports = router;
