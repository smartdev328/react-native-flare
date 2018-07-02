import { AsyncStorage } from 'react-native';
import BeaconCache from './BeaconCache';
import ProtectedAPICall from './ProtectedAPICall';
import { FlareException } from './FlareException';

class API {
    constructor() {
        this.authenticated = false;
        // this.serverUrl = 'https://app.flarejewelry.co/api';
        this.serverUrl = 'http://192.168.135.236/api';
        // this.serverUrl = 'http://192.168.86.20/api';
        this.requestStatus = {
            failure: 'failure',
            requested: 'requested',
            success: 'success',
        };
        this.beaconCache = new BeaconCache();
    }

    async resetAuthentication() {
        this.authenticated = false;
        await AsyncStorage.removeItem('userToken');
    }

    async signIn(email, password) {
        return fetch(`${this.serverUrl}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then((data) => {
                if (data.status === this.requestStatus.success) {
                    AsyncStorage.setItem('userToken', data.auth_token);
                    AsyncStorage.setItem('devices', JSON.stringify(data.devices));
                    this.authenticated = true;
                    return data;
                }
                return false;
            });
    }

    async call(beacon) {
        if (this.beaconCache.hasAlreadyHandled(beacon)) {
            console.log('Ignoring call that we\'ve already handled.');
            return false;
        }
        this.beaconCache.markAsHandled(beacon);

        console.debug('Calling');

        return ProtectedAPICall(this.serverUrl, '/sos/call', {
            method: 'POST',
            body: JSON.stringify({
                deviceID: beacon.deviceID,
                nonce: beacon.nonce,
                timestamp: beacon.timestamp,
            }),
        });
    }

    async flare(beacon) {
        if (this.beaconCache.hasAlreadyHandled(beacon)) {
            console.log('Ignoring flare that we\'ve already handled.');
            return false;
        }
        this.beaconCache.markAsHandled(beacon);

        console.debug('Sending Flare');

        return ProtectedAPICall(this.serverUrl, '/sos/flare', {
            method: 'POST',
            body: JSON.stringify({
                deviceID: beacon.deviceID,
                nonce: beacon.nonce,
                timestamp: beacon.timestamp,
            }),
        });
    }

    async cancelActiveFlare(pin) {
        console.debug('Cancel active Flare');

        return ProtectedAPICall(this.serverUrl, '/sos/flare/cancel', {
            method: 'POST',
            body: JSON.stringify({
                pin,
            }),
        });
    }

    async checkin(beacon) {
        if (this.beaconCache.hasAlreadyHandled(beacon)) {
            console.log('Ignoring checkin that we\'ve already handled.');
            return false;
        }
        this.beaconCache.markAsHandled(beacon);

        return ProtectedAPICall(this.serverUrl, '/sos/checkin', {
            method: 'POST',
            body: JSON.stringify({
                device_id: beacon.deviceID,
                timestamp: beacon.timestamp,
                details: {
                    proximity: beacon.proximity,
                    distance: beacon.distance,
                    rssi: beacon.rssi,
                    major: beacon.major,
                    minor: beacon.minor,
                    uuid: beacon.uuid,
                },
            }),
        });
    }

    async ping() {
        return ProtectedAPICall(this.serverUrl, '/auth/status', {
            method: 'GET',
        });
    }

    async addDevice(deviceID) {
        console.debug(`Add device ${deviceID}`);

        return ProtectedAPICall(this.serverUrl, `/device/${deviceID}/claim`, {
            method: 'POST',
        })
            .then((response) => {
                const { devices } = response;
                AsyncStorage.setItem('devices', JSON.stringify(devices));
                return response;
            });
    }
}

export default API;
