const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Clip', clipSchema);
