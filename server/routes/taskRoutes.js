const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');

module.exports = function(db) {
    const router = express.Router();

    // Import the controller for tasks
    const taskController = require('../controllers/taskController')(db);

    // Route to get all tasks
    router.get('/', authenticateJWT, taskController.getAllTasks);

    // Route to get a single task by ID
    router.get('/:id', authenticateJWT, taskController.getTaskById);

    // Route to create a new task
    router.post('/', authenticateJWT, taskController.createTask);

    // Route to update a task
    router.put('/:id', authenticateJWT, taskController.updateTask);

    // Route to delete a task
    router.delete('/:id', authenticateJWT, taskController.deleteTask);

    return router;
};