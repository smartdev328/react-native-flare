import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FlareDeviceID from './FlareDeviceID';
import FlareDate from './FlareDate';
import Spacing from './Spacing';
import Strings from '../locales/en';
import Type from './Type';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: Spacing.medium,
        paddingHorizontal: Spacing.small,
    },
    top: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
    },
    bottom: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    topDeviceLabelArea: {
        flex: 8,
    },
    topDeviceLabelText: {
        fontSize: Type.size.large,
    },
    topDeviceCountArea: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: Colors.greyLight,
    },
    topDeviceCountText: {
        textAlign: 'center',
        color: Colors.white,
        fontWeight: 'bold',
        padding: Spacing.tiny,
    },
    bottomDeviceIDArea: {
        flex: 1,
    },
    bottomTimestampArea: {
        flex: 2,
    },
    bottomTimestampText: {
        textAlign: 'right',
    },
});

function DeviceStageListItem(props) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topDeviceLabelArea}>
                    <Text style={styles.topDeviceLabelText}>
                        {FlareDeviceID.getJewelryLabelFromDeviceID(props.id)}
                    </Text>
                </View>
                <View
                    style={[
                        styles.topDeviceCountArea,
                        { backgroundColor: props.color },
                    ]}
                >
                    <Text style={styles.topDeviceCountText}>{props.count}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomDeviceIDArea}>
                    <Text>
                        {Strings.generic.idPrefix}
                        {props.id}
                    </Text>
                </View>
                <View style={styles.bottomTimestampArea}>
                    <FlareDate
                        elapsed
                        style={styles.bottomTimestampText}
                        timestamp={props.lastBeacon}
                    />
                </View>
            </View>
        </View>
    );
}

export default DeviceStageListItem;
