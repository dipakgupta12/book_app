import axios from "axios";
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
    SIGNUP_SUCCESS,
} from "../constants/constant";

// Register User
export const register = (userDetails) => async (dispatch) => {
    try {

        dispatch({ type: SIGNUP_REQUEST });

        const { response } = await axios.post("/rest-api/user-auth/", userDetails);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response,
        });

    } catch (error) {
        dispatch({
            type: SIGNUP_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// Login User
export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({
            type: SIGNIN_REQUEST,
        });

        const { data } = await axios.post("/user-auth/login/", credentials);

        dispatch({
            type: SIGNIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SIGNIN_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// Load user
export const getUserDetails = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_REQUEST });

        const { data } = await axios.get("/rest-api/my-books/profile", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: GET_USER_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// Logout user
export const logout = (refresh_token, token) => async (dispatch) => {
    try {
        const { data } = await axios.post("/user-auth/logout/", { refresh_token }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data.success,
        });


    } catch (error) {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const Errors = () => async (dispatch) => {
    dispatch({
        type: ERRORS,
    });
};
