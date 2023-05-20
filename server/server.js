const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const port = process.env.PORT || 3000;  // use the PORT environment variable if it exists, else use 3000

const uri = "your_mongodb_connection_string"; // replace with your actual MongoDB connection string

MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');

        const db = client.db('your-database-name'); // replace with your actual database name

        // Import your routes here, after establishing the database connection
        const userRouter = require('./routes/userRoutes')(db);
        const channelRouter = require('./routes/channelRoutes')(db);
        const taskRouter = require('./routes/taskRoutes')(db);
        const messageRouter = require('./routes/messageRoutes');

        app.use(cors());
        app.use(express.json());

        app.use('/api/users', userRouter);
        app.use('/api/channels', channelRouter);
        app.use('/api/tasks', taskRouter);
        app.use('/api/messages', messageRouter);

        app.get('/', (req, res) => {
            res.send('Hello, world!');
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(error => console.error(error));
