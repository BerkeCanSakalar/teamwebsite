const express = require('express');
const contactController = require('../controllers/contactController');
const router = express.Router();

router.get('/', contactController.getContactPage);
router.post('/', contactController.sendContact);

module.exports = router;
