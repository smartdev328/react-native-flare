import { AsyncStorage } from 'react-native';

class API {
    constructor() {
        this.authenticated = false;
        this.serverUrl = 'https://app.flarejewelry.co/api';
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

    async call() {
        console.log('Calling');
        if (!this.authenticated) {
            console.log('No calls without authentication.');
            return false;
        }

        const userToken = await AsyncStorage.getItem('userToken');
        return fetch(`${this.serverUrl}/sos/call`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            },
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
