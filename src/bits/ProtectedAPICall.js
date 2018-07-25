/* global __DEV__ */

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

async function getAuthorizationHeader(userToken) {
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
 * @param  {string} token       The current user's auth token
 * @param  {string} serverUrl   The server we want to access
 * @param  {string} route       The endpoint on the server we want to request
 * @param  {object} [options]   The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default async function request(token, serverUrl, route, options) {
    const headers = await getAuthorizationHeader(token);
    const optionsWithHeaders = Object.assign({}, options, { headers });

    return new Promise((resolve, reject) => {
        fetch(serverUrl + route, optionsWithHeaders)
            .then(parseJSON)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json);
                }
                // extract the error from the server's json
                if (__DEV__) {
                    console.debug(`${route}: ${JSON.stringify(response)}`);
                }
                return reject(response.status, response.json);
            })
            .catch((status, json) => reject(status, json));
    });
}
