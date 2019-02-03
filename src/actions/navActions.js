import * as types from './actionTypes';

export function changeAppRoot(root) {
    console.debug(`Changing app root to ${root}`);
    return {
        type: types.ROOT_CHANGED,
        root,
    };
}

export function initializeApp(root = 'insecure') {
    return async function initApp(dispatch) {
        dispatch(changeAppRoot(root));
    };
}
