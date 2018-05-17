import API from './API';

export default async function signIn(email, password) {
    return fetch(`${API.serverUrl}/auth/login`, {
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
            if (data.status === API.requestStatus.success) {
                return data;
            }
            return false;
        });
}
