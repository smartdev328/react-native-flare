import * as types from './actionTypes';

export const changeAppRoot = root => {
    console.debug(`Changing app root to ${root}`);
    return {
        type: types.ROOT_CHANGED,
        root,
    };
};

export const setRootComponent = componentId => ({
    type: types.SET_ROOT_COMPONENT,
    componentId,
});

export function initializeApp(root = 'insecure') {
    return async function initApp(dispatch) {
        dispatch(changeAppRoot(root));
    };
}
