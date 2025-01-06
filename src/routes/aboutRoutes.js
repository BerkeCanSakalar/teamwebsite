// src/routes/aboutRoutes.js
const express = require('express');
const aboutController = require('../controllers/aboutController');
const router = express.Router();

router.get('/', aboutController.getAboutPage);

module.exports = router;