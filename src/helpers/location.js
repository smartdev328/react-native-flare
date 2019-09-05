import RNLocation from 'react-native-location';

export default function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        RNLocation.requestPermission({
            ios: 'always',
        }).then((granted) => {
            if (granted) {
                RNLocation.configure({ disatnceFilter: 5 });
                RNLocation.getLatestLocation({ timeout: 60000 }).then(
                    position => resolve(position),
                    ({ code, message }) => reject(Object.assign(new Error(message), { name: 'PositionError', code })),
                );
            }
        });
    });
}
