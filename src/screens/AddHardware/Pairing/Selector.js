import * as React from 'react';
import { useSelector } from 'react-redux';

import Bluetooth from './Bluetooth';
import Manual from './Manual';

const Selector = props => {
    const method = useSelector(
        ({
            user: {
                reg: { preferredPairing },
            },
        }) => preferredPairing
    );

    if (method === 'manual') {
        return <Manual {...props} />;
    } else {
        return <Bluetooth {...props} />;
    }
};

export default Selector;
