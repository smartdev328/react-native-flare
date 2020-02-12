import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import isArrayLike from 'lodash/isArrayLike';

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import { regStart } from '../../actions/regActions';
import { resetClaim } from '../../actions/deviceActions';
import Resume from './Resume';
import { jwtHasValidTimestamp } from '../../bits/jwt';
import useDimensions from '../../bits/useDimensions';

const selector = ({ authToken, authState, hasViewedTutorial, devices }) => ({
    hasAuthToken: jwtHasValidTimestamp(authToken),
    authState,
    hasViewedTutorial,
    hasDevices: isArrayLike(devices) && devices.length > 0,
});

const Onboarding = ({ componentId }) => {
    const dispatch = useDispatch();
    const {
        hasAuthToken,
        authState,
        hasViewedTutorial,
        hasDevices,
    } = useSelector(selector);
    const dimensions = useDimensions();
    const [lastAuthState, setLastAuthState] = React.useState(authState);
    const didProceed = React.useRef(false);
    const [resume, setResume] = React.useState(false);
    const [signUp, setSignUp] = React.useState(false);
    const [signIn, setSignIn] = React.useState(false);

    const squashed = dimensions.height < 650;

    const onSignUpPressed = React.useCallback(() => {
        didProceed.current = false;
        dispatch(regStart());
        setSignUp(true);
    }, [dispatch, setSignUp]);
    const onSignInPressed = React.useCallback(() => {
        setSignIn(true);
    }, [setSignIn]);
    const closeSignUp = React.useCallback(() => {
        setSignUp(false);
    }, [setSignUp]);
    const closeSignIn = React.useCallback(() => {
        setSignIn(false);
    }, [setSignIn]);

    const onSignUpSuccess = React.useCallback(() => {
        dispatch(resetClaim());

        if (!didProceed.current) {
            didProceed.current = true;
            Navigation.push(componentId, {
                component: {
                    name: 'com.flarejewelry.onboarding.addhardware',
                    options: { topBar: { visible: false } },
                },
            });
        }
    }, [componentId, dispatch, didProceed]);

    const onPressResume = React.useCallback(() => {
        if (hasDevices) {
            didProceed.current = true;
            Navigation.push(componentId, {
                component: {
                    name: 'com.flarejewelry.scenarios',
                    options: { topBar: { visible: false } },
                },
            });
        } else {
            onSignUpSuccess();
        }
    }, [componentId, hasDevices, onSignUpSuccess]);

    React.useEffect(() => {
        if (
            typeof authState === 'undefined' &&
            hasAuthToken &&
            !didProceed.current
        ) {
            onPressResume();
        } else if (authState !== lastAuthState) {
            setLastAuthState(authState);
            if (authState === 'succeeded' && !hasViewedTutorial) {
                setResume(true);
            }
        }
    }, [
        authState,
        didProceed,
        hasAuthToken,
        hasViewedTutorial,
        lastAuthState,
        onPressResume,
    ]);

    if (resume) {
        return <Resume onPress={onPressResume} />;
    } else if (signUp) {
        return (
            <Signup
                close={closeSignUp}
                onSuccess={onSignUpSuccess}
                squashed={squashed}
            />
        );
    } else if (signIn) {
        return <Signin close={closeSignIn} squashed={squashed} />;
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
