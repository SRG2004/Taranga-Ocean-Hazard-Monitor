
const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

// All report routes are protected
router.use(authMiddleware);

// Routes
router.post('/', reportsController.createReport);
router.get('/', reportsController.getReports);
router.get('/:id', reportsController.getReportById);

// Only officials, analysts, or admins can update a report's status
router.patch(
    '/:id',
    checkRole(['official', 'analyst', 'admin']),
    reportsController.updateReportStatus
);

module.exports = router;
