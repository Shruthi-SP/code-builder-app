import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import codesReducer from "../reducers/codesReducer";
import userReducer from "../reducers/userReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        codes: codesReducer,
        user: userReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore