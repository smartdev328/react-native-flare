import NotificationsIOS from 'react-native-notifications';

/* eslint-disable class-methods-use-this */
export default class NotificationManager {
    constructor() {
        NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
        NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
        NotificationsIOS.requestPermissions();
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
        console.error(error);
    }

    componentWillUnmount() {
        NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
        NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
    }

    // eslint-disable-next-line class-methods-use-this
    localNotify(notification) {
        // Play sounds unless directed otherwise by the playSound option.
        const { message, options = {} } = notification;
        const playSound = options.playSound !== false;

        NotificationsIOS.localNotification({
            alertBody: message,
            alertTitle: options.title,
            silent: playSound,
            category: 'SOME_CATEGORY',
            userInfo: { },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    clear() {
        NotificationsIOS.cancelAllLocalNotifications();
    }
}
