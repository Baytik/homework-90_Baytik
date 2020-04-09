import React, {useEffect, useRef, useState} from 'react';
import './Chat.css';
import {useDispatch, useSelector} from "react-redux";

const ChatMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const users = useSelector(state => state.messages.loggedInUsers);
    const messages = useSelector(state => state.messages.messages);

    const [message, setMessage] = useState('');
    const ws = useRef({});

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/chat?token=${user.token}`);

        ws.current.onmessage = (msg) => {
            dispatch(JSON.parse(msg.data))
        };

        return () => {
            ws.current.close();
        }
    }, [user, dispatch]);

    const sendMessage = () => {
      ws.current.send(JSON.stringify({
          type: 'NEW_MESSAGE',
          text: message
      }))
    };

    return (
        <div className="chat-menu">
            <div className="online-users">
                <h3>Online users</h3>
                {users.map(username => (
                    <p key={username}>{username}</p>
                ))}
            </div>
            <div className="message">
                <div className="messages">
                    <h3>Chat room</h3>
                    {messages.map(mes => (
                        <p key={mes._id}>
                            {mes.user.username}:
                            <span>
                                {mes.text}
                            </span>
                        </p>
                    ))}
                </div>
                <div className="post-message">
                    <input type="text" name='message' value={message}
                           onChange={e => setMessage(e.target.value)}
                           placeholder="Enter message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatMenu;