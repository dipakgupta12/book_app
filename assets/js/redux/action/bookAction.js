import axios from "axios";
import {
    ERRORS,
    ADDBOOK_REQUEST,
    ADDBOOK_SUCCESS,
    ADDBOOK_FAILURE,
    LOAD_BOOK_REQUEST,
    LOAD_BOOK_SUCCESS,
    LOAD_BOOK_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAIL
} from "../constants/bookConstants";

export const addBook = (bookdata, token) => async (dispatch) => {
    try {
        dispatch({ type: ADDBOOK_REQUEST });

        const { data } = await axios.post(
            "/rest-api/my-books/", bookdata, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        );

        dispatch({
            type: ADDBOOK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADDBOOK_FAILURE,
            payload: error.response.data.message,
        });
    }
};
// Load Books
export const loadAllBooks = (token) => async (dispatch) => {
    console.log("LOAD BOOK CALLED")
    try {
        dispatch({ type: LOAD_BOOK_REQUEST });

        const { data } = await axios.get("/rest-api/my-books/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: LOAD_BOOK_SUCCESS,
            payload: data,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: LOAD_BOOK_FAILURE,
            payload: error.response.data.message,
        });
    }
};
// Delete Books
export const deleteBook = (token, id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REQUEST })

        const { data } = await axios.delete(`/rest-api/my-books/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({
            type: DELETE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update book
export const updateBook = (id, formData, token) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_REQUEST })

        const { data } = await axios.patch(`/rest-api/my-books/${id}/`, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        dispatch({
            type: UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}
// Clear Errors
export const Errors = () => async (dispatch) => {
    dispatch({
        type: ERRORS,
    });
};
