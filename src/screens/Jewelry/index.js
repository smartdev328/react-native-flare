import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import * as deviceActions from '../../actions/deviceActions';
import * as hardwareActions from '../../actions/hardwareActions';
import { USERS_CAN_ADD_JEWELRY } from '../../constants/Config';
import FlareDeviceID from '../../bits/FlareDeviceID';
import JewelryList from './JewelryList';
import Strings from '../../locales/en';
import Colors from '../../bits/Colors';
import { settingsNavOptions } from '../Settings';
import RoundedButton from '../../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 16,
    },
});

class Jewelry extends React.Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    addNewJewelry = () => {
        const { beaconCountsReset, resetClaim, componentId } = this.props;
        beaconCountsReset();
        resetClaim();
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

    confirmRemoveJewelry = deviceID => {
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
    };

    static options = settingsNavOptions('Jewelry', true);

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
            <SafeAreaView style={styles.container}>
                <JewelryList
                    jewelry={devices}
                    onRemove={this.confirmRemoveJewelry}
                />
                {USERS_CAN_ADD_JEWELRY && (
                    <RoundedButton
                        width={240}
                        wrapperStyle={styles.button}
                        onPress={this.addNewJewelry}
                        text={Strings.jewelry.addNew}
                    />
                )}
            </SafeAreaView>
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
    resetClaim: deviceActions.resetClaim,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Jewelry);
