
const express = require('express');
const router = express.Router();
const trendsController = require('../controllers/trendsController');
const authMiddleware = require('../../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', trendsController.getTrends);
router.post('/', trendsController.createTrend);

module.exports = router;
