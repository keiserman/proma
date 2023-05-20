const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');

module.exports = function(db) {
    const router = express.Router();

    // Import the controller for messages
    const messageController = require('../controllers/messageController')(db);

    // Route to get all messages for a specific channel
    router.get('/:channelId', authenticateJWT, messageController.getAllMessagesForChannel);

    // Route to create a new message in a channel
    router.post('/:channelId', authenticateJWT, messageController.createMessage);

    // Route to update a message
    router.put('/:id', authenticateJWT, messageController.updateMessage);

    // Route to delete a message
    router.delete('/:id', authenticateJWT, messageController.deleteMessage);

    return router;
};