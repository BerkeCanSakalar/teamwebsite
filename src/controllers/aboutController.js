// src/controllers/aboutController.js
const About = require('../models/About');

exports.getAboutPage = async (req, res) => {
  const team = await About.find();
  res.render('about', { team });
};