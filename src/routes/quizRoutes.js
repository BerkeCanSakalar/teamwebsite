const express = require('express');
const router = express.Router();
const { getQuizPage } = require('../controllers/quizController');

// Kullanıcı için quiz sayfası
router.get('/', getQuizPage);

module.exports = router;
