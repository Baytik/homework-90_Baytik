const express = require('express');
const cors = require('cors');
const expressWs = require('express-ws');
const {nanoid} = require('nanoid');

const app = express();
expressWs(app);
const port = 8001;

app.use(express.json());
app.use(cors());

let connections = {};
let paintsData = [];

app.ws('/canvas', (ws, req) => {
    const id = nanoid();
    console.log('client connected=', id);
    connections[id] = ws;
    console.log('Total clients connected ' + Object.keys(connections).length);

    ws.on('message', (msg) => {

        let decodedMessage;
        try {
            decodedMessage = JSON.parse(msg);
        } catch (e) {
            return ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Message is not JSON'
            }))
        }

        switch (decodedMessage.type) {
            case 'PIXEL_ARRAY':
                paintsData = paintsData.concat(decodedMessage.array);
                Object.values(connections).forEach(client => {
                    client.send(JSON.stringify({
                        type: 'NEW_ARRAY',
                        array: paintsData
                    }))
                });
                break;

            default:
                return ws.send(JSON.stringify({
                    type: 'ERROR',
                    message: 'Unknown message type'
                }));
        }

        Object.keys(connections).forEach(connectionId => {
            const connection = connections[connectionId];
            paintsData.push(JSON.parse(msg));
            connection.send(JSON.stringify(paintsData));
            console.log(paintsData)
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