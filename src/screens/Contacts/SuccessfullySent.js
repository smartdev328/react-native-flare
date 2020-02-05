import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

import SuccessAnimation from '../SuccessAnimation';
import paperAirplane from '../../assets/lotties/paper-airplane';

const SuccessfullySent = ({ componentId }) => {
    const finish = React.useCallback(() => {
        Navigation.pop(componentId);
    }, [componentId]);

    return (
        <SuccessAnimation
            style={StyleSheet.absoluteFill}
            animation={paperAirplane}
            onComplete={finish}
            size={250}
        />
    );
};

export default SuccessfullySent;
