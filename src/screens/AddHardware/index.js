import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
    SafeAreaConsumer,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import styles from './styles';
import GetStarted from './GetStarted';
import WhiteBar from '../Onboarding/WhiteBar';
import LocationPrimer from './LocationPrimer';
import AlwaysAllow from './AlwaysAllow';
import Pairing from './Pairing';
import Aura from '../../bits/Aura';
import Success from './Success';
import useDimensions from '../../bits/useDimensions';
import { MIN_NON_SQUASHED_HEIGHT } from '../../constants/Config';

import aura1519 from '../../assets/aura-1519.jpg';
import useBluetoothStatus from '../../bits/useBluetoothStatus';
import TurnBluetoothOn from './TurnBluetoothOn';

export { default as HowToConnect } from './HowToConnect';
export { default as AboutPermissions } from './AboutPermissions';

class AddHardware extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: props.additionalHardware ? 3 : 0,
            firstHadPermission: props.locationPermission,
        };
    }

    advancePages = n => {
        this.setState(({ page }) => ({
            page: Math.max(Math.min(page + n, 5), 0),
        }));
    };

    nextPage = () => {
        this.advancePages(1);
    };

    skipPage = () => {
        this.advancePages(2);
    };

    prevPage = () => {
        const { additionalHardware, componentId } = this.props;
        const { page: currentPage } = this.state;
        if (additionalHardware && currentPage === 3) {
            Navigation.pop(componentId);
        } else {
            this.advancePages(-1);
        }
    };

    aboutPermissions = () => {
        Navigation.showModal({
            component: {
                name:
                    'com.flarejewelry.onboarding.addhardware.aboutpermissions',
            },
        });
    };

    finish = () => {
        const { additionalHardware, componentId } = this.props;
        if (additionalHardware) {
            Navigation.pop(componentId);
        } else {
            Navigation.push(componentId, {
                component: {
                    name: 'com.flarejewelry.scenarios',
                    options: { topBar: { visible: false } },
                },
            });
        }
    };

    currentScreen = ({
        componentId,
        page,
        bottomMargin,
        firstHadPermission,
        squashed,
        bluetoothStatus,
    }) => {
        switch (page) {
            case 0:
                return (
                    <LocationPrimer
                        style={[bottomMargin, StyleSheet.absoluteFill]}
                        nextPage={this.nextPage}
                        tellMeMore={this.aboutPermissions}
                    />
                );
            case 1:
                return (
                    <AlwaysAllow
                        style={[bottomMargin, StyleSheet.absoluteFill]}
                        nextPage={
                            bluetoothStatus === 'off'
                                ? this.nextPage
                                : this.skipPage
                        }
                        tellMeMore={this.aboutPermissions}
                        firstHadPermission={firstHadPermission}
                        bluetoothStatus={bluetoothStatus}
                    />
                );
            case 2:
                return (
                    <TurnBluetoothOn
                        style={[bottomMargin, StyleSheet.absoluteFill]}
                        nextPage={this.nextPage}
                        tellMeMore={this.aboutPermissions}
                        bluetoothStatus={bluetoothStatus}
                    />
                );
            case 3:
                return (
                    <GetStarted
                        style={[StyleSheet.absoluteFill]}
                        componentId={componentId}
                        nextPage={this.nextPage}
                    />
                );
            case 4:
                return (
                    <Pairing
                        style={[bottomMargin, StyleSheet.absoluteFill]}
                        squashed={squashed}
                        nextPage={this.nextPage}
                    />
                );
            case 5:
                return (
                    <Success
                        style={[bottomMargin, StyleSheet.absoluteFill]}
                        nextPage={this.finish}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        const {
            componentId,
            insets,
            dimensions,
            additionalHardware,
            bluetoothStatus,
        } = this.props;
        const { page, firstHadPermission } = this.state;

        const bottomMargin = { marginBottom: insets.bottom };
        const dark = page === 3 || page === 4;
        const squashed = dimensions.height < MIN_NON_SQUASHED_HEIGHT;
        const showBack = (page === 3 && additionalHardware) || page === 4;

        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
                {dark && <Aura source={aura1519} />}
                {!squashed || showBack ? (
                    <WhiteBar
                        black={!dark}
                        offWhite={dark}
                        showLogo={false}
                        goBack={this.prevPage}
                        showBack={showBack}
                        showHelp={page === 4}
                        squashed={squashed}
                    />
                ) : (
                    <View style={{ height: 16 }} />
                )}
                <View style={styles.pager}>
                    {this.currentScreen({
                        componentId,
                        page,
                        bottomMargin,
                        firstHadPermission,
                        squashed,
                        bluetoothStatus,
                    })}
                </View>
            </View>
        );
    }
}

const AddHardwareWithProvider = props => {
    const dimensions = useDimensions();
    const bluetoothStatus = useBluetoothStatus();

    return (
        <SafeAreaProvider>
            <SafeAreaConsumer>
                {insets => (
                    <AddHardware
                        insets={insets}
                        dimensions={dimensions}
                        bluetoothStatus={bluetoothStatus}
                        {...props}
                    />
                )}
            </SafeAreaConsumer>
        </SafeAreaProvider>
    );
};

const mapStateToProps = ({ user: { permissions } }) => ({
    locationPermission:
        typeof permissions === 'object' &&
        'location' in permissions &&
        permissions.location,
});

export default connect(mapStateToProps)(AddHardwareWithProvider);
