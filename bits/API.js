import { AsyncStorage } from 'react-native';
import BeaconCache from './BeaconCache';
import { FlareException } from './FlareException';

class API {
    constructor() {
        this.authenticated = false;
        // this.serverUrl = 'https://app.flarejewelry.co/api';
        // this.serverUrl = 'http://192.168.135.236/api';
        this.serverUrl = 'http://192.168.86.227/api';
        this.requestStatus = {
            failure: 'failure',
            requested: 'requested',
            success: 'success',
        };
        this.beaconCache = new BeaconCache();
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
                    this.authenticated = true;
                    return data;
                }
                return false;
            });
    }

    static async getAuthorizationHeader() {
        const userToken = await AsyncStorage.getItem('userToken');
        const headers = {};
        headers.Authorization = `Bearer ${userToken}`;
        return headers;
    }

    async call(beacon) {
        if (!this.authenticated) {
            console.debug('No calls without authentication.');
            return false;
        }

        if (this.beaconCache.hasAlreadyHandled(beacon)) {
            console.log('Ignoring call that we\'ve already handled.');
            return false;
        }

        this.beaconCache.markAsHandled(beacon);

        console.debug('Calling');

        const headers = await API.getAuthorizationHeader();
        headers['Content-Type'] = 'application/json';

        return fetch(`${this.serverUrl}/sos/call`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                deviceID: beacon.deviceID,
                nonce: beacon.nonce,
                timestamp: beacon.timestamp,
            }),
        })
            .then(response => response.json())
            .then((data) => {
                if (data.status === this.requestStatus.success) {
                    return data;
                }
                return false;
            })
            .catch((reason) => {
                console.warn(`Request for call failed with reason ${reason}`);
                return false;
            });
    }

    static checkin(beacon) {
        throw new FlareException('Not yet implemented');
    }

    async ping() {
        console.debug('Ping');
        const headers = await API.getAuthorizationHeader();
        headers['Content-Type'] = 'application/json';

        return fetch(`${this.serverUrl}/ping`, {
            method: 'GET',
            headers,
        })
            .then(response => response.json())
            .then((data) => {
                if (data.status === this.requestStatus.success) {
                    return data;
                }
                // We're no longer authenticated.
                this.authenticated = false;
                return false;
            })
            .catch((reason) => {
                console.warn(`Ping failed with reason ${reason}`);
                return false;
            });
    }
}

export default API;
