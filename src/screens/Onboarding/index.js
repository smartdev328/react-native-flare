import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import { regStart } from '../../actions/regActions';
import { resetClaim } from '../../actions/deviceActions';

const Onboarding = ({ componentId }) => {
    const dispatch = useDispatch();
    const [signUp, setSignUp] = React.useState(false);
    const [signIn, setSignIn] = React.useState(false);

    const onSignUpPressed = React.useCallback(() => {
        dispatch(regStart());
        setSignUp(true);
    }, [dispatch, setSignUp]);
    const onSignInPressed = React.useCallback(() => {
        Navigation.push(componentId, {
            component: {
                name: 'com.flarejewelry.scenarios',
                options: { topBar: { visible: false } },
            },
        });
    }, [componentId]);
    const closeSignUp = React.useCallback(() => setSignUp(false), [setSignUp]);
    const closeSignIn = React.useCallback(() => setSignIn(false), [setSignIn]);

    const onSignUpSuccess = React.useCallback(() => {
        dispatch(resetClaim());

        Navigation.push(componentId, {
            component: {
                name: 'com.flarejewelry.onboarding.addhardware',
                options: { topBar: { visible: false } },
            },
        });
    }, [componentId, dispatch]);

    if (signUp) {
        return <Signup close={closeSignUp} onSuccess={onSignUpSuccess} />;
    } else if (signIn) {
        return <Signin close={closeSignIn} />;
    } else {
        return (
            <Home
                onSignUpPressed={onSignUpPressed}
                onSignInPressed={onSignInPressed}
            />
        );
    }
};

export default Onboarding;
