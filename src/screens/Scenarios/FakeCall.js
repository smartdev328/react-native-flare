import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isPlainObject from 'is-plain-object';

import DeviceAction from './DeviceAction';
import { scenarioDidCall } from '../../actions/regActions';
import { registerCallDetection } from '../../bits/CallDetection';
import { TOUCH_AND_RELEASE } from '../Cuff';
import Connecting from './Connecting';

const FakeCall = ({ onBack, onSuccess }) => {
    const dispatch = useDispatch();
    const { callStatus, shortPressStatus } = useSelector(
        ({ hardware, user: { scenarios } }) => ({
            callStatus: hardware.callStatus,
            shortPressStatus: scenarios.shortPress,
        })
    );
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

    if (shortPressStatus === 'done' && !finishedCall) {
        return <Connecting />;
    } else {
        return (
            <DeviceAction
                onBack={onBack}
                onNext={finishedCall ? onNext : undefined}
                headline1="Ready to try it?"
                headline2="Press for a call."
                body="Press the button on your cuff and we’ll call you. Listen, react, and hang up whenever!"
                confirm="I got the call"
                animation={finishedCall ? undefined : TOUCH_AND_RELEASE}
            />
        );
    }
};

export default FakeCall;
