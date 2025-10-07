const express = require('express');
const router = express.Router();
const hazardsController = require('../controllers/hazardsController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware, hazardsController.getAllHazards);
router.post('/report', authMiddleware, hazardsController.reportHazard);
router.put('/:id/status', authMiddleware, hazardsController.updateHazardStatus);

module.exports = router;
