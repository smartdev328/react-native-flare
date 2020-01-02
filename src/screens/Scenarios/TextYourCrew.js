import * as React from 'react';

import DeviceAction from './DeviceAction';
import { PRESS_AND_HOLD } from '../Cuff';

const TextYourCrew = ({ onBack }) => (
    <DeviceAction
        onBack={onBack}
        headline1="Ready to see it?"
        headline2="Press, hold, release."
        body="Press and hold the button on your cuff for 3 seconds. This will kick off a group text to your friends, but it’s only a test for now."
        animation={PRESS_AND_HOLD}
    />
);

export default TextYourCrew;
