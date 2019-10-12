import React from 'react';
import {
 Image, StyleSheet, Text, View 
} from 'react-native';

import Colors from './Colors';
import { DeviceTypes } from './DeviceConstants';
import Type from './Type';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {},
    target: {
        width: 280,
        height: 280,
        maxHeight: 280,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetNoDevice: {
        borderColor: Colors.theme.cream,
        backgroundColor: Colors.theme.blueDark,
    },
    targetHasDevice: {
        borderColor: '#E0E0E0',
    },
    deviceImage: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
    },
    deviceName: {
        alignSelf: 'center',
        fontSize: Type.size.large,
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: Spacing.large,
        marginBottom: Spacing.medium,
    },
    hasDevice: {},
    fullSize: {
        height: 280,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    children: {
        position: 'absolute',
        width: 220,
        height: 220,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
    },
});

const DEFAULT_DEVICE_TYPE = 1;

export default class DeviceSelector extends React.PureComponent {
    render() {
        const { children } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.target, styles.targetHasDevice]}>
                    <View>
                        <Image source={DeviceTypes[DEFAULT_DEVICE_TYPE].image} style={styles.deviceImage} />
                        <View style={styles.children}>
                            <Text style={styles.deviceName}>{DeviceTypes[DEFAULT_DEVICE_TYPE].name}</Text>
                            {children}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
