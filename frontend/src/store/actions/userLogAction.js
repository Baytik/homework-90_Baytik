import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const errorMessage = (error) => ({type: ERROR_MESSAGE, error});

export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserError = (error) => ({type: LOGIN_USER_ERROR, error});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const postRegister = (user) => {
    return async (dispatch) => {
        try {
            await axiosAPI.post('/users', user);
            dispatch(push('/login'));
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const loginUser = user => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.post('/users/sessions', user);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginUserError(error.response.data))
        }
    }
};

export const logoutUser = () => {
    return async (dispatch, getState) =>  {
        try {
            const token = getState().user.user;
            await axiosAPI.delete('/users/sessions',{headers: {'Authorization': token.token}});
            dispatch(logoutUserSuccess());
            dispatch(push('/'));
        } catch (error) {
            dispatch(errorMessage(error));
        }
    }
};