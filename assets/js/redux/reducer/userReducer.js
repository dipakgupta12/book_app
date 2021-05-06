import {
    ERRORS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    SIGNIN_FAILURE,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_RESET,
    SIGNUP_SUCCESS,
} from "../constants/constant";

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case SIGNIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case SIGNUP_RESET:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case SIGNUP_FAILURE:
        case SIGNIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.type,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
export const loaduserReducer = (state = { userDetails: {} }, action) => {

    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userDetails: action.payload,
            };

        case GET_USER_FAILURE:
            return {
                loading: false,
                isAuthenticated: false,
                userDetails: null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userDetails: null
            }

        case ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};