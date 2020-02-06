import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Bluetooth from './Bluetooth';
import Confirm from './Confirm';
import Manual from './Manual';
import { claimDevice } from '../../../actions';
import { checkLocationsPermission } from '../../../actions/userActions';
import { startBleListening } from '../../../actions/hardwareActions';
import { resetClaim } from '../../../actions/deviceActions';
import { setPreferredPairingMethod } from '../../../actions/regActions';

const Pairing = ({ nextPage, ...props }) => {
    const dispatch = useDispatch();
    const { busy, finished, error, authToken, method, device } = useSelector(
        ({
            user: {
                claimingDevice,
                claimedDevice,
                claimingDeviceFailure,
                authToken: stateAuthToken,
                reg: { preferredPairing, foundDevice },
            },
        }) => ({
            busy: claimingDevice,
            finished: !!claimedDevice,
            error: claimingDeviceFailure,
            method: preferredPairing,
            device: foundDevice,
            authToken: stateAuthToken,
        })
    );
    const submit = React.useCallback(
        ({ deviceId, secondFactor }) => {
            if (
                typeof deviceId !== 'number' ||
                typeof secondFactor !== 'string' ||
                secondFactor.length !== 3
            ) {
                return;
            }
            dispatch(
                claimDevice(authToken, deviceId, secondFactor.toUpperCase())
            );
        },
        [dispatch, authToken]
    );
    const reset = React.useCallback(() => {
        dispatch(resetClaim());
    }, [dispatch]);

    const switchToManual = React.useCallback(() => {
        dispatch(setPreferredPairingMethod('manual'));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(startBleListening());
        dispatch(checkLocationsPermission());
    }, [dispatch]);

    React.useEffect(() => {
        if (finished) {
            nextPage();
        }
    }, [finished, nextPage]);

    const pairingProps = { ...props, busy, submit, reset, error };

    if (method === 'manual') {
        return <Manual {...pairingProps} />;
    } else if (device) {
        return <Confirm {...pairingProps} device={device} />;
    } else {
        return <Bluetooth {...props} switchToManual={switchToManual} />;
    }
};

export default Pairing;
