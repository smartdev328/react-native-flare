import * as React from 'react';

import DeviceAction from './DeviceAction';
import { PRESS_AND_HOLD } from '../Cuff';

const TextYourCrew = ({ onBack }) => (
    <DeviceAction
        onBack={onBack}
        headline1="Ready to see it?"
        headline2="Press, hold, release."
        body="Hold the button on your cuff for 3 seconds and release. This will kick off a group text to your friends, but for now it’s only a test."
        animation={PRESS_AND_HOLD}
    />
);

export default TextYourCrew;
