const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');

module.exports = function(db) {
    const router = express.Router();

    // Import the controller for channels
    const channelController = require('../controllers/channelController');

    // Route to get all channels
    router.get('/', authenticateJWT, channelController.getAllChannels);

    // Route to get a single channel by ID
    router.get('/:id', authenticateJWT, channelController.getChannelById);

    // Route to create a new channel
    router.post('/', authenticateJWT, channelController.createChannel);

    // Route to update a channel
    router.put('/:id', authenticateJWT, channelController.updateChannel);

    // Route to delete a channel
    router.delete('/:id', authenticateJWT, channelController.deleteChannel);

    // Route to get all tasks for a specific channel
    router.get('/:id/tasks', authenticateJWT, channelController.getAllTasksForChannel);

    return router;
};