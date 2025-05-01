// Imports
const express = require('express');
const router = express.Router();
const {
  encode,
  decode,
  redirect
} = require('../controllers/urlController');

// API endpoints
router.post('/encode', encode);
router.post('/decode', decode);

// Redirect endpoint (ONLY DEFINED)
router.get('/:shortId', redirect);

module.exports = router;
