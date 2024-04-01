const express = require('express');
const app = express();
const port = process.env.PORT ||3000;

const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware(s)
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`App/Server listening on port ${port}...`);
        });
    } catch (err) {
        console.log(`There's an error : ${err}`);
    };
}

start();



