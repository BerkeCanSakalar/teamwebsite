const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, default: null },
}, { timestamps: true }); // createdAt ve updatedAt otomatik olarak gelir

module.exports = mongoose.model('Blog', blogSchema);
