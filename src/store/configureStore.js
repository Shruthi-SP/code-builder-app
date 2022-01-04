import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import codeObjReducer from "../reducers/codeObjReducer";
import codesReducer from "../reducers/codesReducer";

const configureStore = () => {
    const store = createStore(combineReducers({
        codes: codesReducer,
        codeObj: codeObjReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore