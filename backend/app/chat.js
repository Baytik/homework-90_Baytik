const User = require('../models/User');
const Message = require('../models/Chat');

const connectedClients = {};

const chat = async (ws, req) => {
    const token = req.query.token;
    const user = await User.findOne({token});
    if (!user) {
        return ws.close();
    }
    connectedClients[user._id] = {user, ws};

    const messages = await Message.find().sort({datetime: -1}).limit(30);
    ws.send(JSON.stringify({
        type: 'LATEST_MESSAGES',
        messages: messages
    }));

    const i = setInterval(() => {
        ws.send('Hello');
    }, 2000);

    ws.on('close', () => {
        clearInterval();
    })
};

module.exports = chat;