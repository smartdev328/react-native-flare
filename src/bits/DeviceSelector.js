import React from 'react';
// import CodeInput from 'react-native-confirmation-code-input';
import Icon from 'react-native-vector-icons/Entypo';
import {
 ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native';

import Colors from './Colors';
import { DeviceTypes } from './DeviceConstants';
import Strings from '../locales/en';
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

export default class DeviceSelector extends React.Component {
    constructor(props) {
        super(props);

        const availableDevices = props.devices || [];
        const currentDevice = availableDevices.length > 0 ? availableDevices[0] : null;

        this.state = {
            currentDevice,
            addingDevice: false,
        };
    }

    onPressAddDevice() {
        this.setState({
            addingDevice: true,
        });
        console.log(`Current device: ${this.state.currentDevice}`);
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[styles.target, this.state.currentDevice ? styles.targetNoDevice : styles.targetHasDevice]}
                >
                    {!this.state.currentDevice && (
                        <TouchableOpacity style={styles.fullSize} onPressOut={() => this.onPressAddDevice()}>
                            {!this.state.addingDevice && <Icon name="plus" size={30} color={Colors.theme.cream} />}
                            {this.state.addingDevice && (
                                <View style={styles.fullSize}>
                                    <Text>{Strings.deviceSelector.enterDeviceCodePrompt}</Text>
                                    {this.state.errorAddingDevice && (
                                        <Text>{Strings.deviceSelector.errorAddingDevice}</Text>
                                    )}
                                    {/* <CodeInput
                                        ref={(c) => {
                                            this.deviceInputField = c;
                                        }}
                                        inputPosition="full-width"
                                        containerStyle={{ height: '100%' }}
                                        secureTextEntry={false}
                                        codeLength={6}
                                        onFulfill={deviceID => this.props.addDevice(deviceID)}
                                    /> */}
                                    {this.props.claimingDevice && <ActivityIndicator color={Colors.white} />}
                                    {this.props.claimingDeviceFailure && (
                                        <Text>{this.props.claimingDeviceFailure}</Text>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    {this.state.currentDevice && !this.state.addingDevice && (
                        <View>
                            <Image
                                source={DeviceTypes[this.state.currentDevice.type - 1].image}
                                style={styles.deviceImage}
                            />
                            <View style={styles.children}>
                                <Text style={styles.deviceName}>
                                    {DeviceTypes[this.state.currentDevice.type - 1].name}
                                </Text>
                                {this.props.children}
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
