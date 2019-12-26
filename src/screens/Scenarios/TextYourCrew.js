import * as React from 'react';

import DeviceAction from './DeviceAction';
import { PRESS_AND_HOLD } from './Cuff';

const TextYourCrew = ({ onBack }) => (
    <DeviceAction
        onBack={onBack}
        headline1="Ready to see it?"
        headline2="Press and hold."
        body="Hold the button on your cuff and we’ll automatically send a text with your location. When you get a text, check it out."
        animation={PRESS_AND_HOLD}
    />
);

export default TextYourCrew;
