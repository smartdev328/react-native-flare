import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// import Immutable from 'seamless-immutable';

// eslint-disable-next-line import/prefer-default-export
export function beacons(state = initialState.beacons, action = {}) {
    switch (action.type) {
    case types.BEACON_RECEIVED:
        return state.merge({
            latest: action.beacon,
        });
    case types.BEACON_HANDLING_FAILED: {
        const problems = state.problems.concat(action.beacon);
        console.log(`Problem list now ${JSON.stringify(problems)}`);
        return state.merge({
            problems,
        });
    }

    default:
        return state;
    }
}
