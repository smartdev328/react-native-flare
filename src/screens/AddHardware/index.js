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

import aura1519 from '../../assets/aura-1519.jpg';
import Success from './Success';

export { default as HowToConnect } from './HowToConnect';
export { default as AboutPermissions } from './AboutPermissions';

class AddHardware extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: props.additionalHardware ? 2 : 0,
            firstHadPermission: props.locationPermission,
        };
    }

    nextPage = () => {
        this.setState(({ page }) => ({ page: Math.min(page + 1, 4) }));
    };

    prevPage = () => {
        const { additionalHardware, componentId } = this.props;
        const { page: currentPage } = this.state;
        if (additionalHardware && currentPage === 2) {
            Navigation.pop(componentId);
        } else {
            this.setState(({ page }) => ({ page: Math.max(page - 1, 0) }));
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
                        nextPage={this.nextPage}
                        tellMeMore={this.aboutPermissions}
                        firstHadPermission={firstHadPermission}
                    />
                );
            case 2:
                return (
                    <GetStarted
                        style={[StyleSheet.absoluteFill]}
                        componentId={componentId}
                        nextPage={this.nextPage}
                    />
                );
            case 3:
                return (
                    <Pairing
                        style={[bottomMargin, StyleSheet.absoluteFill]}
                        nextPage={this.nextPage}
                    />
                );
            case 4:
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
        const { componentId, insets, additionalHardware } = this.props;
        const { page, firstHadPermission } = this.state;

        const bottomMargin = { marginBottom: insets.bottom };
        const dark = page === 2 || page === 3;

        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
                {dark && <Aura source={aura1519} />}
                <WhiteBar
                    black={!dark}
                    showLogo={false}
                    goBack={this.prevPage}
                    showBack={(page === 2 && additionalHardware) || page === 3}
                />
                <View style={styles.pager}>
                    {this.currentScreen({
                        componentId,
                        page,
                        bottomMargin,
                        firstHadPermission,
                    })}
                </View>
            </View>
        );
    }
}

const AddHardwareWithProvider = props => (
    <SafeAreaProvider>
        <SafeAreaConsumer>
            {insets => <AddHardware insets={insets} {...props} />}
        </SafeAreaConsumer>
    </SafeAreaProvider>
);

const mapStateToProps = ({ user: { permissions } }) => ({
    locationPermission:
        typeof permissions === 'object' &&
        'location' in permissions &&
        permissions.location,
});

export default connect(mapStateToProps)(AddHardwareWithProvider);
