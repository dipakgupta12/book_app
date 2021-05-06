import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, loaduserReducer } from "./reducer/userReducer";
import { bookReducer, loadBookReducer, updateBookReducer } from "./reducer/bookreducer";


const reducer = combineReducers({
    users: authReducer,
    getLoginUser: loaduserReducer,
    addedBook: bookReducer,
    loadBooks: loadBookReducer,
    updateBook: updateBookReducer
});

let initialState = {

}

const middlware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
