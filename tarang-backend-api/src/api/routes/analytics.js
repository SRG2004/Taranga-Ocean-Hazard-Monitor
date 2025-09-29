
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(checkRole(['analyst', 'admin']));

router.post('/hotspot', analyticsController.triggerHotspotAnalysis);
router.get('/dashboard', analyticsController.getDashboardData);

module.exports = router;
