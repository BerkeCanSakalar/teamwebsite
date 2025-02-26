const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }, // Okunmamış mesajları takip etmek için
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', ContactSchema);
