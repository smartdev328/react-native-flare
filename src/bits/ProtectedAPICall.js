import { AsyncStorage } from 'react-native';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
    return new Promise(resolve => response.json()
        .then(json => resolve({
            status: response.status,
            ok: response.ok,
            json,
        })));
}

async function getAuthorizationHeader() {
    const userToken = await AsyncStorage.getItem('userToken');
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    headers.Authorization = `Bearer ${userToken}`;
    return headers;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default async function request(endpoint, url, options) {

    const headers = await getAuthorizationHeader();
    const optionsWithHeaders = Object.assign({}, options, { headers });

    return new Promise((resolve, reject) => {
        fetch(endpoint + url, optionsWithHeaders)
            .then(parseJSON)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json);
                }
                // extract the error from the server's json
                console.log(response);
                return reject(response.status, response.json);
            })
            .catch((status, json) => reject(status, json));
    });
}
