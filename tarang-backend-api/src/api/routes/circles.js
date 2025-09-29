
const express = require('express');
const router = express.Router();
const circlesController = require('../controllers/circlesController');
const authMiddleware = require('../../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', circlesController.createCircle);
router.get('/', circlesController.getCircles);
router.get('/:id', circlesController.getCircleById);
router.patch('/:id', circlesController.updateCircle);
router.delete('/:id', circlesController.deleteCircle);
router.post('/:id/members', circlesController.addMember);
router.delete('/:id/members/:userId', circlesController.removeMember);
router.post('/:id/media', circlesController.addMediaToCircle);
router.delete('/:id/media/:mediaId', circlesController.removeMediaFromCircle);

module.exports = router;
