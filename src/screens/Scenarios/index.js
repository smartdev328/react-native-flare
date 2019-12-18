import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Intro from './Intro';
import WeirdVibes from './WeirdVibes';
import FakeCall from './FakeCall';

const Scenarios = () => {
    const [screen, setScreen] = React.useState('intro');

    const intro = React.useCallback(() => {
        setScreen('intro');
    }, []);
    const weirdVibes = React.useCallback(() => {
        setScreen('weirdVibes');
    }, []);
    const fakeCall = React.useCallback(() => {
        setScreen('fakeCall');
    }, []);

    return (
        <SafeAreaProvider>
            {(() => {
                switch (screen) {
                    case 'intro':
                        return <Intro onNext={weirdVibes} />;
                    case 'weirdVibes':
                        return (
                            <WeirdVibes onBack={intro} fakeCall={fakeCall} />
                        );
                    case 'fakeCall':
                        return <FakeCall onBack={weirdVibes} />;
                    default:
                        return null;
                }
            })()}
        </SafeAreaProvider>
    );
};

export default Scenarios;
