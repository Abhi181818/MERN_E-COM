import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
// import { productReducer } from './reducers/productReducer';
const reducer = combineReducers({
    // products: productReducer,
});

let initialState = {};
const store = createStore(reducer, initialState, applyMiddleware(thunk));


export default store;
