
const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const authMiddleware = require('../../middleware/authMiddleware');
const { checkRole } = require('../../middleware/roleMiddleware');

router.use(authMiddleware);

router.post('/send', checkRole(['authority', 'admin']), notificationsController.sendNotification);
router.get('/logs', checkRole(['admin']), notificationsController.getNotificationLogs);

module.exports = router;
