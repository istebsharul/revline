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
    message: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null,
                message: null,
            };
        case LOAD_FAILURE:
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload,
                message: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: null,
                message: 'Successfully logged out',
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload,
                message: null,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null,
                message: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
