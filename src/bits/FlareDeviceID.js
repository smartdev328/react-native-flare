import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { DEVICE_ID_LABEL_LENGTH } from '../constants';

export default class FlareDeviceID extends React.PureComponent {
    render() {
        const { value } = this.props;
        const rawHex = value.toString(16);
        const paddingRequired = DEVICE_ID_LABEL_LENGTH - rawHex.length;
        const display = `${'0'.repeat(paddingRequired)}${rawHex}`.toUpperCase();
        return (
            <Text {...this.props}>{display}</Text>
        );
    }
}

FlareDeviceID.propTypes = {
    value: PropTypes.number.isRequired,
};

