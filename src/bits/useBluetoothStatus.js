import * as React from 'react';
import RNBluetoothInfo from '@bitfly/react-native-bluetooth-info';

const useBluetoothStatus = () => {
    const [state, setState] = React.useState('');
    React.useEffect(() => {
        const handler = ({ type: { connectionState } }) =>
            setState(connectionState);
        RNBluetoothInfo.getCurrentState().then(handler);
        RNBluetoothInfo.addEventListener('change', handler);
        return () => RNBluetoothInfo.removeEventListener('change', handler);
    }, []);

    return state;
};

export default useBluetoothStatus;
