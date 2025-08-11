const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

module.exports = express.Router()
  .post('/shorten', createShortUrl)
  .get('/:code', redirectToOriginalUrl);
