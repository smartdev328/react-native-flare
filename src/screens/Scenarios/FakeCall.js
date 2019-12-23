import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isPlainObject from 'is-plain-object';

import DeviceAction from './DeviceAction';
import { scenarioDidCall } from '../../actions/regActions';
import { registerCallDetection } from '../../bits/CallDetection';

const FakeCall = ({ onBack, onSuccess }) => {
    const dispatch = useDispatch();
    const callStatus = useSelector(({ hardware }) => hardware.callStatus);
    const [gotCall, setGotCall] = React.useState(false);
    const [finishedCall, setFinishedCall] = React.useState(false);

    React.useEffect(() => registerCallDetection(dispatch), [dispatch]);

    React.useEffect(() => {
        if (isPlainObject(callStatus)) {
            if (!callStatus.hasEnded && !callStatus.outgoing) {
                setGotCall(true);
            } else if (callStatus.hasEnded && gotCall) {
                setFinishedCall(true);
            }
        }
    }, [dispatch, callStatus, gotCall, onSuccess]);

    const onNext = React.useCallback(() => {
        dispatch(scenarioDidCall());
        onSuccess();
    }, [dispatch, onSuccess]);

    return (
        <DeviceAction
            onBack={onBack}
            onNext={finishedCall ? onNext : undefined}
            headline1="Ready to try it?"
            headline2="Press for a call."
            body="Press the button on your cuff and we’ll call you. Listen and react to the call, and hang up whenever!"
            confirm="I got the call"
        />
    );
};

export default FakeCall;
