
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:id', usersController.getUserById);
router.patch('/:id', usersController.updateUser);

module.exports = router;
