import axios from 'axios'
import toast from 'react-hot-toast';

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    LOAD_FAILURE,
    LOAD_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS
} from '../Constants/adminConstants';

// Function to set cookie
const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/admin-auth/login', { email, password });
            const { token, user } = response.data;
            setCookie("jwt", token, 1);
            dispatch({ type: LOGIN_SUCCESS, payload: user });
            return { isLoggedIn: true };  
        } catch (error) {
            toast.error('Login Failed: ' + error.response.data.message);
            dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
        }
    };
};


export const loadAdmin = () => async (dispatch) => {
    try {
        const { data } = await axios.get(
            "http://localhost:3000/api/v1/admin-auth/profile"
        );
        // console.log("data retrieved using loadAdmin", data);
        console.log('Admin data loaded successfully');
        dispatch({ type: LOAD_SUCCESS, payload: data.admin });
    } catch (error) {
        // toast.error('Failed to load user data: ' + error.response.data.message);
        // console.log(error.data.message)
        dispatch({ type: LOAD_FAILURE, payload: error.response.data.message });
    }
};


export const signup = (name, email, password) => {
    return async (dispatch) => {
        try {
            console.log(name, email, password);
            // Simulate API call for signup

            const endpoint = 'http://localhost:3000/api/v1/admin-auth/register';

            const response = await axios.post(
                endpoint,
                { name, email, password }
            );
            console.log("Response", response);
            // toast.success('User Created Successfully');
            dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
            return { success: true, data: response.data };
        } catch (error) {
            // toast.error('Signup Failed: ' + error.message);
            dispatch({ type: SIGNUP_FAILURE, payload: error.message.data });
            return { success: false, message: error.message };
        }
    };
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get(
            "http://localhost:3000/api/v1/admin-auth/logout"
        );
        toast.success('Logout Successful');
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        toast.error('Logout Failed: ' + error.message);
        dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
};

export const forgotPassword = (email) => {
    return async (dispatch) => {
        try {
            const result = await toast.promise(
                (async () => {
                    const endpoint = 'http://localhost:3000/api/v1/admin-auth/forgot-password';
                    const response = await axios.post(endpoint, { email });
                    console.log("Response", response);

                    // Dispatch the success action
                    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });

                    // Return success status
                    return { success: true, message: response.data.message };
                })(),
                {
                    loading: 'Sending password reset email...',
                    success: 'Please check your email and click on the link to reset your password!',
                    error: 'Failed to send password reset email!',
                }
            );
            return result;
        } catch (error) {
            console.log("FP Error", error.response.data);
            dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
            return { success: false, message: error.response.data.message }
        }
    };
};

export const resetPassword = (password, token) => {
    return async (dispatch) => {
        try {
            console.log("p", password);
            console.log("token", token);

            const response = await axios.put(
                `http://localhost:3000/api/v1/admin-auth/reset-password/${token}`,
                { newPassword:password }
            );
            toast.success("Password Reset Successfully");
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
        }
    }
};
