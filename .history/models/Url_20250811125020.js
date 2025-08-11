const { Schema, model } = require('mongoose');

module.exports = model('Url', new Schema({
  originalUrl: { type: String, required: true },
  shortUrl:   { type: String, required: true, unique: true },
  date:       { type: Date, default: Date.now }
}));
