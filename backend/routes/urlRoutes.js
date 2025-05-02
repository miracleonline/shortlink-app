// Imports
const express = require('express');
const router = express.Router();
const {
  encode,
  decode,
  listUrls
} = require('../controllers/urlController');

// API endpoints
router.post('/encode', encode);
router.post('/decode', decode);
router.get('/list', listUrls);


module.exports = router;
