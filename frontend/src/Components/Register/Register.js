import React, {Component} from 'react';
import './Register.css';
import {connect} from "react-redux";
import {postRegister} from "../../store/actions/userLogAction";

class Register extends Component {

    state = {
        username: '',
        password: ''
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};

    newUser = async () => {
            const User = {
                username: this.state.username,
                password: this.state.password
            };
            await this.props.postRegister(User);
    };

    render() {
        return (
            <div className="register">
                <p>Register</p>
                <div>
                    <input type="text" placeholder="Write email" name="username" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write password" name="password" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <button onClick={this.newUser}>Register</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postRegister: (user) => dispatch(postRegister(user)),
});

export default connect(null, mapDispatchToProps)(Register);