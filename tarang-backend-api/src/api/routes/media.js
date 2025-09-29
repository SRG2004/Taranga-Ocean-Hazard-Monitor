
const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.post('/upload-url', mediaController.getUploadUrl);

module.exports = router;
