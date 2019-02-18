import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import moment from 'moment';

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

function makeRandomDevice() {
    return {
        id: Math.floor(Math.random() * 1024),
        count: Math.floor(Math.random() * 10),
        lastBeacon: moment().utc().subtract(Math.floor(Math.random() * 12), 'hours'),
    };
}

function getDeviceList() {
    const count = Math.floor(Math.random() * 10);
    const list = [];
    for (let i = 0; i < count; i += 1) {
        list.push(makeRandomDevice());
    }
    return list;
}

class DeviceStages extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                {this.props.stages.map((stage, index) => (
                    <DeviceStageList
                        key={stage}
                        title={Strings.manufacturing.stages[stage]}
                        devices={getDeviceList()}
                        color={Colors.sequence[index]}
                    />
                ))}
            </View>
        );
    }
}

export default DeviceStages;
