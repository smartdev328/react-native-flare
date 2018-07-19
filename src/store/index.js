/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from '../reducers/index';

let middleware = [thunk];

if (__DEV__) {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

const persistConfig = {
    key: 'user',
    storage,
    stateReconciler: autoMergeLevel2,
};
const combinedReducer = persistCombineReducers(persistConfig, reducers);

// eslint-disable-next-line
export function configureStore(initialState) {
    const enhancer = compose(applyMiddleware(...middleware));
    return createStore(
        combinedReducer,
        initialState,
        enhancer,
    );
}
