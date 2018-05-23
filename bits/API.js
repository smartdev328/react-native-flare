import { AsyncStorage } from 'react-native';

class API {
    constructor() {
        this.authenticated = false;
        // this.serverUrl = 'https://app.flarejewelry.co/api';
        this.serverUrl = 'http://192.168.135.236/api';
        this.requestStatus = {
            failure: 'failure',
            requested: 'requested',
            success: 'success',
        };
    }

    async signIn(email, password) {
        return fetch(`${this.serverUrl}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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

    async call() {
        if (!this.authenticated) {
            console.debug('No calls without authentication.');
            return false;
        }

        console.debug('Calling');

        const headers = await API.getAuthorizationHeader();
        headers['Content-Type'] = 'application/json';

        return fetch(`${this.serverUrl}/sos/call`, {
            method: 'POST',
            headers,
        })
            .then(response => response.json())
            .then((data) => {
                if (data.status === this.requestStatus.success) {
                    return data;
                }
                return false;
            });
    }
}

export default API;
