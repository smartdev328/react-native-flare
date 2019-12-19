import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Intro from './Intro';
import WeirdVibes from './WeirdVibes';
import FakeCall from './FakeCall';
import addToContacts from '../AddToContacts';

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
    const weirdVibesAgain = React.useCallback(() => {
        setScreen('weirdVibesAgain');
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
                        return (
                            <FakeCall
                                onBack={weirdVibes}
                                onSuccess={weirdVibesAgain}
                            />
                        );
                    case 'weirdVibesAgain':
                        return (
                            <WeirdVibes
                                postDemo
                                addToContacts={addToContacts}
                            />
                        );
                    default:
                        return null;
                }
            })()}
        </SafeAreaProvider>
    );
};

export default Scenarios;
