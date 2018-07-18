/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from '../reducers/index';

let middleware = [thunk];

if (__DEV__) {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

const reducer = combineReducers(reducers);

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(...middleware),
    );
}
