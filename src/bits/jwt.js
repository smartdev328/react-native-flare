/*
 * NON-VERIFYING, INCOMPLETE jwt parser. Do not use for anything critical
 */

import { decode } from 'base64url';

export const jwtHasValidTimestamp = token => {
    if (typeof token !== 'string' || token.length === 0) {
        return false;
    }

    try {
        const components = token.split('.').map(component => decode(component));
        const header = JSON.parse(components[0]);
        const payload = JSON.parse(components[1]);

        const now = Date.now();
        if (
            typeof header !== 'object' ||
            typeof payload !== 'object' ||
            header.typ !== 'JWT'
        ) {
            return false;
        }
        const passesIat = typeof payload.iat !== 'number' || payload.iat <= now;
        const passesExp = typeof payload.exp !== 'number' || payload.exp >= now;
        return passesIat && passesExp;
    } catch {
        return false;
    }
};
