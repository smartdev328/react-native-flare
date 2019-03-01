import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function beacons(state = initialState.beacons, action = {}) {
    switch (action.type) {
    case types.BEACON_RECEIVED:
        return state.replace({
            latest: action.beacon,
        });

    case types.BEACON_HANDLING_FAILED: {
        const problems = state.problems ?
            state.problems.concat({
                beacon: action.beacon,
                position: action.position,
            }) : null;
        return state.merge({
            problems,
        });
    }

    case types.BEACON_COUNTS_RESET:
        return state.merge({
            recentShortPressCounts: [],
        });

    case types.BEACON_COUNTS_UPDATED:
        return state.merge({
            recentShortPressCounts: action.shortPressCounts,
        });

    /**
     * Remove all "problem" beacons with the given UUID, timestamp and retry counter values.
     */
    case types.CLEAR_PROBLEM_BEACONS: {
        // Create a copy of the problems queue that does not include the beacons
        // specified in the redux action.
        const updatedProblems = state.problems.filter((problem) => {
            // For each item in the problem beacon queue...
            const { uuid, timestamp, retry } = problem.beacon;

            // ...loop through all the beacons listed in the redux action.
            // Find the first beacon to clear that matches the problem beacon.
            const matches = action.beaconsToClear.find(toClear =>
                toClear.uuid === uuid &&
                toClear.timestamp === timestamp &&
                (typeof retry === 'undefined' || toClear.retry <= retry));

            // Only keep the beacon in the problem queue if we did NOT find it
            // in the redux action list.
            return typeof matches === 'undefined';
        });

        return state.merge({
            problems: updatedProblems,
        });
    }

    case types.MANUFACTURING_BEACON_REQUEST:
        return state.replace({
            sendingManufacturingBeacon: true,
        });

    case types.MANUFACTURING_BEACON_SUCCESS:
        return state.replace({
            sendingManufacturingBeacon: false,
            deviceCounts: action.deviceCounts,
        });

    case types.MANUFACTURING_BEACON_FAILURE:
        return state.replace({
            sendingManufacturingBeacon: false,
        });

    default:
        return state;
    }
}
