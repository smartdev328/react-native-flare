/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from '../reducers/index';
import initialState from '../reducers/initialState';

let middleware = [thunk];

if (__DEV__) {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

const reducer = combineReducers(reducers);

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};
const persistingReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    persistingReducer,
    initialState,
    applyMiddleware(...middleware),
);

export const persistor = persistStore(store);
