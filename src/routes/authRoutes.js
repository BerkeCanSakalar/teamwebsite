const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
