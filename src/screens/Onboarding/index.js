import * as React from 'react';
import { useDispatch } from 'react-redux';

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import { regStart } from '../../actions/regActions';

const Onboarding = () => {
    const dispatch = useDispatch();
    const [signUp, setSignUp] = React.useState(false);
    const [signIn, setSignIn] = React.useState(false);

    const onSignUpPressed = () => {
        dispatch(regStart());
        setSignUp(true);
    };

    if (signUp) {
        return <Signup close={() => setSignUp(false)} />;
    }
    if (signIn) {
        return <Signin close={() => setSignIn(false)} />;
    }
    return (
        <Home
            onSignUpPressed={onSignUpPressed}
            onSignInPressed={() => setSignIn(true)}
        />
    );
};

export default Onboarding;
