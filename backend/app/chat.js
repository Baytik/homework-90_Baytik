const User = require('../models/User');
const Message = require('../models/Chat');

const connectedClients = {};

const forEachConnectedClient = cb => {
  Object.keys(connectedClients).forEach(key => {
      const client = connectedClients[key];
      cb(client)
  })
};

const updateConnectedList = () => {
    forEachConnectedClient(client => {

        client.ws.send(JSON.stringify({
            type: 'LOGGED_IN_USERS',
            users: Object.keys(connectedClients).map(key => connectedClients[key].user.username)
        }));
    });
};

const chat = async (ws, req) => {
    const token = req.query.token;
    const user = await User.findOne({token});
    if (!user) {
        return ws.close();
    }
    connectedClients[user._id] = {user, ws};

    const messages = await Message.find().sort({datetime: -1}).limit(30).populate('user');
    ws.send(JSON.stringify({
        type: 'LATEST_MESSAGES',
        messages: messages
    }));

    updateConnectedList();

    ws.on('message', async msg => {
       const parsed = JSON.parse(msg);
        switch (parsed.type) {
            case 'NEW_MESSAGE':
              const message = await Message.create({
                  user: user,
                  text: parsed.text
              });
              forEachConnectedClient(client => {
                  client.ws.send(JSON.stringify({
                      type: 'NEW_MESSAGE',
                      message
                  }))
              });
              break;
            default:
                console.log('No such type', parsed.type)
        }
    });

    ws.on('close', () => {
        delete connectedClients[user._id];
        updateConnectedList();
    })
};

module.exports = chat;