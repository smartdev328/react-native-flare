import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

export const nav = (state = initialState.nav, action = {}) => {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root,
            });

        case types.SET_ROOT_COMPONENT:
            return state.merge({ rootComponentId: action.componentId });

        default:
            return state;
    }
};
