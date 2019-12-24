import * as React from 'react';

import DeviceAction from './DeviceAction';

const TextYourCrew = ({ onBack }) => (
    <DeviceAction
        onBack={onBack}
        headline1="Ready to see it?"
        headline2="Press and hold."
        body="Hold the button on your cuff and we’ll automatically send a text with your location. When you get a text, check it out."
    />
);

export default TextYourCrew;
