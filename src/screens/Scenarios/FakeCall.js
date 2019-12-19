import * as React from 'react';

import DeviceAction from './DeviceAction';

const FakeCall = ({ onBack, onSuccess }) => (
    <DeviceAction
        onBack={onBack}
        onSuccess={onSuccess}
        headline1="Ready to try it?"
        headline2="Press for a call."
        body="Press the button on your cuff and we’ll call you. Listen and react to the call, and hang up whenever!"
        confirm="I got the call"
    />
);

export default FakeCall;
