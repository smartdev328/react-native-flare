import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Bluetooth from './Bluetooth';
import Confirm from './Confirm';
import Manual from './Manual';
import { changeAppRoot, claimDevice } from '../../../actions';

const Selector = props => {
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
        (deviceId, secondFactor) => {
            dispatch(claimDevice(authToken, deviceId, secondFactor));
        },
        [dispatch, authToken]
    );

    React.useEffect(() => {
        if (finished) {
            dispatch(changeAppRoot('secure'));
        }
    }, [finished, dispatch]);

    if (method === 'manual') {
        return <Manual {...props} busy={busy} submit={submit} />;
    } else if (device) {
        return (
            <Confirm {...props} device={device} busy={busy} submit={submit} />
        );
    } else {
        return <Bluetooth {...props} />;
    }
};

export default Selector;
