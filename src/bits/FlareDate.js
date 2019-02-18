import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class FlareDate extends React.PureComponent {
    render() {
        const { timestamp } = this.props;
        const actualDate = moment(timestamp);

        let display = '';
        if (this.props.elapsed) {
            display = actualDate.fromNow();
        } else {
            const diff = moment().diff(actualDate, 'hours');
            display = diff > 6 ? actualDate.format('l LTS') : actualDate.fromNow();
        }

        return (
            <Text style={this.props.style}>{display}</Text>
        );
    }
}

FlareDate.propTypes = {
    timestamp: PropTypes.string.isRequired,
};

