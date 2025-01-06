const express = require('express');
const clipController = require('../controllers/clipController');
const router = express.Router();

// Ana sayfa klipleri
router.get('/', clipController.getClips);

// Tüm klipler sayfası
router.get('/all', clipController.getAllClips);

module.exports = router;
