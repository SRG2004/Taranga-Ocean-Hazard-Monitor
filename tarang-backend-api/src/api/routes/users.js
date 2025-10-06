const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../../middleware/authMiddleware');

// Middleware to protect all user routes
router.use(authMiddleware);

// Route to get all users
router.get('/', usersController.getAllUsers);

// Route to get a single user by ID
router.get('/:id', usersController.getUserById);

// Route to update a user's profile
router.patch('/:id', usersController.updateUser);

// Route to delete a user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
