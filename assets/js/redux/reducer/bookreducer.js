import {
    ADDBOOK_FAILURE,
    ADDBOOK_REQUEST,
    ADDBOOK_RESET,
    ADDBOOK_SUCCESS,

    DELETE_FAIL,

    DELETE_REQUEST,

    DELETE_SUCCESS,

    ERRORS,
    LOAD_BOOK_FAILURE,
    LOAD_BOOK_REQUEST,
    LOAD_BOOK_SUCCESS,
    UPDATE_FAIL,
    UPDATE_REQUEST,
    UPDATE_RESET,
    UPDATE_SUCCESS,

} from "../constants/bookConstants";
import { LOGOUT_SUCCESS } from "../constants/constant";

export const bookReducer = (state = { books: {} }, action) => {
    switch (action.type) {
        case ADDBOOK_REQUEST:
            return {
                loading: true,
            };

        case ADDBOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                books: action.payload,
            };
        case ADDBOOK_RESET:
            return {
                ...state,
                isSuccess: false,
            };
        case ADDBOOK_FAILURE:
            return {
                ...state,
                isSuccess: false,
                books: null,
                error: action.type,
            };

        case ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const loadBookReducer = (state = { loadAllBook: [] }, action) => {
    switch (action.type) {
        case LOAD_BOOK_REQUEST:
            return {
                loading: true,
                loadAllBook: []
            }

        case LOAD_BOOK_SUCCESS:
            return {
                loading: false,
                loadAllBook: action.payload,
            }

        case LOAD_BOOK_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loadAllBook: null,
            }

        case ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const updateBookReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_REQUEST:
        case DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case UPDATE_FAIL:
        case DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}