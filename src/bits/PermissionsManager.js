import { PermissionsAndroid, Platform } from 'react-native';
import Strings from '../locales/en';

export default class PermissionsManager {
    static async checkLocationPermissions() {
        if (Platform.OS === 'android') {
            try {
                const coarseGranted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    Strings.permissions.coarseLocation,
                );

                const fineGranted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    Strings.permissions.coarseLocation,
                );

                if (coarseGranted !== PermissionsAndroid.RESULTS.GRANTED ||
                    fineGranted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Shit not gonna work without location');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }
}
