/* global __DEV__ */
import axios from 'axios';
import { signOut } from '../actions/authActions';

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
    const optionsWithHeaders = Object.assign({}, options, {
        headers,
        url: `${serverUrl}${route}`,
    });

    if (__DEV__ && false) {
        // eslint-disable-next-line
        console.debug(JSON.stringify(optionsWithHeaders));
    }

    axios.interceptors.request.use(
        config => config,
        (error) => {
            console.debug(`Error response ${error}`);
            if (error.response.status === 403) {
                return signOut();
            }
            return Promise.reject(error);
        },
    );

    return axios(optionsWithHeaders);
}
