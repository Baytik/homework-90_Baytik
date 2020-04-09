import React, {Component} from 'react';
import './Login.css';
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/userLogAction";

class Login extends Component {

    state = {
        username: '',
        password: '',
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};

    loginUserHandler = async () => {
        const User = {
            username: this.state.username,
            password: this.state.password
        };
        await this.props.loginUser(User);
    };

    render() {
        return (
            <div className="login">
                <p>Login</p>
                <div>
                    <input type="text" placeholder="Enter your email" name="username" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="password" placeholder="Enter your password" name="password" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <button onClick={this.loginUserHandler}>Login</button>
                </div>
                <div>
                    {this.props.loginError && (
                        <h5 className="error">{this.props.loginError.error}</h5>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginError: state.user.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
