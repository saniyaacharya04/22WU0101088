const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/:code', redirectToOriginalUrl);

module.exports = router;
