import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from './Colors';
import DeviceStageListItem from './DeviceStageListItem';
import Type from './Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.greyLight,
    },
    titleArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.greyLight,
    },
    titleText: {
        fontSize: Type.size.medium,
        textAlign: 'center',
        color: Colors.white,
    },
    listArea: {
        flex: 15,
    },
});

export default class DeviceStageList extends React.PureComponent {
    // Sort device list items by descending timestamp and descending number of beacons
    static compareDeviceListItems(a, b) {
        // primary sort by timestamp
        if (a.lastBeacon < b.lastBeacon) {
            return -1;
        } else if (a.lastBeacon > b.lastBeacon) {
            return 1;
        }

        // beacon count is secondary
        if (a.count > b.count) {
            return -1;
        } else if (a.count < b.count) {
            return 1;
        }

        // all things equal
        return 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.titleArea, { backgroundColor: this.props.color }]}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={styles.listArea}>
                    <FlatList
                        data={this.props.deviceCounts && this.props.deviceCounts.asMutable().sort((a, b) => DeviceStageList.compareDeviceListItems(a, b))}
                        renderItem={({ item }) => (
                            <DeviceStageListItem
                                id={item.device_id}
                                count={item.count}
                                lastBeacon={item.timestamp}
                                color={this.props.color}
                            />
                        )}
                        keyExtractor={item => `${item.timestamp}-${item.id}`}
                        refreshing={false}
                        ref={(ref) => { this.flatList = ref; }}
                    />
                </View>
            </View>
        );
    }
}
