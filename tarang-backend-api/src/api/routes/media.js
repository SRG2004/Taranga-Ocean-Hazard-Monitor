const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const mediaController = require('../controllers/mediaController');

// Upload media
router.post('/upload', auth, mediaController.uploadMedia);

// Get media by ID
router.get('/:id', auth, mediaController.getMediaById);

// Get all media for a circle
router.get('/circle/:circleId', auth, mediaController.getMediaForCircle);

// Delete media
router.delete('/:id', auth, mediaController.deleteMedia);

module.exports = router;
