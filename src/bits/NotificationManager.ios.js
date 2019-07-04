import NotificationsIOS from 'react-native-notifications';

/* eslint-disable class-methods-use-this */
export default class NotificationManager {
    constructor() {
        this.boundOnNotificationReceivedForeground = this.onNotificationReceivedForeground.bind(this);
        this.boundOnNotificationReceivedBackground = this.onNotificationReceivedBackground.bind(this);
        this.boundOnNotificationOpened = this.onNotificationOpened.bind(this);

        NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
        NotificationsIOS.addEventListener(
            'remoteNotificationsRegistrationFailed',
            this.onPushRegistrationFailed.bind(this),
        );
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

    onNotificationReceivedForeground(notification) {
        console.log('Notification Received - Foreground', notification);
    }

    onNotificationReceivedBackground(notification) {
        console.log('Notification Received - Background', notification);
    }

    onNotificationOpened(notification) {
        console.log('Notification opened by device user', notification);
    }

    componentWillUnmount() {
        NotificationsIOS.removeEventListener(
            'notificationReceivedForeground',
            this.boundOnNotificationReceivedForeground,
        );
        NotificationsIOS.removeEventListener(
            'notificationReceivedBackground',
            this.boundOnNotificationReceivedBackground,
        );
        NotificationsIOS.removeEventListener('notificationOpened', this.boundOnNotificationOpened);
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
            userInfo: {},
        });
    }

    // eslint-disable-next-line class-methods-use-this
    clear() {
        NotificationsIOS.cancelAllLocalNotifications();
    }
}
