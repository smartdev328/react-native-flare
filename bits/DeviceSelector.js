import React from 'react';
import CodeInput from 'react-native-confirmation-code-input';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

import Colors from './Colors';
import { DeviceTypes } from './DeviceConstants';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
    },
    target: {
        width: 280,
        height: 280,
        maxHeight: 280,
        borderRadius: 280 / 2,
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetNoDevice: {
        borderColor: Colors.theme.orangeLight,
        backgroundColor: Colors.theme.purpleTransparent,
    },
    targetHasDevice: {
        borderColor: '#E0E0E0',
    },
    targetNoDeviceContent: {
    },
    targetHasDeviceContent: {
    },
    deviceImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    deviceName: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.white,
    },
    hasDevice: {
    },
    fullSize: {
        height: 280,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class DeviceSelector extends React.Component {
    constructor(props) {
        super(props);

        const availableDevices = props.devices || [];
        const currentDevice = availableDevices.length > 0 ? availableDevices[0] : null;

        this.state = {
            currentDevice,
            availableDevices,
            addingDevice: false,
            errorAddingDevice: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const availableDevices = nextProps.devices || [];
        const currentDevice = availableDevices.length > 0 ? availableDevices[0] : null;
        this.setState({
            availableDevices,
            currentDevice,
        });
    }

    onPressAddDevice() {
        this.setState({
            addingDevice: true,
        });
        console.log(`Current device: ${this.state.currentDevice}`);
    }

    async addDevice(deviceID) {
        await this.props.addDevice(deviceID)
            .then((response) => {
                this.setState({
                    addingDevice: false,
                    availableDevices: response.devices,
                    currentDevice: response.devices[0],
                });
            })
            .catch(() => {
                this.deviceInputField.clear();
                this.setState({
                    errorAddingDevice: true,
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[
                        styles.target,
                        this.state.currentDevice ? styles.targetNoDevice : styles.targetHasDevice,
                    ]}
                >
                    {!this.state.currentDevice &&
                        <TouchableOpacity
                            style={styles.fullSize}
                            onPressOut={() => this.onPressAddDevice()}
                        >
                            {!this.state.addingDevice &&
                                <Icon name="plus" size={30} color="#000000" />
                            }
                            {this.state.addingDevice &&
                                <View style={styles.fullSize}>
                                    <Text>{Strings.deviceSelector.enterDeviceCodePrompt}</Text>
                                    {this.state.errorAddingDevice &&
                                        <Text>{Strings.deviceSelector.errorAddingDevice}</Text>
                                    }
                                    <CodeInput
                                        ref={(c) => { this.deviceInputField = c; }}
                                        inputPosition="full-width"
                                        containerStyle={{height: '100%'}}
                                        secureTextEntry={false}
                                        codeLength={6}
                                        onFulfill={deviceID => this.addDevice(deviceID)}
                                    />
                                </View>
                            }
                        </TouchableOpacity>
                    }
                    {this.state.currentDevice && !this.state.addingDevice &&
                        <View style={styles.targetHasDeviceContent}>
                            <Image
                                source={DeviceTypes[this.state.currentDevice.type - 1].image}
                                style={styles.deviceImage}
                            />
                            <Text style={styles.deviceName}>
                                {Strings.jewelry.cuffV1.name}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
