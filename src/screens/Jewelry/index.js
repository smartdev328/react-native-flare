import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import * as deviceActions from '../../actions/deviceActions';
import * as hardwareActions from '../../actions/hardwareActions';
import { USERS_CAN_ADD_JEWELRY } from '../../constants/Config';
import Button from '../../bits/Button';
import FlareDeviceID from '../../bits/FlareDeviceID';
import JewelryList from './JewelryList';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Colors from '../../bits/Colors';
import { settingsNavOptions } from '../Settings';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.theme.cream,
    },
    buttonArea: {
        paddingTop: Spacing.small,
    },
});

class Jewelry extends React.Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    addNewJewelry = () => {
        const { beaconCountsReset, componentId } = this.props;
        beaconCountsReset();
        Navigation.push(componentId, {
            component: {
                name: 'com.flarejewelry.onboarding.addhardware',
                options: { topBar: { visible: false } },
                passProps: {
                    additionalHardware: true,
                },
            },
        });
    };

    removeJewelry = deviceID => {
        const { disclaimDevice, authToken } = this.props;
        disclaimDevice(authToken, deviceID);
    };

    static options = settingsNavOptions('Jewelry', true);

    confirmRemoveJewelry(deviceID) {
        const jewelryLabel = FlareDeviceID.getJewelryLabelFromDeviceID(
            deviceID
        );
        const prompt = `${Strings.jewelry.removeConfirm.promptBegin}${jewelryLabel}${Strings.jewelry.removeConfirm.promptEnd}`;
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'com.flarejewelry.app.Confirm',
                            passProps: {
                                cancelLabel:
                                    Strings.jewelry.removeConfirm.cancelLabel,
                                confirmLabel:
                                    Strings.jewelry.removeConfirm.confirmLabel,
                                onConfirm: () => this.removeJewelry(deviceID),
                                prompt,
                            },
                        },
                    },
                ],
            },
        });
    }

    navigationButtonPressed({ buttonId }) {
        const { componentId } = this.props;

        switch (buttonId) {
            case 'backButton':
                Navigation.pop(componentId);
                break;
            default:
                break;
        }
    }

    render() {
        const { devices } = this.props;
        return (
            <View style={styles.container}>
                <JewelryList
                    jewelry={devices}
                    onRemove={deviceID => this.confirmRemoveJewelry(deviceID)}
                />
                <View style={styles.buttonArea}>
                    {USERS_CAN_ADD_JEWELRY && (
                        <Button
                            dark
                            primary
                            onPress={this.addNewJewelry}
                            title={Strings.jewelry.addNew}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.user.authToken,
    devices: state.user.devices,
    loading: state.user.loadingDevices === 'requested',
});

const mapDispatchToProps = {
    disclaimDevice: deviceActions.disclaimDevice,
    beaconCountsReset: hardwareActions.beaconCountsReset,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Jewelry);
