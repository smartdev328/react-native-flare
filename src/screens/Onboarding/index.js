import * as React from 'react';

import Home from './Home';
import Signup from './Signup';

const Onboarding = () => {
    const [signUp, setSignUp] = React.useState(false);
    const [signIn, setSignIn] = React.useState(false);

    if (signUp) {
        return <Signup close={() => setSignUp(false)} />;
    }
    if (signIn) {
        //
    }
    return (
        <Home
            onSignUpPressed={() => setSignUp(true)}
            onSignInPressed={() => setSignIn(true)}
        />
    );
};

export default Onboarding;
