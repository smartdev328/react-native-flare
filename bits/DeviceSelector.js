import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginBottom: 64,
    },
    target: {
        width: 280,
        height: 280,
        borderRadius: 280 / 2,
        borderWidth: 4,
    },
    targetNoDevice: {
        borderColor: '#000000',
    },
    targetHasDevice: {
        borderColor: '#E0E0E0',
    },
    targetNoDeviceContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetHasDeviceContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    device: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    hasDevice: {

    },
});

export default class DeviceSelector extends React.Component {
    constructor(props) {
        super(props);

        const availableDevices = props.availableDevices || [];
        const currentDevice = availableDevices.length > 0 ? availableDevices[0] : null;

        this.state = {
            currentDevice,
            availableDevices,
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[styles.target, this.state.currentDevice ? styles.targetNoDevice : styles.targetHasDevice]}
                >
                    {!this.state.currentDevice &&
                        <View style={styles.targetNoDeviceContent}>
                            <Icon name="plus" size={30} color="#000000" />
                        </View>
                    }
                    {this.state.currentDevice &&
                        <View style={styles.targetHasDeviceContent}>
                            <Image
                                source={require('../assets/cuff_v1.png')}
                                style={styles.device}
                            />
                            <Text>
                                CUFF V1
                            </Text>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
