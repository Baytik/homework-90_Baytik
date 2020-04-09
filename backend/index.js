const express = require('express');
const cors = require('cors');
const expressWs = require('express-ws');
const mongoose = require('mongoose');
const config = require('./config');
const users = require('./app/users');
const chat = require('./app/chat');

const app = express();
const port = 8000;
expressWs(app);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/users', users);
  app.ws('/chat', chat);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});