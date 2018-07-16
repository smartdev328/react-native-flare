import * as types from './actionTypes';

/*
 * Action Creators
 */
export function changeAppRoot(root) {
    return {
        type: types.ROOT_CHANGED,
        root,
    };
}

/*
 * Dispatch the actionCreators
 */
export function initializeApp() {
    return async function initApp(dispatch, getState) {
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code
        dispatch(changeAppRoot('login'));
    };
}

export function login() {
    return async function doLogin(dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(changeAppRoot('after-login'));
    };
}

