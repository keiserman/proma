const { ObjectId } = require('mongodb');

module.exports = function(db) {
    return {
        getAllTasks: (req, res) => {
            db.collection('tasks').find().toArray()
                .then(tasks => res.send(tasks))
                .catch(error => res.status(500).send(error));
        },

        getTaskById: (req, res) => {
            const id = new ObjectId(req.params.id);
            db.collection('tasks').findOne({ _id: id })
                .then(task => res.send(task))
                .catch(error => res.status(500).send(error));
        },

        createTask: (req, res) => {
            const newTask = req.body;
            db.collection('tasks').insertOne(newTask)
                .then(result => res.status(201).send(result.ops[0]))
                .catch(error => res.status(500).send(error));
        },

        updateTask: (req, res) => {
            const id = new ObjectId(req.params.id);
            const updatedTask = req.body;
            db.collection('tasks').updateOne({ _id: id }, { $set: updatedTask })
                .then(result => res.send(result))
                .catch(error => res.status(500).send(error));
        },

        deleteTask: (req, res) => {
            const id = new ObjectId(req.params.id);
            db.collection('tasks').deleteOne({ _id: id })
                .then(result => res.send(result))
                .catch(error => res.status(500).send(error));
        }
    };
};