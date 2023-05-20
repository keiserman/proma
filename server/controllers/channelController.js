const { ObjectId } = require('mongodb');

module.exports = function(db) {
    return {
        getAllChannels: (req, res) => {
            db.collection('channels').find().toArray()
                .then(channels => res.send(channels))
                .catch(error => res.status(500).send(error));
        },

        getChannelById: (req, res) => {
            const id = new ObjectId(req.params.id);
            db.collection('channels').findOne({ _id: id })
                .then(channel => res.send(channel))
                .catch(error => res.status(500).send(error));
        },

        createChannel: (req, res) => {
            const newChannel = req.body;
            db.collection('channels').insertOne(newChannel)
                .then(result => res.status(201).send(result.ops[0]))
                .catch(error => res.status(500).send(error));
        },

        updateChannel: (req, res) => {
            const id = new ObjectId(req.params.id);
            const updatedChannel = req.body;
            db.collection('channels').updateOne({ _id: id }, { $set: updatedChannel })
                .then(result => res.send(result))
                .catch(error => res.status(500).send(error));
        },

        deleteChannel: (req, res) => {
            const id = new ObjectId(req.params.id);
            db.collection('channels').deleteOne({ _id: id })
                .then(result => res.send(result))
                .catch(error => res.status(500).send(error));
        },

         // Get all tasks for a specific channel
         getAllTasksForChannel: (req, res) => {
            const channelId = new ObjectId(req.params.id);
            db.collection('tasks').find({ channelId: channelId }).toArray()
                .then(tasks => res.send(tasks))
                .catch(error => res.status(500).send(error));
        }
    };
};