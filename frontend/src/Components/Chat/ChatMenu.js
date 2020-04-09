import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

const ChatMenu = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const ws = useRef({});
    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/chat?token=${user.token}`);

        ws.current.onmessage = (msg) => {
            console.log(msg.data);
            dispatch(JSON.parse(msg.data))
        };
    }, [user]);



    return (
        <div>
            here
        </div>
    );
};

export default ChatMenu;