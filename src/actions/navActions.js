import * as types from './actionTypes';

export function changeAppRoot(root) {
    return {
        type: types.ROOT_CHANGED,
        root,
    };
}

export function initializeApp() {
    return async function initApp(dispatch) {
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code
        dispatch(changeAppRoot('insecure'));
    };
}
