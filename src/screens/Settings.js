import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { summary as configSummary } from '../constants';
import { setNotificationMessage } from '../actions/userActions';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import EnvironmentListing from '../bits/EnvironmentListing';
import Strings from '../locales/en';
import Type from '../bits/Type';
import Spacing from '../bits/Spacing';

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
        padding: Spacing.medium,
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.pink,
    },
    section: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: Type.size.large,
        marginBottom: Spacing.medium,
    },
    configItem: {

    },
    configItemTitleWithToggle: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    configItemTitle: {
        flex: 3,
        fontSize: Type.size.medium,
        lineHeight: 32,
    },
    configItemToggle: {
        flex: 1,
        padding: 4,
    },
    configItemBody: {
        color: Colors.grey,
    },
    customInputArea: {
        marginTop: Spacing.medium,
        marginBottom: Spacing.medium,
        padding: Spacing.small,
        width: '75%',
        borderRadius: 4,
        backgroundColor: Colors.white,
        borderColor: Colors.grey,
        borderWidth: 2,
    },
    saveSpinner: {
        position: 'absolute',
        top: Spacing.tiny,
        right: Spacing.small,
    },
});

// eslint-disable-next-line react/prefer-stateless-function
class Settings extends React.Component {
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
            promptType: props.promptType,
            promptMessage: props.promptMessage,
            dirty: false,
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

    changePrompt(newPrompt) {
        const update = {
            promptMessage: newPrompt,
            dirty: true,
        };

        if (newPrompt !== Strings.settings.notifications.defaultMessage) {
            update.promptType = Strings.settings.notifications.customOption;
        }

        this.setState(update);
    }

    enableCustomPrompt(enable) {
        this.setState({
            promptType: enable ?
                Strings.settings.notifications.customOption :
                Strings.settings.notifications.defaultOption,
        });

        // change the prompt and mark as dirty if user disabled custom prompt
        if (!enable) {
            this.changePrompt(Strings.settings.notifications.defaultMessage);
        }
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
            console.warn('Unhandled button press in home screen.');
            break;
        }
    }

    saveCustomPrompt() {
        this.setState({
            dirty: false,
        });

        this.props.dispatch(setNotificationMessage(
            this.props.token,
            this.state.promptMessage,
            this.state.promptType,
        ));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.section}>
                    {this.props.saving &&
                        <ActivityIndicator style={styles.saveSpinner} />
                    }
                    <Text style={styles.sectionTitle}>
                        {Strings.settings.notifications.title}
                    </Text>
                    <View style={styles.configItem}>
                        <View style={styles.configItemTitleWithToggle}>
                            <Text style={styles.configItemTitle}>
                                {Strings.settings.notifications.promptSelectionTitle}
                            </Text>
                            <Switch
                                onValueChange={enable => this.enableCustomPrompt(enable)}
                                value={this.state.promptType === Strings.settings.notifications.customOption}
                            />
                        </View>

                        <Text style={styles.configItemBody}>
                            {Strings.settings.notifications.promptSelectionBody}
                        </Text>
                        <View style={styles.customInputArea}>
                            <TextInput
                                placeholder={Strings.settings.notifications.customPromptPlaceholder}
                                value={this.state.promptMessage}
                                onChangeText={v => this.changePrompt(v)}
                            />
                        </View>
                        {this.state.dirty &&
                            <Button
                                rounded
                                primary
                                left
                                onPress={() => this.saveCustomPrompt()}
                                title={Strings.settings.notifications.saveButtonLabel}
                            />
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {Strings.settings.config.title}
                    </Text>
                    <EnvironmentListing config={configSummary} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        promptType: state.user.settings.promptType,
        promptMessage: state.user.settings.promptMessage,
        saving: state.user.settings.saving,
        token: state.user.token,
    };
}

export default connect(mapStateToProps)(Settings);
