// src/routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.getBlogsPage);
// Blog detay sayfası
router.get('/:id', blogController.getBlogDetail);

module.exports = router;