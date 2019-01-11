import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { DEVICE_ID_LABEL_LENGTH } from '../constants';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Type from '../bits/Type';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.pink,
    },
    promptBackground: {
        marginBottom: Spacing.huge,
    },
    promptForeground: {
        fontSize: Type.size.medium,
        padding: Spacing.medium,
    },
    scanCodeArea: {
        flex: 4,
    },
    manualInputArea: {
        alignItems: 'stretch',
        flex: 1,
        flexDirection: 'row',
        marginBottom: Spacing.medium,
        padding: Spacing.small,
    },
    manualInputField: {
        flex: 1,
        borderWidth: 2,
        fontSize: Type.size.large,
        paddingLeft: Spacing.small,
        paddingRight: Spacing.small,
        textAlign: 'center',
    },
    buttonArea: {
        flex: 1,
        marginBottom: Spacing.small,
    },
});

export default class AddJewelryManual extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            deviceID: '',
        };
    }

    changeManualDeviceID(newDeviceID) {
        this.setState({
            deviceID: newDeviceID.replace(/[^0-9A-F]+/g, ''),
        });
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.AddJewelryManual',
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.promptBackground}>
                    <Text style={styles.promptForeground}>
                        {Strings.jewelry.addNewManual.prompt}
                    </Text>
                </View>
                <View style={styles.scanCodeArea}>
                    <Text>Placeholder for scanner</Text>
                </View>
                <View style={styles.manualInputArea}>
                    <TextInput
                        autoCapitalize="characters"
                        placeholder={Strings.jewelry.addNewManual.placeholderDeviceID}
                        style={styles.manualInputField}
                        value={this.state.deviceID}
                        onChangeText={v => this.changeManualDeviceID(v)}
                        maxLength={DEVICE_ID_LABEL_LENGTH}
                    />
                </View>
                <View style={styles.buttonArea}>
                    <Button
                        onPress={() => this.onAddThis()}
                        title={Strings.jewelry.addThisButtonLabel}
                        rounded
                        primary
                        disabled={this.state.deviceID.length !== DEVICE_ID_LABEL_LENGTH}
                    />
                </View>
            </View>
        );
    }
}
