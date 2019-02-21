import * as types from '../actions/actionTypes';
import { initialState } from './initialState';
import ManufacturingStages from '../constants/ManufacturingStages';

// eslint-disable-next-line import/prefer-default-export
export function manufacturing(state = initialState.manufacturing, action = {}) {
    switch (action.type) {
    case types.MANUFACTURING_GET_DEVICES_FAILURE:
        return state.merge({
            loading: false,
        });

    case types.MANUFACTURING_GET_DEVICES_REQUEST:
        return state.merge({
            loading: true,
        });

    case types.MANUFACTURING_GET_DEVICES_SUCCESS:
        return state.replace({
            deviceCounts: action.deviceCounts,
            loading: false,
        });

    case types.MANUFACTURING_BEACON_FAILURE:
        return state.merge({
            loading: false,
        });

    case types.MANUFACTURING_BEACON_REQUEST:
        return state.merge({
            loading: true,
        });

    case types.MANUFACTURING_BEACON_SUCCESS: {
        const deviceUpdate = action.latestDeviceUpdate;
        const updatedDeviceCounts = state.deviceCounts.asMutable();

        // remove any existing entries for the updated device
        ManufacturingStages.forEach((stage) => {
            updatedDeviceCounts[stage] = updatedDeviceCounts[stage].filter(d => d.device_id !== deviceUpdate.device_id);
        });

        // add the updated device count to the appropriate stage
        const stageName = ManufacturingStages[deviceUpdate.stage];
        const updatedStage = updatedDeviceCounts[stageName].concat(deviceUpdate);
        updatedDeviceCounts[stageName] = updatedStage;

        return state.replace({
            loading: false,
            deviceCounts: updatedDeviceCounts,
        });
    }

    default:
        return state;
    }
}
