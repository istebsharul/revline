import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    LOAD_FAILURE,
    LOAD_SUCCESS,
} from '../Constants/userConstants';

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:{
            return{
                ...state,
                user: action.payload,
                error: null,
                isAuthenticated: true,
            }
        }
        case LOAD_FAILURE:
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
                isAuthenticated: false,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
                isAuthenticated: false,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                error: null,
                isAuthenticated: false,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                // You might want to handle the success scenario differently,
                // such as displaying a message to the user.
                // For example, you could set user to null and error to a success message.
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;