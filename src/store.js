import {combineReducers, createStore} from "@reduxjs/toolkit";
import PostSlice from "./Slices/PostSlice";
import {  applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storySlice from "./Slices/storySlice";
import userSlice from "./Slices/userSlice";

let reducers = combineReducers({
    PostSlice,
    storySlice,
    userSlice
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(
    applyMiddleware(thunkMiddleware)

));
export default store