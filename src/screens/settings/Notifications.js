import * as React from 'react';
import { SafeAreaView, StatusBar, Switch, Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { confirmClose, navOptions, saveButton, styles } from './styles';
import Colors from '../../bits/Colors';
import * as userActions from '../../actions/userActions';
import { useNavigationButtonCallback } from '../../bits/useNavigationCallback';

const Notifications = ({
    componentId,
    authToken,
    promptMessage,
    enableNotifications,
    notifPermission,
    savingSetting,
    setNotificationsEnabled,
    checkNotificationPermission,
    getNotificationPermission,
    setNotificationMessage,
    sawNotifSettings,
}) => {
    const [dirty, setDirty] = React.useState(false);
    const [didSave, setDidSave] = React.useState(false);
    const [message, setMessage] = React.useState(promptMessage);
    const fullyEnabled = enableNotifications && notifPermission;

    React.useEffect(() => {
        sawNotifSettings();
    }, [sawNotifSettings]);

    React.useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                rightButtons: dirty ? [saveButton] : [],
            },
        });
    }, [componentId, dirty]);

    React.useEffect(() => {
        checkNotificationPermission();
    }, [checkNotificationPermission]);

    React.useEffect(() => {
        if (didSave && !savingSetting) {
            Navigation.pop(componentId);
        }
    }, [savingSetting, componentId, didSave]);

    const setEnabled = React.useCallback(
        newValue => {
            if (newValue && !notifPermission) {
                getNotificationPermission();
            } else {
                setNotificationsEnabled(newValue);
            }
        },
        [notifPermission, getNotificationPermission, setNotificationsEnabled]
    );

    const onChangeText = React.useCallback(text => {
        setDirty(true);
        setMessage(text);
    }, []);

    const saveSetting = React.useCallback(() => {
        setNotificationMessage(authToken, message, true);
        setDirty(false);
        setDidSave(true);
    }, [setNotificationMessage, authToken, message]);

    useNavigationButtonCallback(
        ({ buttonId }) => {
            switch (buttonId) {
                case 'backButton':
                    confirmClose(dirty, componentId);
                    break;
                case 'save':
                    saveSetting();
                    break;
                default:
                    break;
            }
        },
        [componentId, saveSetting]
    );

    const opacity = fullyEnabled ? undefined : styles.disabled;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    <Text style={styles.text}>Receive Notifications</Text>
                    <Switch
                        trackColor={{ true: Colors.theme.purple }}
                        value={fullyEnabled}
                        onValueChange={setEnabled}
                    />
                </View>
            </View>
            <Text style={[styles.subhead, opacity, styles.spaced]}>
                Custom Popup Message
            </Text>
            <TextField
                containerStyle={[styles.textField, opacity]}
                disabled={!fullyEnabled}
                multiline
                label="Notification"
                textColor={Colors.black}
                tintColor={Colors.black}
                baseColor={Colors.black}
                errorColor={Colors.black}
                error="Choose how you are notified that a flare was sent to your crew here."
                keyboardAppearance="light"
                autoCapitalize="sentences"
                onChangeText={onChangeText}
                value={message}
            />
        </SafeAreaView>
    );
};

Notifications.options = () => navOptions('Notifications');

const mapStateToProps = ({
    user: {
        authToken,
        settings: { promptMessage, enableNotifications },
        permissions: { notification: notifPermission },
        savingSetting,
    },
}) => ({
    authToken,
    promptMessage,
    enableNotifications,
    notifPermission,
    savingSetting,
});

const mapDispatchToProps = {
    setNotificationsEnabled: userActions.setNotificationsEnabled,
    checkNotificationPermission: userActions.checkNotificationPermission,
    getNotificationPermission: userActions.getNotificationPermission,
    setNotificationMessage: userActions.setNotificationMessage,
    sawNotifSettings: userActions.sawNotifSettings,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications);
