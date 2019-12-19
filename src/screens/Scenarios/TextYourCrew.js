import * as React from 'react';

import DeviceAction from './DeviceAction';

const TextYourCrew = ({ onBack, onSuccess }) => (
    <DeviceAction
        onBack={onBack}
        onSuccess={onSuccess}
        headline1="Ready to see it?"
        headline2="Press and hold."
        body="Hold the button on your cuff and we’ll automatically send a text with your location. When you get a text, check it out."
        confirm="Got my text!"
    />
);

export default TextYourCrew;
