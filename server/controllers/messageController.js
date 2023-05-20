const { ObjectId } = require('mongodb');

module.exports = function(db) {
    return {
        getAllMessagesInChannel: (req, res) => {
            const channelId = new ObjectId(req.params.channelId);
            db.collection('messages').find({ channelId: channelId }).toArray()
                .then(messages => res.send(messages))
                .catch(error => res.status(500).send(error));
        },

        createMessageInChannel: (req, res) => {
            const newMessage = req.body;
            newMessage.channelId = new ObjectId(req.params.channelId);
            newMessage.timestamp = new Date();
            db.collection('messages').insertOne(newMessage)
                .then(result => res.status(201).send(result.ops[0]))
                .catch(error => res.status(500).send(error));
        },
    };
};