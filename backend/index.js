const express = require('express');
const cors = require('cors');
const expressWs = require('express-ws');
const {nanoid} = require('nanoid');

const app = express();
expressWs(app);
const port = 8001;

app.use(express.json());
app.use(cors());

const connections = {};

app.ws('/canvas', (ws, req) => {
    const id = nanoid();
    console.log('client connected=', id);
    connections[id] = ws;
    console.log('Total clients connected ' + Object.keys(connections).length);

    ws.on('message', (msg) => {

        Object.keys(connections).forEach(connectionId => {
           const connection = connections[connectionId];
           connection.send(msg)
        });
    });

    ws.on('close', (msq) => {
        console.log('Client disconnected id= ', id);
        delete connections[id];
    })
});

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});