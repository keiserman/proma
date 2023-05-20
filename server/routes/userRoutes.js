const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');

module.exports = function(db) {
    const router = express.Router();

    // Import the controller for users
    const userController = require('../controllers/userController')(db);

    // Route to get all users
    router.get('/', authenticateJWT, userController.getAllUsers);

    // Route to get a single user by ID
    router.get('/:id', authenticateJWT, userController.getUserById);

    // Route to create a new user
    router.post('/', userController.createUser);

    // Route to update a user
    router.put('/:id', authenticateJWT, userController.updateUser);

    // Route to delete a user
    router.delete('/:id', authenticateJWT, userController.deleteUser);

    // Route to get all channels for a specific user
    router.get('/:id/channels', authenticateJWT, userController.getAllChannelsForUser);

    // Route to register a new user
    router.post('/register', userController.registerUser);

    // Route to log in a user
    router.post('/login', userController.loginUser);

    return router;
};