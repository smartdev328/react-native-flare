import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class FlareDate extends React.PureComponent {
    render() {
        const { timestamp } = this.props;
        const actualDate = moment(timestamp);
        const diff = moment().diff(actualDate, 'hours');
        const display = diff > 6 ? actualDate.format('l LTS') : actualDate.fromNow();

        return (
            <Text>{display}</Text>
        );
    }
}

FlareDate.propTypes = {
    timestamp: PropTypes.string.isRequired,
};

