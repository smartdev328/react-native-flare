import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Intro from './Intro';
import WeirdVibes from './WeirdVibes';
import FakeCall from './FakeCall';
import addToContacts from '../AddToContacts';
import UncomfortableDate from './UncomfortableDate';
import TextYourCrew from './TextYourCrew';

const Scenarios = () => {
    const [screen, setScreen] = React.useState('intro');
    const [didFirst, setDidFirst] = React.useState(false);

    const intro = React.useCallback(() => {
        setScreen('intro');
    }, []);
    const weirdVibes = React.useCallback(() => {
        setScreen('weirdVibes');
    }, []);
    const fakeCall = React.useCallback(() => {
        setScreen('fakeCall');
    }, []);
    const textYourCrew = React.useCallback(() => {
        setScreen('textYourCrew');
    }, []);
    const uncomfortableDate = React.useCallback(() => {
        setDidFirst(true);
        setScreen('uncomfortableDate');
    }, []);
    const currentScenario = React.useCallback(() => {
        setScreen(didFirst ? 'uncomfortableDate' : 'weirdVibes');
    }, [didFirst]);
    const currentScenarioAgain = React.useCallback(() => {
        setScreen(didFirst ? 'uncomfortableDateAgain' : 'weirdVibesAgain');
    }, [didFirst]);

    return (
        <SafeAreaProvider>
            {(() => {
                switch (screen) {
                    case 'intro':
                        return <Intro onNext={weirdVibes} />;
                    case 'weirdVibes':
                        return (
                            <WeirdVibes
                                onBack={intro}
                                fakeCall={fakeCall}
                                textCrew={textYourCrew}
                            />
                        );
                    case 'weirdVibesAgain':
                        return (
                            <WeirdVibes
                                postDemo
                                nextScenario={uncomfortableDate}
                                addToContacts={addToContacts}
                            />
                        );
                    case 'uncomfortableDate':
                        return (
                            <UncomfortableDate
                                fakeCall={fakeCall}
                                textCrew={textYourCrew}
                            />
                        );
                    case 'uncomfortableDateAgain':
                        return (
                            <UncomfortableDate
                                postDemo
                                addToContacts={addToContacts}
                            />
                        );
                    case 'fakeCall':
                        return (
                            <FakeCall
                                onBack={currentScenario}
                                onSuccess={currentScenarioAgain}
                            />
                        );
                    case 'textYourCrew':
                        return (
                            <TextYourCrew
                                onBack={currentScenario}
                                onSuccess={currentScenarioAgain}
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
