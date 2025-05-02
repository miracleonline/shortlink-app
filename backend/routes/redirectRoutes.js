const express = require('express');
const router = express.Router();
const { redirect } = require('../controllers/urlController');

router.get('/:shortId', redirect);

module.exports = router;
