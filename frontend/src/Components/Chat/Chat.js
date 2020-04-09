import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import ChatMenu from "./ChatMenu";

class Chat extends Component {
    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div className="chat">
                <ChatMenu/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(Chat);