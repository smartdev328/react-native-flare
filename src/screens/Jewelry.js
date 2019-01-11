import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { disclaimDevice } from '../actions/index';
import Button from '../bits/Button';
import FlareDeviceID from '../bits/FlareDeviceID';
import JewelryList from '../bits/JewelryList';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.medium,
    },
    buttonArea: {
        paddingTop: Spacing.small,
    },
});

// eslint-disable-next-line react/prefer-stateless-function
class Jewelry extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    addNewJewelry() {
        console.debug('Add new jewelry');
    }

    removeJewelry(deviceID) {
        this.props.dispatch(disclaimDevice(this.props.token, deviceID));
    }

    confirmRemoveJewelry(deviceID) {
        const jewelryLabel = FlareDeviceID.getJewelryLabelFromDeviceID(deviceID);
        const prompt =
            `${Strings.jewelry.removeConfirm.promptBegin}${jewelryLabel}${Strings.jewelry.removeConfirm.promptEnd}`;
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Confirm',
                passProps: {
                    cancelLabel: Strings.jewelry.removeConfirm.cancelLabel,
                    confirmLabel: Strings.jewelry.removeConfirm.confirmLabel,
                    onConfirm: () => this.removeJewelry(deviceID),
                    prompt,
                },
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {(this.props.claimingDevice || this.props.disclaimingDevice) &&
                    <ActivityIndicator size={24} />
                }
                <JewelryList
                    jewelry={this.props.devices}
                    onRemove={deviceID => this.confirmRemoveJewelry(deviceID)}
                />
                <View style={styles.buttonArea}>
                    <Button
                        rounded
                        primary
                        onPress={() => this.addNewJewelry()}
                        title={Strings.jewelry.addNew}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        devices: state.user.devices,
        loading: state.user.loadingDevices === 'requested',
    };
}

export default connect(mapStateToProps)(Jewelry);
