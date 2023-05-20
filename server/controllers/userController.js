const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function(db) {
    return {
        getAllUsers: (req, res) => {
            db.collection('users').find().toArray()
                .then(users => res.send(users))
                .catch(error => res.status(500).send(error));
        },

        getUserById: (req, res) => {
            const id = new ObjectId(req.params.id);
            db.collection('users').findOne({ _id: id })
                .then(user => res.send(user))
                .catch(error => res.status(500).send(error));
        },

        createUser: (req, res) => {
            const newUser = req.body;
            db.collection('users').insertOne(newUser)
                .then(result => res.status(201).send(result.ops[0]))
                .catch(error => res.status(500).send(error));
        },

        updateUser: (req, res) => {
            const id = new ObjectId(req.params.id);
            const updatedUser = req.body;
            db.collection('users').updateOne({ _id: id }, { $set: updatedUser })
                .then(result => res.send(result))
                .catch(error => res.status(500).send(error));
        },

        deleteUser: (req, res) => {
            const id = new ObjectId(req.params.id);
            db.collection('users').deleteOne({ _id: id })
                .then(result => res.send(result))
                .catch(error => res.status(500).send(error));
        },

        // Get all channels for a specific user
        getAllChannelsForUser: async (req, res) => {
            const userId = new ObjectId(req.params.id);
            try {
                const channels = await db.collection('channels').find({ members: userId }).toArray();
                res.send(channels);
            } catch (error) {
                res.status(500).send(error);
            }
        },

        registerUser: async (req, res) => {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = { ...req.body, password: hashedPassword };
            db.collection('users').insertOne(newUser)
                .then(result => res.status(201).send(result.ops[0]))
                .catch(error => res.status(500).send(error));
        },

        loginUser: (req, res) => {
            db.collection('users').findOne({ username: req.body.username })
                .then(user => {
                    if (!user) {
                        res.status(401).send({ error: 'Invalid username or password' });
                    } else {
                        bcrypt.compare(req.body.password, user.password)
                            .then(match => {
                                if (!match) {
                                    res.status(401).send({ error: 'Invalid username or password' });
                                } else {
                                    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
                                    res.send({ token: token });
                                }
                            });
                    }
                })
                .catch(error => res.status(500).send(error));
        }
    };
};