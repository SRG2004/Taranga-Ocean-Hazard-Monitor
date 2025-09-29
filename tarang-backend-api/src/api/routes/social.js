
const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/summary', socialController.getSocialSummary);
router.get('/posts', socialController.getSocialPosts);

module.exports = router;
