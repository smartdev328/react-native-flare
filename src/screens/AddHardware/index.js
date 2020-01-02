import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
    SafeAreaConsumer,
    SafeAreaProvider,
} from 'react-native-safe-area-context';

import styles from './styles';
import GetStarted from './GetStarted';
import WhiteBar from '../Onboarding/WhiteBar';
import LocationPrimer from './LocationPrimer';
import AlwaysAllow from './AlwaysAllow';
import Pairing from './Pairing';
import Aura from '../../bits/Aura';

import aura1519 from '../../assets/aura-1519.jpg';

class AddHardware extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            page: 0,
        };
    }

    nextPage = () => {
        this.setState(({ page }) => ({ page: Math.min(page + 1, 3) }));
    };

    prevPage = () => {
        this.setState(({ page }) => ({ page: Math.max(page - 1, 0) }));
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
        const { componentId } = this.props;
        Navigation.push(componentId, {
            component: {
                name: 'com.flarejewelry.scenarios',
                options: { topBar: { visible: false } },
            },
        });
    };

    currentScreen = ({ componentId, page, bottomMargin }) => {
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
                        nextPage={this.finish}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        const { componentId, insets } = this.props;
        const { page } = this.state;

        const bottomMargin = { marginBottom: insets.bottom };

        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar
                    barStyle={page >= 2 ? 'light-content' : 'dark-content'}
                />
                {page >= 2 && <Aura source={aura1519} />}
                <WhiteBar
                    black={page < 2}
                    showLogo={false}
                    goBack={this.prevPage}
                    showBack={page === 3}
                />
                <View style={styles.pager}>
                    {this.currentScreen({ componentId, page, bottomMargin })}
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

export default AddHardwareWithProvider;
