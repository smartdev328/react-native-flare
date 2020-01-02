import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

export const nav = (state = initialState.nav, action = {}) => {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root,
            });

        default:
            return state;
    }
};
