import * as React from 'react';
import { useSelector } from 'react-redux';

import DeviceAction from './DeviceAction';
import { PRESS_AND_HOLD } from '../Cuff';
import OhFicus from './OhFicus';

const TextYourCrew = ({ onBack }) => {
    const showWarning = useSelector(
        ({
            user: {
                scenarios: { longPress },
            },
        }) => longPress === 'gotShort'
    );
    const [timedOut, setTimedOut] = React.useState(false);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => setTimedOut(true), 30000);
        return () => clearTimeout(timeoutId);
    }, []);
    const clearTimedOut = React.useCallback(() => {
        setTimedOut(false);
    }, []);

    if (timedOut) {
        return <OhFicus retry={clearTimedOut} />;
    } else {
        return (
            <DeviceAction
                onBack={onBack}
                headline1="Ready to see it?"
                headline2="Press, hold, release."
                body="Hold the button on your bracelet for 3 seconds and release. This will kick off a group text to your friends, but for now it’s only a test."
                animation={PRESS_AND_HOLD}
                warning={
                    showWarning
                        ? 'Make sure to hold down the button for at least 3 seconds before letting go. Give it another try!'
                        : undefined
                }
            />
        );
    }
};

export default TextYourCrew;
