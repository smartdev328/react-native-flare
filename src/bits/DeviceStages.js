import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import DeviceStageList from './DeviceStageList';
import Strings from '../locales/en';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
    },
});

class DeviceStages extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                {this.props.stages.map((stage, index) => (
                    <DeviceStageList
                        key={stage}
                        title={Strings.manufacturing.stages[stage]}
                        deviceCounts={this.props.deviceCounts && this.props.deviceCounts[stage]}
                        color={Colors.sequence[index]}
                    />
                ))}
            </View>
        );
    }
}

export default DeviceStages;
