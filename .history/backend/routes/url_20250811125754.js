const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../backend/controllers/urlController');

module.exports = express.Router()
  .post('/shorten', createShortUrl)
  .get('/:code', redirectToOriginalUrl);
