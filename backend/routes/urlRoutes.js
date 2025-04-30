// Imports
const express = require('express');
const router = express.Router();

// URL Routes
router.post('/encode', (req, res) => {
  // Encode logic*
  res.json({ message: 'Encode endpoint' });
});

router.post('/decode', (req, res) => {
  // Decode logic*
  res.json({ message: 'Decode endpoint' });
});

module.exports = router;
