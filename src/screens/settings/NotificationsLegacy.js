import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import { iconsMap } from '../../bits/AppIcons';
import { setNotificationMessage } from '../../actions/userActions';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import SettingsToggle from '../../bits/SettingsToggle';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.theme.cream,
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1.2,
        color: Colors.black,
        textTransform: 'uppercase',
        paddingHorizontal: Spacing.large,
        marginBottom: Spacing.medium,
    },
    details: {
        padding: Spacing.large,
    },
    customInputArea: {
        marginHorizontal: Spacing.medium,
        padding: Spacing.small,
        borderRadius: 4,
        backgroundColor: Colors.white,
        borderColor: Colors.grey,
        borderWidth: 2,
    },
    customInputField: {
        marginHorizontal: Spacing.medium,
    },
});

class SettingsNotifications extends React.PureComponent {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [
                    {
                        id: 'backButton',
                        icon: iconsMap.back,
                        color: Colors.theme.purple,
                    },
                ],
                title: {
                    component: {
                        name: 'com.flarejewelry.app.FlareNavBar',
                        alignment: 'center',
                    },
                },
            },
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            promptType: props.promptType,
            promptMessage: props.promptMessage,
            dirty: false,
        };
    }

    saveCustomPrompt() {
        this.setState({
            dirty: false,
        });
        this.props.dispatch(
            setNotificationMessage(
                this.props.authToken,
                this.state.promptMessage,
                this.state.promptType
            )
        );
    }

    updateCustomPrompt(newPrompt) {
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
            promptType: enable
                ? Strings.settings.notifications.customOption
                : Strings.settings.notifications.defaultOption,
        });

        // change the prompt and mark as dirty if user disabled custom prompt
        if (!enable) {
            this.updateCustomPrompt(
                Strings.settings.notifications.defaultMessage
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {Strings.settings.titlePrefix}
                        {Strings.settings.notifications.title}
                    </Text>
                    {this.props.savingSetting && <ActivityIndicator />}
                </View>
                <SettingsToggle
                    label={Strings.settings.notifications.promptSelectionTitle}
                    value={
                        this.state.promptType ===
                        Strings.settings.notifications.customOption
                    }
                    onValueChange={enable => this.enableCustomPrompt(enable)}
                />
                <View style={styles.customInputArea}>
                    <TextInput
                        placeholder={
                            Strings.settings.notifications
                                .customPromptPlaceholder
                        }
                        value={this.state.promptMessage}
                        onChangeText={v => this.updateCustomPrompt(v)}
                        style={styles.customInputField}
                    />
                </View>
                <Text style={styles.details}>
                    {Strings.settings.notifications.promptSelectionBody}
                </Text>
                {this.state.dirty && (
                    <Button
                        rounded
                        primary
                        onPress={() => this.saveCustomPrompt()}
                        title={Strings.settings.notifications.saveButtonLabel}
                    />
                )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        promptType: state.user.settings.promptType,
        promptMessage: state.user.settings.promptMessage,
        saving: state.user.settings.saving,
        authToken: state.user.authToken,
    };
}

export default connect(mapStateToProps)(SettingsNotifications);
