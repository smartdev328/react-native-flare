import * as React from 'react';
import { useSelector } from 'react-redux';

import Bluetooth from './Bluetooth';
import Confirm from './Confirm';
import Manual from './Manual';

const Selector = props => {
    const { method, device } = useSelector(
        ({
            user: {
                reg: { preferredPairing, foundDevice },
            },
        }) => ({
            method: preferredPairing,
            device: foundDevice,
        })
    );

    if (method === 'manual') {
        return <Manual {...props} />;
    } else if (device) {
        return <Confirm device={device} />;
    } else {
        return <Bluetooth {...props} />;
    }
};

export default Selector;
