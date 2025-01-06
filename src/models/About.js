// src/models/About.js
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  kick: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedin: { type: String }
});

module.exports = mongoose.model('About', AboutSchema);