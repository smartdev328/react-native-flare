/* global __DEV__ */
import axios from 'axios';
import { VERBOSE_NETWORK_LOGGING } from '../constants/Config';
import { FlareLogger, FlareLoggerCategory } from '../actions/LogAction';

const getAuthorizationHeader = userToken => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
});

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
    const headers = getAuthorizationHeader(token);
    const optionsWithHeaders = {
        ...options,
        headers,
        url: `${serverUrl}${route}`,
    };

    if (VERBOSE_NETWORK_LOGGING) {
        // eslint-disable-next-line
        const logMessage = JSON.stringify(optionsWithHeaders);
        console.debug(logMessage);
        FlareLogger.debug(
            FlareLoggerCategory.send,
            logMessage,
            options.data.device_id
        );
    }

    const response = await axios(optionsWithHeaders);
    if (VERBOSE_NETWORK_LOGGING) {
        const { data, status } = response;
        const logMessage = {
            route,
            data,
            status,
        };
        console.debug(logMessage);
        FlareLogger.debug(
            FlareLoggerCategory.received,
            logMessage,
            options.data.device_id
        );
    }
    return response;
}
