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
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code
        dispatch(changeAppRoot(root));
    };
}
