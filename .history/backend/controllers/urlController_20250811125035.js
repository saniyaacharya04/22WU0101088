const Url = require('../models/Url');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrlCode = shortid.generate();

    const url = await Url.create({ originalUrl, shortUrl: shortUrlCode });

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortUrl}`
    });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectToOriginalUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.code });
    if (!url) return res.status(404).json({ error: 'No URL found' });

    res.redirect(url.originalUrl);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
