import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { DEVICE_ID_LABEL_LENGTH, MAX_DEVICE_ID } from '../constants';

export default class FlareDeviceID extends React.PureComponent {
    static getJewelryLabelFromDeviceID(deviceID) {
        const rawHex = deviceID.toString(16);
        const paddingRequired = DEVICE_ID_LABEL_LENGTH - rawHex.length;
        return `${'0'.repeat(paddingRequired)}${rawHex}`.toUpperCase();
    }

    static isValid(deviceID) {
        if (!deviceID) {
            return false;
        }
        let valid = true;
        const cleanedID = deviceID.replace(/[^0-9A-F]+/g, '');
        if (cleanedID.length !== DEVICE_ID_LABEL_LENGTH) {
            valid = false;
        }
        const parsedID = parseInt(cleanedID, 10);
        if (parsedID < 1 || parsedID > MAX_DEVICE_ID) {
            valid = false;
        }
        return valid;
    }

    render() {
        const { value } = this.props;
        const display = FlareDeviceID.getJewelryLabelFromDeviceID(value);
        return (
            <Text {...this.props}>{display}</Text>
        );
    }
}

FlareDeviceID.propTypes = {
    value: PropTypes.number.isRequired,
};

