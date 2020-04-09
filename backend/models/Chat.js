const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;