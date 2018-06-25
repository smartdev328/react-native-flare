import React from 'react';
import CodeInput from 'react-native-confirmation-code-input';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginBottom: 64,
    },
    target: {
        width: 280,
        height: 280,
        maxHeight: 280,
        borderRadius: 280 / 2,
        borderWidth: 4,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetNoDevice: {
        borderColor: '#000000',
    },
    targetHasDevice: {
        borderColor: '#E0E0E0',
    },
    targetNoDeviceContent: {
    },
    targetHasDeviceContent: {
    },
    device: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
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

        const availableDevices = props.availableDevices || [];
        const currentDevice = availableDevices.length > 0 ? availableDevices[0] : null;

        this.state = {
            currentDevice,
            availableDevices,
            addingDevice: false,
            errorAddingDevice: false,
        };
    }

    onPressAddDevice() {
        this.setState({
            addingDevice: true,
        });
        console.log(`Current device: ${this.state.currentDevice}`);
    }

    async addDevice(deviceID) {
        await this.props.addDevice(deviceID)
            .then(() => {
                this.setState({
                    addingDevice: false,
                });
            })
            .catch(() => {
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
                                source={require('../assets/cuff_v1.png')}
                                style={styles.device}
                            />
                            <Text>
                                {Strings.jewelry.cuffV1.name}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
