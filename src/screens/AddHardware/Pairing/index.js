import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Bluetooth from './Bluetooth';
import Confirm from './Confirm';
import Manual from './Manual';
import { claimDevice } from '../../../actions';
import { checkLocationsPermission } from '../../../actions/userActions';
import { startBleListening } from '../../../actions/hardwareActions';

const Pairing = ({ nextPage, ...props }) => {
    const dispatch = useDispatch();
    const { busy, finished, authToken, method, device } = useSelector(
        ({
            user: {
                claimingDevice,
                claimedDevice,
                authToken: stateAuthToken,
                reg: { preferredPairing, foundDevice },
            },
        }) => ({
            busy: claimingDevice,
            finished: !!claimedDevice,
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
            dispatch(claimDevice(authToken, deviceId, secondFactor));
        },
        [dispatch, authToken]
    );

    React.useEffect(() => {
        dispatch(startBleListening());
        dispatch(checkLocationsPermission());
    }, [dispatch]);

    React.useEffect(() => {
        if (finished) {
            nextPage();
        }
    }, [finished, nextPage]);

    if (method === 'manual') {
        return <Manual {...props} busy={busy} submit={submit} />;
    } else if (device) {
        return (
            <Confirm {...props} device={device} busy={busy} submit={submit} />
        );
    } else {
        return <Bluetooth {...props} busy={busy} submit={submit} />;
    }
};

export default Pairing;
