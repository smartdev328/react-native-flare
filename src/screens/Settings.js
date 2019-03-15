import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Colors from '../bits/Colors';
import Strings from '../locales/en';
import Spacing from '../bits/Spacing';
import SettingsSection from '../bits/SettingsSection';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.pink,
    },
});

const SettingsPages = {
    call: {
        name: 'call',
        icon: 'phone',
        iconBackgroundColor: Colors.theme.blue,
    },
    config: {
        name: 'config',
        icon: 'tools',
        iconBackgroundColor: Colors.theme.purple,
    },
    notifications: {
        name: 'notifications',
        icon: 'megaphone',
        iconBackgroundColor: Colors.theme.blue,
    },
    privacy: {
        name: 'privacy',
        icon: 'eye',
        iconBackgroundColor: Colors.theme.blue,
    },
};

const SettingsSections = [
    {
        name: 'account',
        title: Strings.settings.sections.account.title,
        pages: [SettingsPages.privacy, SettingsPages.notifications, SettingsPages.call],
    },
    {
        name: 'diagnostics',
        title: Strings.settings.sections.diagnostics.title,
        pages: [SettingsPages.config],
    },
];

// eslint-disable-next-line react/prefer-stateless-function
export default class Settings extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
            },
        };
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            showSideMenu: false,
        };
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Settings',
            },
        });
    }

    toggleSideMenu() {
        const { showSideMenu } = this.state;
        const newSideMenuState = !showSideMenu;

        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: newSideMenuState,
                },
            },
        });

        this.setState({
            showSideMenu: newSideMenuState,
        });
    }

    navigationButtonPressed({ buttonId }) {
        switch (buttonId) {
        case 'menuButton':
            this.toggleSideMenu();
            break;
        default:
            console.warn(`Unhandled button press in home screen: ${buttonId}`);
            break;
        }
    }

    showCallScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.settings.Call',
            },
        });
    }

    showConfigScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.settings.Config',
            },
        });
    }

    showNotificationsScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.settings.Notifications',
            },
        });
    }

    showPrivacyScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.settings.Privacy',
            },
        });
    }

    handlePress(pressed) {
        switch (pressed) {
        case SettingsPages.call:
            this.showCallScreen();
            break;
        case SettingsPages.config:
            this.showConfigScreen();
            break;
        case SettingsPages.notifications:
            this.showNotificationsScreen();
            break;
        case SettingsPages.privacy:
            this.showPrivacyScreen();
            break;
        default:
            console.warn(`Unhandled settings link pressed: ${pressed}`);
            break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {SettingsSections.map(section => (
                    <SettingsSection
                        key={section.name}
                        title={section.title}
                        name={section.name}
                        pages={section.pages}
                        onPress={pressed => this.handlePress(pressed)}
                    />
                ))}
            </View>
        );
    }
}
