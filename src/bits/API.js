import ProtectedAPICall from './ProtectedAPICall';

class API {
    async cancelActiveFlare(pin) {
        console.debug('Cancel active Flare');

        return ProtectedAPICall(this.serverUrl, '/sos/flare/cancel', {
            method: 'POST',
            body: JSON.stringify({
                pin,
            }),
        });
    }

    async ping() {
        return ProtectedAPICall(this.serverUrl, '/auth/status', {
            method: 'GET',
        });
    }
}

export default API;
