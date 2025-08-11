const Url = require('../models/Url');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrlCode = shortid.generate();
    try {
        let url = new Url({ originalUrl, shortUrl: shortUrlCode });
        await url.save();
        res.json({ originalUrl, shortUrl: `${req.protocol}://${req.get('host')}/${shortUrlCode}` });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.redirectToOriginalUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.code });
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: 'No URL found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
