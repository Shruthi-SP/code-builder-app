import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import codesReducer from "../reducers/codesReducer";

const configureStore = () => {
    const store = createStore(combineReducers({
        codes: codesReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore