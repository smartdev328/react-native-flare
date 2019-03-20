import NotificationsAndroid from 'react-native-notifications';

/* eslint-disable class-methods-use-this */
export default class NotificationManager {
    constructor() {
        // On Android, we allow for only one (global) listener per each event type.
        NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
            // TODO: Send the token to my server so it could send back push notifications...
            console.log('Push-notifications registered!', deviceToken);
        });
    }

    onPushRegistered(deviceToken) {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', deviceToken);
    }

    onPushRegistrationFailed(error) {
        // For example:
        //
        // error={
        //   domain: 'NSCocoaErroDomain',
        //   code: 3010,
        //   localizedDescription: 'remote notifications are not supported in the simulator'
        // }
        console.warn(error);
    }

    // eslint-disable-next-line class-methods-use-this
    localNotify(notification) {
        // Play sounds unless directed otherwise by the playSound option.
        const { message, options = {} } = notification;
        const playSound = options.playSound !== false;

        NotificationsAndroid.localNotification({
            alertBody: message,
            alertTitle: options.title,
            silent: playSound,
            category: 'SOME_CATEGORY',
            userInfo: { },
        });

    }

    // eslint-disable-next-line class-methods-use-this
    clear() {
        NotificationsAndroid.cancelAllLocalNotifications();
    }
}
